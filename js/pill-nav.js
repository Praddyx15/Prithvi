// ===================================
// PILL NAVIGATION
// Vanilla JS implementation inspired by ReactBits PillNav
// ===================================

class PillNavigation {
  constructor(options = {}) {
    this.options = {
      ease: options.ease || 'power3.out',
      baseColor: options.baseColor || '#FAFAF8',
      pillColor: options.pillColor || '#4A3828',
      hoveredPillTextColor: options.hoveredPillTextColor || '#4A3828',
      pillTextColor: options.pillTextColor || '#FAFAF8',
      initialLoadAnimation: options.initialLoadAnimation !== false,
      ...options
    };

    this.circleRefs = [];
    this.tlRefs = [];
    this.activeTweenRefs = [];
    this.isMobileMenuOpen = false;

    this.nav = document.querySelector('.pill-nav');
    this.logoElement = document.querySelector('.pill-logo');
    this.logoImg = this.logoElement?.querySelector('img');
    this.navItems = document.querySelector('.pill-nav-items');
    this.hamburger = document.querySelector('.mobile-menu-button');
    this.mobileMenu = document.querySelector('.mobile-menu-popover');
    this.pills = document.querySelectorAll('.pill');

    this.init();
  }

  init() {
    if (!window.gsap) {
      console.warn('GSAP not loaded. Loading from CDN...');
      this.loadGSAP().then(() => this.setup());
    } else {
      this.setup();
    }
  }

  loadGSAP() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  setup() {
    // Apply CSS variables
    if (this.nav) {
      this.nav.style.setProperty('--base', this.options.baseColor);
      this.nav.style.setProperty('--pill-bg', this.options.pillColor);
      this.nav.style.setProperty('--hover-text', this.options.hoveredPillTextColor);
      this.nav.style.setProperty('--pill-text', this.options.pillTextColor);
    }

    // Setup hover circles
    this.pills.forEach((pill, index) => {
      const circle = pill.querySelector('.hover-circle');
      if (circle) {
        this.circleRefs[index] = circle;
        this.setupPillAnimation(pill, circle, index);
      }
    });

    // Initial layout
    this.layout();

    // Event listeners
    this.attachEventListeners();

    // Initial load animation
    if (this.options.initialLoadAnimation && window.gsap) {
      this.playLoadAnimation();
    }

    // Mobile menu setup
    if (this.mobileMenu) {
      gsap.set(this.mobileMenu, { visibility: 'hidden', opacity: 0 });
    }
  }

