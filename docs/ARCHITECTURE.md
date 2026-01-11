# Technical Architecture

## Overview

This document provides a comprehensive technical overview of the **Psychoanalytically Speaking** website architecture, including design patterns, component structure, data flow, and technical decisions.

---

## Architecture Principles

### 1. **Progressive Enhancement**
- Core content accessible without JavaScript
- Animations enhance but aren't required
- Graceful degradation for older browsers

### 2. **Separation of Concerns**
- **HTML**: Structure and content
- **CSS**: Presentation and layout
- **JavaScript**: Behavior and interactions

### 3. **Component-Based Design**
- Reusable, modular components
- Encapsulated styles and behavior
- Clear component APIs

### 4. **Performance First**
- Minimal dependencies
- Lazy-loaded animations
- Efficient event handling
- GPU-accelerated transforms

---

## Project Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (HTML Pages - Content & Structure)     │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          Styling Layer                  │
│  (CSS Modules - Visual Presentation)    │
│                                         │
│  - base.css (Reset)                     │
│  - design-system.css (Tokens)           │
│  - components.css (UI Components)       │
│  - pages.css (Page-specific)            │
│  - animations.css (Motion)              │
│  - decorative.css (Graphics)            │
│  - pill-nav.css (Navigation)            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Behavior Layer                  │
│  (JavaScript Modules - Interactions)    │
│                                         │
│  - main.js (Core logic)                 │
│  - pill-nav.js (Navigation)             │
│  - silk-background.js (WebGL)           │
│  - split-text.js (Animations)           │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         External Dependencies           │
│  (CDN-loaded libraries)                 │
│                                         │
│  - Three.js (WebGL rendering)           │
│  - GSAP (Animation engine)              │
└─────────────────────────────────────────┘
```

---

## CSS Architecture

### File Organization

#### 1. **base.css** - CSS Reset
- Normalizes browser defaults
- Sets box-sizing: border-box
- Removes default margins/paddings
- Defines root element styles

#### 2. **design-system.css** - Design Tokens
- CSS Custom Properties (variables)
- Color palette
- Typography scale
- Spacing system
- Breakpoints

#### 3. **components.css** - UI Components
- Navigation (.site-nav, .pill-nav)
- Buttons (.btn-*)
- Cards (.card, .quick-link-card)
- Forms (.form-*)
- Footer (.site-footer)

#### 4. **pages.css** - Page-Specific Styles
- Homepage (.quick-links, .philosophy-points)
- Blog page (.blog-list, .blog-post-card)
- Consultation (.fee-table, .availability-schedule)
- Contact (.contact-methods)
- Readings (.reading-list, .reading-item)

#### 5. **animations.css** - Motion & Effects
- Keyframe animations
- Scroll reveal (.reveal)
- Hover effects
- Transitions
- Stagger animations

#### 6. **decorative.css** - Decorative Graphics
- Side graphics (.decorative-graphic)
- Philosophy icons (.philosophy-point)
- Section dividers
- Background patterns

#### 7. **pill-nav.css** - Pill Navigation
- Desktop pill styles
- Hover circle effects
- Mobile menu
- Responsive breakpoints

### Naming Convention

**BEM-inspired** (Block Element Modifier):
```css
.block { }
.block__element { }
.block--modifier { }

/* Examples */
.pill-nav { }
.pill-nav__items { }
.pill--active { }
```

### CSS Custom Properties Strategy

**Centralized in design-system.css**:
```css
:root {
  /* Colors */
  --color-primary: #4A3828;
  
  /* Typography */
  --font-serif: 'Crimson Text', Georgia, serif;
  --text-base: 1rem;
  
  /* Spacing */
  --space-4: 1rem;
  
  /* Layout */
  --container-max-width: 1200px;
}
```

**Benefits**:
- Single source of truth
- Easy theming
- Runtime updates possible
- Inheritance and cascading

---

## JavaScript Architecture

### Module Pattern

Each JavaScript file is a self-contained module:

```javascript
// Class-based module
class ComponentName {
  constructor(options) {
    this.options = options;
    this.init();
  }
  
  init() {
    // Setup
  }
  
