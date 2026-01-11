// ===================================
// SPLIT TEXT ANIMATION
// Custom implementation inspired by GSAP
// ===================================

class SplitText {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            type: options.type || 'chars', // 'chars', 'words', or 'lines'
            delay: options.delay || 50, // ms delay between each item
            duration: options.duration || 800, // ms animation duration
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '-100px',
            from: options.from || { opacity: 0, y: 40 },
            to: options.to || { opacity: 1, y: 0 },
            ...options
        };

        this.originalText = this.element.textContent;
        this.splitItems = [];
        this.observer = null;

        this.init();
    }

    init() {
        // Split the text
        this.split();

        // Set up intersection observer for scroll trigger
        this.setupObserver();
    }

    split() {
        const text = this.originalText;
        this.element.innerHTML = '';
        this.element.style.overflow = 'hidden';
        this.element.style.display = 'inline-block';

        if (this.options.type === 'chars') {
            this.splitChars(text);
        } else if (this.options.type === 'words') {
            this.splitWords(text);
        }
    }

    splitChars(text) {
        const chars = text.split('');

        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = `translateY(${this.options.from.y}px)`;
            span.style.transition = `all ${this.options.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            span.style.willChange = 'transform, opacity';

            this.element.appendChild(span);
            this.splitItems.push(span);
        });
    }

    splitWords(text) {
        const words = text.split(/\s+/);

        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = `translateY(${this.options.from.y}px)`;
            span.style.transition = `all ${this.options.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            span.style.willChange = 'transform, opacity';
            span.style.marginRight = '0.25em';

            this.element.appendChild(span);
            this.splitItems.push(span);

            // Add space except after last word
            if (index < words.length - 1) {
                this.element.appendChild(document.createTextNode(' '));
            }
        });
    }

    setupObserver() {
        const options = {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate();
                    this.observer.disconnect();
                }
            });
        }, options);

        this.observer.observe(this.element);
    }

    animate() {
        this.splitItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = this.options.to.opacity !== undefined ? this.options.to.opacity : '1';
                item.style.transform = `translateY(${this.options.to.y || 0}px)`;
            }, index * this.options.delay);
        });

        // Call completion callback if provided
        if (this.options.onComplete) {
            const totalDuration = (this.splitItems.length * this.options.delay) + this.options.duration;
            setTimeout(() => {
                this.options.onComplete();
            }, totalDuration);
        }
    }

    revert() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.element.innerHTML = this.originalText;
    }
}

// ===================================
// AUTO-INITIALIZE SPLIT TEXT ELEMENTS
// ===================================

function initSplitTextElements() {
    // Find all elements with data-split-text attribute
    const elements = document.querySelectorAll('[data-split-text]');

    elements.forEach(element => {
        const type = element.getAttribute('data-split-type') || 'chars';
        const delay = parseInt(element.getAttribute('data-split-delay')) || 50;
        const duration = parseInt(element.getAttribute('data-split-duration')) || 800;

        new SplitText(element, {
            type: type,
            delay: delay,
            duration: duration,
            threshold: 0.1,
            rootMargin: '-100px'
        });
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplitTextElements);
} else {
    initSplitTextElements();
}

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SplitText;
}
