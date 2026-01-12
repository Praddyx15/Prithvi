/* ===================================
   SCROLL STACK ANIMATION
   Simplified vanilla JS implementation
   Cards stack on scroll with smooth effects
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
            stackOffset: options.stackOffset || 20,  // Offset between stacked cards
            scaleFactor: options.scaleFactor || 0.02, // How much each card scales down
            blurAmount: options.blurAmount || 1.5,   // Blur for depth effect
            stickyTop: options.stickyTop || 150,     // Position from top when sticky
            ...options
        };

        this.cards = [];
        this.init();
    }

    init() {
        // Find all stack cards
        this.cards = Array.from(this.container.querySelectorAll('.scroll-stack-card'));

        if (this.cards.length === 0) {
            console.warn('ScrollStack: No .scroll-stack-card elements found');
            return;
        }

        // Setup sticky positioning for each card
        this.cards.forEach((card, i) => {
            // Make each card sticky at progressively lower positions
            card.style.position = 'sticky';
            card.style.top = `${this.options.stickyTop + (i * this.options.stackOffset)}px`;
            card.style.zIndex = i + 1;
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease';
        });

        // Bind scroll handler
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handleScroll, { passive: true });

        // Initial update
        this.handleScroll();
    }

    handleScroll() {
        const viewportHeight = window.innerHeight;

        this.cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const cardTop = rect.top;
            const stickyPosition = this.options.stickyTop + (i * this.options.stackOffset);

            // Check if card is stuck at the top
            const isStuck = cardTop <= stickyPosition + 5;

            // Calculate depth based on how many cards are stacked above
            let cardsAbove = 0;
            for (let j = i + 1; j < this.cards.length; j++) {
                const otherRect = this.cards[j].getBoundingClientRect();
                const otherStickyPos = this.options.stickyTop + (j * this.options.stackOffset);
                if (otherRect.top <= otherStickyPos + 5) {
                    cardsAbove++;
                }
            }

            // Apply transforms based on depth
            if (cardsAbove > 0) {
                const scale = 1 - (cardsAbove * this.options.scaleFactor);
                const blur = cardsAbove * this.options.blurAmount;

                card.style.transform = `scale(${scale})`;
                card.style.filter = `blur(${blur}px)`;
                card.style.boxShadow = '0 4px 20px rgba(61, 40, 23, 0.1)';
            } else {
                card.style.transform = 'scale(1)';
                card.style.filter = 'blur(0px)';
                card.style.boxShadow = 'var(--shadow-md)';
            }
        });
    }

    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}

// Auto-initialize scroll stacks
function initScrollStacks() {
    const stacks = document.querySelectorAll('[data-scroll-stack]');

    stacks.forEach(stack => {
        const options = {
            stackOffset: parseInt(stack.getAttribute('data-stack-offset')) || 20,
            scaleFactor: parseFloat(stack.getAttribute('data-scale-factor')) || 0.02,
            blurAmount: parseFloat(stack.getAttribute('data-blur-amount')) || 1.5,
            stickyTop: parseInt(stack.getAttribute('data-sticky-top')) || 150
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