  destroy() {
    // Cleanup
  }
}

// Auto-initialization
function initComponent() {
  // Find elements, create instances
}

// DOM ready check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponent);
} else {
  initComponent();
}
```

### Component: PillNavigation

**File**: `js/pill-nav.js`

**Responsibilities**:
- Pill hover animations
- Mobile menu toggle
- Logo rotation effect
- Active state management
- GSAP timeline control

**Class Structure**:
```javascript
class PillNavigation {
  constructor(options) { }
  
  // Initialization
  init() { }
  loadGSAP() { }
  setup() { }
  
  // Layout & Animation
  layout() { }
  setupPillAnimation(pill, circle, index) { }
  
  // Event Handlers
  attachEventListeners() { }
  toggleMobileMenu() { }
  openMobileMenu() { }
  closeMobileMenu() { }
  
  // Lifecycle
  playLoadAnimation() { }
  destroy() { }
}
```

**Data Flow**:
```
User Hover → Event Listener → GSAP Timeline
                                      ↓
             Circle Scale + Text Slide Animation
                                      ↓
             requestAnimationFrame → Render
```

### Component: SilkBackground

**File**: `js/silk-background.js`

**Responsibilities**:
- WebGL context creation
- Shader compilation
- Animation loop
- Responsive canvas sizing

**Class Structure**:
```javascript
class SilkBackground {
  constructor(containerId, options) { }
  
  // Setup
  init() { }
  hexToNormalizedRGB(hex) { }
  
  // WebGL
  createShaderMaterial() { }
  
  // Lifecycle
  handleResize() { }
  animate() { }
  destroy() { }
}
```

**Shader Pipeline**:
```
Vertex Shader → Fragment Shader → Screen
     ↓               ↓
  Position      Noise Pattern
  Transform     Color Mixing
                Wave Function
```

### Component: SplitText

**File**: `js/split-text.js`

**Responsibilities**:
- Text splitting (chars/words)
- Intersection Observer setup
- Staggered animation timing

**Class Structure**:
```javascript
class SplitText {
  constructor(element, options) { }
  
  // Initialization
  init() { }
  split() { }
  splitChars(text) { }
  splitWords(text) { }
  
  // Animation
  setupObserver() { }
  animate() { }
  
  // Cleanup
  revert() { }
}
```

**Animation Flow**:
```
Page Load → Intersection Observer → Element in View
                                           ↓
             Split Text into Spans (chars/words)
                                           ↓
             Animate Each Span with Stagger Delay
                                           ↓
             CSS Transition (opacity, translateY)
```

### Component: Main

**File**: `js/main.js`

**Responsibilities**:
- Mobile menu toggle (legacy)
- Smooth scroll for anchors
- Contact form handling
- Active navigation state
- Scroll reveal
- Scroll progress indicator
- Parallax effects

---

## Data Flow Diagrams

### Navigation Interaction Flow

```
User Hovers on Pill
        ↓
JavaScript: mouseenter event
        ↓
GSAP: Play timeline forward (tweenTo)
        ↓
Animations run in parallel:
  - Circle: scale 0 → 1.2
  - Label: translateY 0 → -(height+8)
  - HoverLabel: translateY (height+100) → 0, opacity 0 → 1
        ↓
User Moves Away
        ↓
JavaScript: mouseleave event
        ↓
GSAP: Reverse timeline (tweenTo 0)
        ↓
Elements return to original state
```

### Page Load Sequence

```
1. HTML Parse
        ↓
2. CSS Load & Parse
   - base.css
   - design-system.css
   - components.css, pages.css
   - animations.css, decorative.css
   - pill-nav.css
        ↓
3. JavaScript Execute
   - silk-background.js (load Three.js if needed)
   - split-text.js (find & split elements)
   - pill-nav.js (load GSAP if needed, setup nav)
   - main.js (core interactions)
        ↓
4. DOMContentLoaded Event
   - Initialize all components
   - Setup event listeners
   - Calculate layouts
        ↓
5. Intersection Observer Triggers
   - Reveal animations on scroll
   - Split-text animations
        ↓
6. User Interactions
   - Hover, click, scroll events
   - GSAP handles animations
