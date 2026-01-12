/* ===================================
   SCROLL STACK ANIMATION
   Vanilla JS implementation inspired by ReactBits
   Cards stack on top of each other as you scroll
   =================================== */

class ScrollStack {
    constructor(container, options = {}) {
        this.container = typeof container === 'string'
            ? document.querySelector(container)
            : container;

        if (!this.container) {
            console.error('ScrollStack: Container not found');
            return;
        }

        this.options = {
            itemDistance: options.itemDistance || 80,
            itemScale: options.itemScale || 0.03,
            itemStackDistance: options.itemStackDistance || 25,
            stackPosition: options.stackPosition || '25%',
            scaleEndPosition: options.scaleEndPosition || '15%',
            baseScale: options.baseScale || 0.88,
            rotationAmount: options.rotationAmount || 0,
            blurAmount: options.blurAmount || 0,
            useWindowScroll: options.useWindowScroll !== undefined ? options.useWindowScroll : true,
            onStackComplete: options.onStackComplete || null,
            ...options
        };

        this.cards = [];
        this.lastTransforms = new Map();
        this.stackCompleted = false;
        this.isUpdating = false;
        this.animationFrame = null;

        this.init();
    }

    init() {
        // Find all stack cards
        this.cards = Array.from(this.container.querySelectorAll('.scroll-stack-card'));

        if (this.cards.length === 0) {
            console.warn('ScrollStack: No .scroll-stack-card elements found');
            return;
        }

        // Style cards
        this.cards.forEach((card, i) => {
            if (i < this.cards.length - 1) {
                card.style.marginBottom = `${this.options.itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            card.style.transform = 'translateZ(0)';
            card.style.perspective = '1000px';
        });

        // Bind scroll handler
        this.handleScroll = this.handleScroll.bind(this);

        if (this.options.useWindowScroll) {
            window.addEventListener('scroll', this.handleScroll, { passive: true });
        } else {
            this.container.addEventListener('scroll', this.handleScroll, { passive: true });
        }

        // Initial update
        this.updateCardTransforms();
    }

    parsePercentage(value, containerHeight) {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    }

    calculateProgress(scrollTop, start, end) {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }

    getScrollData() {
        if (this.options.useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight
            };
        } else {
            return {
                scrollTop: this.container.scrollTop,
                containerHeight: this.container.clientHeight
            };
        }
    }

    getElementOffset(element) {
        if (this.options.useWindowScroll) {
            const rect = element.getBoundingClientRect();
            return rect.top + window.scrollY;
        } else {
            return element.offsetTop;
        }
    }

    handleScroll() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.animationFrame = requestAnimationFrame(() => {
            this.updateCardTransforms();
        });
    }

    updateCardTransforms() {
        if (!this.cards.length || this.isUpdating) return;

        this.isUpdating = true;

        const { scrollTop, containerHeight } = this.getScrollData();
        const stackPositionPx = this.parsePercentage(this.options.stackPosition, containerHeight);
        const scaleEndPositionPx = this.parsePercentage(this.options.scaleEndPosition, containerHeight);

        // Find end element
        const endElement = this.container.querySelector('.scroll-stack-end');
        const endElementTop = endElement ? this.getElementOffset(endElement) :
            this.getElementOffset(this.cards[this.cards.length - 1]) + containerHeight;

        this.cards.forEach((card, i) => {
            const cardTop = this.getElementOffset(card);
            const triggerStart = cardTop - stackPositionPx - this.options.itemStackDistance * i;
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPositionPx - this.options.itemStackDistance * i;
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = this.calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = this.options.baseScale + i * this.options.itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = this.options.rotationAmount ? i * this.options.rotationAmount * scaleProgress : 0;

            // Calculate blur based on depth
            let blur = 0;
            if (this.options.blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < this.cards.length; j++) {
                    const jCardTop = this.getElementOffset(this.cards[j]);
                    const jTriggerStart = jCardTop - stackPositionPx - this.options.itemStackDistance * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * this.options.blurAmount);
                }
            }

            // Calculate translateY
            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + this.options.itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + this.options.itemStackDistance * i;
            }

            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const lastTransform = this.lastTransforms.get(i);
            const hasChanged = !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

                card.style.transform = transform;
                card.style.filter = filter;

                this.lastTransforms.set(i, newTransform);
            }

            // Check stack completion
            if (i === this.cards.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !this.stackCompleted) {
                    this.stackCompleted = true;
                    if (this.options.onStackComplete) {
                        this.options.onStackComplete();
                    }
                } else if (!isInView && this.stackCompleted) {
                    this.stackCompleted = false;
                }
            }
        });

        this.isUpdating = false;
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        if (this.options.useWindowScroll) {
            window.removeEventListener('scroll', this.handleScroll);
        } else {
            this.container.removeEventListener('scroll', this.handleScroll);
        }

        this.cards = [];
        this.lastTransforms.clear();
    }
}

// Auto-initialize scroll stacks
function initScrollStacks() {
    const stacks = document.querySelectorAll('[data-scroll-stack]');

    stacks.forEach(stack => {
        const options = {
            itemDistance: parseInt(stack.getAttribute('data-item-distance')) || 80,
            itemScale: parseFloat(stack.getAttribute('data-item-scale')) || 0.03,
            itemStackDistance: parseInt(stack.getAttribute('data-stack-distance')) || 25,
            stackPosition: stack.getAttribute('data-stack-position') || '25%',
            baseScale: parseFloat(stack.getAttribute('data-base-scale')) || 0.88,
            blurAmount: parseFloat(stack.getAttribute('data-blur-amount')) || 0,
            useWindowScroll: stack.getAttribute('data-use-window-scroll') !== 'false'
        };

        new ScrollStack(stack, options);
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollStacks);
} else {
    initScrollStacks();
}

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollStack;
}
