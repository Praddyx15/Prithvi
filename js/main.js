// ===================================
// MAIN JAVASCRIPT
// Minimal interactions for the website
// ===================================

document.addEventListener('DOMContentLoaded', function () {

    // ============ MOBILE MENU TOGGLE ============
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', function () {
            siteNav.classList.toggle('active');

            // Update aria-expanded for accessibility
            const isExpanded = siteNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!menuToggle.contains(event.target) && !siteNav.contains(event.target)) {
                siteNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking on a navigation link
        const navLinks = siteNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                siteNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" (empty anchor)
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // ============ CONTACT FORM HANDLING ============
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const formMessageText = document.getElementById('formMessageText');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // In a real implementation, this would send data to a server
            // For now, we'll simulate a successful submission
            console.log('Form data:', formData);

            // Show success message
            showFormMessage(
                'Thank you for your message. You will receive a response within 2-3 business days.',
                'success'
            );

            // Reset form
            contactForm.reset();

            // Note: In production, you would integrate with a form handling service
            // such as Formspree, EmailJS, or a custom backend endpoint
        });
    }

    function showFormMessage(message, type) {
        if (formMessage && formMessageText) {
            formMessageText.textContent = message;
            formMessage.style.display = 'block';
            formMessage.style.borderLeftColor = type === 'success'
                ? 'var(--color-green-medium)'
                : 'var(--color-indigo)';

            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // ============ ACTIVE NAVIGATION STATE ============
    // Highlight current page in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.site-nav a');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        if (currentPath.endsWith(linkPath) ||
            (currentPath === '/' && linkPath.endsWith('index.html'))) {
            link.classList.add('active');
        }
    });

});

// ============ ACCESSIBILITY: Skip to Main Content ============
// Add this functionality if you want to include a skip link for screen readers
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-brown-dark);
    color: var(--color-off-white);
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
  `;

    skipLink.addEventListener('focus', function () {
        this.style.top = '0';
    });

    skipLink.addEventListener('blur', function () {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add id to main content
    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// Uncomment to enable skip link
// addSkipLink();

// ============ SCROLL REVEAL ANIMATION ============
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Initial check
if (revealElements.length > 0) {
    window.addEventListener('scroll', revealOnScroll);
    setTimeout(revealOnScroll, 100); // Check on load
}

// ============ SCROLL PROGRESS INDICATOR ============
function updateScrollProgress() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
}

// Create scroll indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', updateScrollProgress);

// ============ PARALLAX EFFECT ============
const parallaxElements = document.querySelectorAll('.parallax');

function handleParallax() {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

if (parallaxElements.length > 0) {
    window.addEventListener('scroll', handleParallax);
}

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});