```

---

## Performance Optimization

### Critical Rendering Path

1. **Inline Critical CSS** (optional enhancement)
   - Above-the-fold styles
   - Deferred loading for rest

2. **Defer JavaScript**
   ```html
   <script defer src="js/main.js"></script>
   ```

3. **Preconnect to CDNs**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://cdnjs.cloudflare.com">
   ```

### Rendering Optimization

#### CSS
- **GPU Acceleration**: `transform`, `opacity` (no layout changes)
- **Will-change hints**: `.pill-label { will-change: transform, opacity; }`
- **Contain property**: Isolate expensive calculations

#### JavaScript
- **debounced Resize**: Throttle layout recalculations
- **requestAnimationFrame**: Sync with browser paint cycle
- **Event Delegation**: Single listener for multiple elements

### Memory Management

**Component Cleanup**:
```javascript
destroy() {
  // Kill animations
  this.tlRefs.forEach(tl => tl?.kill());
  
  // Remove event listeners
  window.removeEventListener('resize', this.layout);
  
  // Clear references
  this.circleRefs = [];
  this.tlRefs = [];
}
```

---

## Browser Compatibility Strategy

### Feature Detection

```javascript
// Check for required APIs
if (typeof IntersectionObserver === 'undefined') {
  // Polyfill or fallback
}

if (!window.gsap) {
  // Load GSAP from CDN
}
```

### Graceful Degradation

```css
/* Base styles work without CSS Grid */
.pill-list {
  display: flex;
  flex-wrap: wrap;
}

/* Enhanced with Grid */
@supports (display: grid) {
  .pill-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Security Considerations

### Content Security Policy (CSP)

Recommended headers:
```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' https://cdnjs.cloudflare.com; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  font-src 'self' https://fonts.gstatic.com; 
  img-src 'self' data:;
```

### XSS Prevention

- No user-generated content rendered
- No `eval()` or `innerHTML` with user data
- All external links use `rel="noopener"`

---

## Scalability

### Adding New Pages

1. Copy template (e.g., `about.html`)
2. Update `<title>` and meta tags
3. Update active navigation state
4. Add page-specific content
5. Test responsive layout

### Adding New Components

1. Create styles in appropriate CSS file
2. Create JavaScript module if needed
3. Use data-attributes for configuration
4. Document in component library

---

## Testing Strategy

### Manual Testing

- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Responsive**: 320px, 768px, 1024px, 1920px
- **Accessibility**: Keyboard navigation, screen readers
- **Performance**: Lighthouse, WebPageTest

### Automated Testing (Future)

- **HTML Validation**: W3C Validator
- **CSS Validation**: W3C CSS Validator
- **Lighthouse CI**: Automated performance checks
- **Visual Regression**: Percy, Chromatic

---

## Deployment Architecture

### Static Hosting

```
CDN Edge Nodes
       ↓
Static Files (HTML, CSS, JS, Images)
       ↓
Browser Cache
       ↓
User's Browser
```

### Recommended Hosts

1. **Netlify**: Auto-deploy from Git
2. **Vercel**: Zero-config deployment
3. **GitHub Pages**: Free hosting
4. **Cloudflare Pages**: Global CDN

---

## Future Architecture Enhancements

### Short Term
- [ ] Service Worker for offline support
- [ ] Image lazy loading
- [ ] Critical CSS extraction
- [ ] JavaScript minification

### Medium Term
- [ ] Static Site Generator (11ty, Hugo)
- [ ] Build pipeline (Vite, Parcel)
- [ ] Component library documentation
- [ ] E2E testing (Playwright, Cypress)

### Long Term
- [ ] Headless CMS integration (Sanity, Contentful)
- [ ] Multi-language support (i18n)
- [ ] Dark mode
- [ ] Advanced analytics

---

## Conclusion

This architecture prioritizes:
- **Simplicity**: No frameworks, minimal dependencies
- **Performance**: Fast load times, smooth animations
- **Maintainability**: Clear separation, modular design
- **Accessibility**: Semantic HTML, ARIA labels
- **Scalability**: Easy to extend and modify

The vanilla JavaScript approach provides full control while maintaining modern development practices.