  layout() {
    if (!window.gsap) return;

    this.circleRefs.forEach((circle, index) => {
      if (!circle?.parentElement) return;

      const pill = circle.parentElement;
      const rect = pill.getBoundingClientRect();
      const { width: w, height: h } = rect;

      // Calculate circle properties for perfect pill effect
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`
      });

      const label = pill.querySelector('.pill-label');
      const hoverLabel = pill.querySelector('.pill-label-hover');

      if (label) gsap.set(label, { y: 0 });
      if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

      // Create timeline for this pill
      if (this.tlRefs[index]) {
        this.tlRefs[index].kill();
      }

      const tl = gsap.timeline({ paused: true });

      tl.to(circle, {
        scale: 1.2,
        xPercent: -50,
        duration: 2,
        ease: this.options.ease,
        overwrite: 'auto'
      }, 0);

      if (label) {
        tl.to(label, {
          y: -(h + 8),
          duration: 2,
          ease: this.options.ease,
          overwrite: 'auto'
        }, 0);
      }

      if (hoverLabel) {
        gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(hoverLabel, {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: this.options.ease,
          overwrite: 'auto'
        }, 0);
      }

      this.tlRefs[index] = tl;
    });
  }

  setupPillAnimation(pill, circle, index) {
    // Mouse enter
    pill.addEventListener('mouseenter', () => {
      const tl = this.tlRefs[index];
      if (!tl) return;

      if (this.activeTweenRefs[index]) {
        this.activeTweenRefs[index].kill();
      }

      this.activeTweenRefs[index] = tl.tweenTo(tl.duration(), {
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    // Mouse leave
    pill.addEventListener('mouseleave', () => {
      const tl = this.tlRefs[index];
      if (!tl) return;

      if (this.activeTweenRefs[index]) {
        this.activeTweenRefs[index].kill();
      }

      this.activeTweenRefs[index] = tl.tweenTo(0, {
        duration: 0.4,
        ease: 'power2.in',
        overwrite: 'auto'
      });
    });
  }

  attachEventListeners() {
    // Logo rotation on hover
    if (this.logoElement && this.logoImg) {
      this.logoElement.addEventListener('mouseenter', () => {
        if (!window.gsap) return;
        gsap.set(this.logoImg, { rotate: 0 });
        gsap.to(this.logoImg, {
          rotate: 360,
          duration: 0.6,
          ease: this.options.ease,
          overwrite: 'auto'
        });
      });
    }

    // Hamburger menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Close mobile menu when clicking a link
    const mobileLinks = this.mobileMenu?.querySelectorAll('.mobile-menu-link');
    if (mobileLinks) {
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      });
    }

    // Resize handler
    window.addEventListener('resize', () => this.layout());

    // Font loading handler
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => this.layout()).catch(() => { });
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  openMobileMenu() {
    if (!window.gsap) return;

    const lines = this.hamburger.querySelectorAll('.hamburger-line');
    if (lines.length >= 2) {
      gsap.to(lines[0], { rotation: 45, y: 4, duration: 0.3, ease: this.options.ease });
      gsap.to(lines[1], { rotation: -45, y: -4, duration: 0.3, ease: this.options.ease });
    }

    if (this.mobileMenu) {
      gsap.set(this.mobileMenu, { visibility: 'visible' });
      gsap.fromTo(
        this.mobileMenu,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: this.options.ease
        }
      );
    }
  }

  closeMobileMenu() {
    if (!window.gsap) return;

    this.isMobileMenuOpen = false;

    const lines = this.hamburger.querySelectorAll('.hamburger-line');
    if (lines.length >= 2) {
      gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: this.options.ease });
      gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: this.options.ease });
    }

    if (this.mobileMenu) {
      gsap.to(this.mobileMenu, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: this.options.ease,
        onComplete: () => {
          gsap.set(this.mobileMenu, { visibility: 'hidden' });
        }
      });
    }
  }

  playLoadAnimation() {
    if (!window.gsap) return;

    if (this.logoElement) {
      gsap.set(this.logoElement, { scale: 0 });
      gsap.to(this.logoElement, {
        scale: 1,
        duration: 0.6,
        ease: this.options.ease
      });
    }

    if (this.navItems) {
      gsap.set(this.navItems, { width: 0, overflow: 'hidden' });
      gsap.to(this.navItems, {
        width: 'auto',
        duration: 0.6,
        ease: this.options.ease,
        delay: 0.2
      });
    }
  }

  destroy() {
    // Kill all animations
    this.tlRefs.forEach(tl => tl?.kill());
    this.activeTweenRefs.forEach(tween => tween?.kill());

    // Remove event listeners
    window.removeEventListener('resize', this.layout);
  }
}

// Auto-initialize on DOM ready
function initPillNav() {
  const nav = document.querySelector('.pill-nav');
  if (nav && !nav.dataset.pillNavInitialized) {
    nav.dataset.pillNavInitialized = 'true';
    window.pillNavInstance = new PillNavigation({
      baseColor: '#FAFAF8',
      pillColor: '#4A3828',
      hoveredPillTextColor: '#FAFAF8',
      pillTextColor: '#FAFAF8',
      ease: 'power3.out',
      initialLoadAnimation: true
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPillNav);
} else {
  initPillNav();
}
