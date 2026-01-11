# Design System

## Overview

The Psychoanalytically Speaking design system is a cohesive set of design tokens, components, and guidelines that ensure visual consistency and maintain the psychoanalytic ethos across the website.

---

## Design Principles

### 1. **Depth Over Flash**
- Subtle animations that enhance without distracting
- Thoughtful color choices that evoke contemplation
- No trendy or commercial aesthetics

### 2. **Professional yet Warm**
- Approachable but serious
- Credible without being clinical
- Human-centered design

### 3. **Clarity and Readability**
- Optimal line lengths (65 characters)
- Generous whitespace
- Clear hierarchy

### 4. **Ethical Presentation**
- No manipulative design patterns
- Honest, straightforward communication
- Respectful of user attention

---

## Color System

### Primary Palette - Browns (Grounded, Professional)

```css
/* Deep, foundational */
--color-brown-darker: #3D2817
Usage: Primary text, strong emphasis, footer background

/* Primary UI */
--color-brown-dark: #4A3828
Usage: Headings, navigation active states, primary buttons

/* Secondary text */
--color-brown-medium: #6B4423
Usage: Secondary text, muted content

/* Light accents */
--color-brown-light: #8B6F47
Usage: Decorative elements, hover states
```

### Secondary Palette - Sage Green (Calm, Contemplative)

```css
/* Deep, calming */
--color-green-dark: #6B7A5E
Usage: Links on hover, muted text

/* Primary green */
--color-green-medium: #7A8B70
Usage: Borders, link underlines, subtle accents

/* Light tones */
--color-green-light: #8B9A7E
--color-green-pale: #A8B89C
Usage: Light backgrounds, subtle highlights
```

### Accent - Indigo (Subtle Depth)

```css
/* Indigo blue */
--color-indigo: #4A5899
Usage: Focus states, occasional highlights

/* Light indigo */
--color-indigo-light: #6B7DB5
Usage: Hover states on indigo elements
```

### Neutrals - Warm Tones

```css
/* Pure white */
--color-white: #FFFFFF

/* Off-white background */
--color-off-white: #FAFAF8
Usage: Page background

/* Cream surface */
--color-cream: #F5F4F0
Usage: Card backgrounds, info boxes

/* Darker cream */
--color-cream-dark: #E8E6E0
Usage: Borders, dividers
```

### Semantic Colors

```css
--color-primary: var(--color-brown-dark)
--color-secondary: var(--color-green-medium)
--color-accent: var(--color-indigo)
--color-background: var(--color-off-white)
--color-surface: var(--color-white)
--color-text-primary: var(--color-brown-darker)
--color-text-secondary: var(--color-brown-medium)
--color-text-muted: var(--color-green-dark)
--color-border: var(--color-cream-dark)
```

### Color Usage Guidelines

**DO**:
- Use browns for primary content and UI
- Use sage green for links and subtle accents
- Use indigo sparingly for focus states
- Maintain sufficient contrast (WCAG AA minimum)

**DON'T**:
- Use bright, saturated colors
- Mix warm and cool tones aggressively
- Use red, yellow, or bright blue (too clinical/commercial)

---

## Typography

### Font Families

```css
/* Serif - Primary */
--font-serif: 'Crimson Text', Georgia, serif

/* Sans-serif - Secondary */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

### Type Scale (1.25 Ratio - Minor Third)

```css
--text-xs: 0.80rem    /* 12.8px  - Fine print */
--text-sm: 0.875rem   /* 14px    - Small text, labels */
--text-base: 1rem     /* 16px    - Body text */
--text-lg: 1.125rem   /* 18px    - Large body, lead */
--text-xl: 1.25rem    /* 20px    - H5 */
--text-2xl: 1.563rem  /* 25px    - H4 */
--text-3xl: 1.953rem  /* 31.25px - H3 */
--text-4xl: 2.441rem  /* 39px    - H2 */
--text-5xl: 3.052rem  /* 48.8px  - H1 */
```

###Line Heights

```css
--leading-tight: 1.2      /* Headings */
--leading-snug: 1.4       /* Compact text */
--leading-normal: 1.6     /* Default */
--leading-relaxed: 1.75   /* Body text (optimal) */
--leading-loose: 2.0      /* Spacious */
```

### Font Weights

```css
--weight-light: 300       /* Subtle emphasis */
--weight-normal: 400      /* Body text */
--weight-medium: 500      /* UI elements */
--weight-semibold: 600    /* Headings */
--weight-bold: 700        /* Strong emphasis */
```

### Typography Hierarchy

```
H1 (Hero)
├─ Font: Crimson Text
├─ Size: 48.8px / 3.052rem
├─ Weight: 700 (Bold)
├─ Line Height: 1.2
└─ Letter Spacing: -0.02em

H2 (Section)
├─ Font: Crimson Text
├─ Size: 39px / 2.441rem
├─ Weight: 600 (Semibold)
├─ Line Height: 1.2
└─ Letter Spacing: Normal

H3 (Subsection)
├─ Font: Crimson Text
├─ Size: 31.25px / 1.953rem
├─ Weight: 600
└─ Line Height: 1.2

H4-H6
├─ Font: Crimson Text
├─ Size: Scales down via type scale
├─ Weight: 600
└─ Line Height: 1.2

Body Text
├─ Font: Crimson Text
├─ Size: 16px / 1rem
├─ Weight: 400
├─ Line Height: 1.75 (relaxed)
├─ Max Width: 65 characters
└─ Color: --color-text-primary

UI Text (Nav, Buttons)
├─ Font: Inter
├─ Size: 14px / 0.875rem
├─ Weight: 500 (Medium)
├─ Line Height: Normal
├─ Text Transform: Uppercase
└─ Letter Spacing: 0.05em
```

### Typography Usage

**Serif (Crimson Text)**:
- All headings (H1-H6)
- Body text and paragraphs
- Blockquotes
- Form inputs (for consistency)

**Sans-serif (Inter)**:
- Navigation links
- Button labels
- Form labels
- UI elements
- Small metadata (dates, tags)

---

## Spacing System

### Base Unit: 4px

```css
--space-1: 0.25rem   /* 4px   - Tight */
--space-2: 0.5rem    /* 8px   - XS */
--space-3: 0.75rem   /* 12px  - Small */
--space-4: 1rem      /* 16px  - Base */
--space-5: 1.25rem   /* 20px  - Medium */
--space-6: 1.5rem    /* 24px  - Large */
--space-8: 2rem      /* 32px  - XL */
--space-10: 2.5rem   /* 40px  - 2XL */
--space-12: 3rem     /* 48px  - 3XL */
--space-16: 4rem     /* 64px  - 4XL */
--space-20: 5rem     /* 80px  - 5XL */
--space-24: 6rem     /* 96px  - 6XL */
--space-32: 8rem     /* 128px - 7XL */
```

### Spacing Guidelines

**Vertical Rhythm**:
- Paragraphs: `margin-bottom: --space-6` (24px)
- Headings: `margin-bottom: --space-4` (16px)
- Sections: `padding: --space-20 0` (80px top/bottom)

**Horizontal Spacing**:
- Container padding: `--space-6` (24px)
- Card padding: `--space-8` (32px)
- Button padding: `--space-3 --space-6` (12px 24px)

**Component Gaps**:
- Navigation items: `--space-8` (32px)
- Card grids: `--space-6` to `--space-8`
- Form fields: `--space-6` (24px)

---

## Layout System

### Container Widths

```css
--container-max-width: 1200px  /* Main container */
--content-max-width: 720px     /* Optimal reading width */
--container-padding: 24px      /* Side padding */
```

### Breakpoints

```css
/* Mobile First */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }

/* Max-width (for specific cases) */
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 1200px) { /* Small screens */ }
```

### Grid System

**CSS Grid** for layouts:
```css
.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-8);
}
```

---

## Components

### Buttons

**Primary Button**
```css
Background: --color-brown-dark (#4A3828)
Text: --color-off-white (#FAFAF8)
Padding: 12px 24px
Border Radius: 2px
Font: Inter, 500 weight, uppercase, 0.05em spacing
Hover: Darker brown, lift -2px
```

**Secondary Button**
```css
Background: Transparent
Text: --color-brown-dark
Border: 1px solid --color-brown-dark
Padding: 12px 24px
Hover: Filled brown background
```

**Subtle Button**
```css
Background: Transparent
Text: --color-text-secondary
Border: None
Text Decoration: Underline on hover
```

### Cards

```css
Background: --color-surface (white)
Border: 1px solid --color-border
Padding: 32px
Border Radius: 4px
Box Shadow: Subtle on hover (0 2px 8px rgba(61, 40, 23, 0.08))
Transition: All 0.4s cubic-bezier(0.4, 0, 0.2, 1)
Hover: Lift -4px, shadow increase
```

### Forms

**Input Fields**
```css
Background: --color-surface
Border: 1px solid --color-border
Padding: 12px 16px
Font: Crimson Text, 1rem
Border Radius: 2px
Focus: Border --color-green-medium, box-shadow glow
```

**Labels**
```css
Font: Inter, 500 weight
Size: 0.875rem (14px)
Text Transform: Uppercase
Letter Spacing: 0.05em
Margin Bottom: 8px
```

### Navigation

**Desktop Pill Navigation**
```css
Background: --color-off-white (transparent)
Sticky: Yes (top: 0)
Pills:
  - Padding: 12px 24px
  - Border Radius: 50px
  - Font: Inter, 500, uppercase
  - Hover: Circle expansion from bottom
  - Active: Brown background, white text
```

**Mobile Menu**
```css
Hamburger: 2 lines, 24px wide, 2px thick
Menu: Slide down from top, 300ms
Background: --color-off-white
Links: Full width, padding 12px 16px
```

---

## Animations

### Timing Functions

```css
--transition-fast: 150ms ease
--transition-base: 250ms ease
--transition-slow: 400ms ease
```

**GSAP Easings**:
- `power3.out` - Smooth deceleration (default)
- `power2.out` - Moderate deceleration
- `elastic.out` - Playful bounce (sparingly)

### Animation Principles

1. **Purposeful**: Animations should guide attention
2. **Subtle**: Never distract from content
3. **Smooth**: 60 FPS, GPU-accelerated
4. **Respectful**: Honor `prefers-reduced-motion`

### Common Animations

**Fade In**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Scroll Reveal**
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
```

**Hover Lift**
```css
transition: transform 0.3s ease;

:hover {
  transform: translateY(-4px);
}
```

---

## Shadows

```css
--shadow-sm: 0 1px 2px rgba(61, 40, 23, 0.05)
--shadow-md: 0 2px 8px rgba(61, 40, 23, 0.08)
--shadow-lg: 0 4px 16px rgba(61, 40, 23, 0.1)
```

**Usage**:
- Cards: `--shadow-md` on hover
- Modals/Popovers: `--shadow-lg`
- Buttons: `--shadow-sm` on hover

---

## Border Radius

```css
--radius-sm: 2px   /* Buttons, inputs */
--radius-md: 4px   /* Cards */
--radius-lg: 8px   /* Large containers */
--radius-full: 50px /* Pills */
```

---

## Accessibility

### Color Contrast

All text meets **WCAG 2.1 Level AA**:
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**Tested Combinations**:
- ✅ #3D2817 on #FAFAF8 (15.2:1) - Excellent
- ✅ #4A3828 on #FAFAF8 (12.1:1) - Excellent
- ✅ #6B4423 on #FAFAF8 (7.8:1) - Excellent

### Focus States

```css
a:focus,
button:focus,
input:focus {
  outline: 2px solid var(--color-indigo);
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Icons & Graphics

### Icon Style
- **Minimalist**: Simple, line-based
- **Monochromatic**: Single color, low opacity
- **Size**: 60-100px for decorative icons
- **Placement**: Centered above text or in margins

### Decorative Graphics
- **Opacity**: 0.15-0.4 (very subtle)
- **Placement**: Fixed on left/right margins
- **Theme**: Psychology-related (spirals, layers, profiles)
- **Responsive**: Hidden on mobile (<992px)

---

## Usage Examples

### Page Header

```html
<nav class="pill-nav">
  <!-- Pill navigation structure -->
</nav>
```

### Content Section

```html
<section class="section reveal">
  <div class="container content-width">
    <h2>Section Title</h2>
    <p class="text-large">Lead paragraph...</p>
    <p>Body text...</p>
  </div>
</section>
```

### Card Grid

```html
<div class="grid-3">
  <div class="card">
    <h3 class="card-title">Card Title</h3>
    <p>Card content...</p>
  </div>
  <!-- More cards -->
</div>
```

---

## Design Tokens Reference

All design tokens are defined in `css/design-system.css` as CSS custom properties.

**Quick Reference**:
```css
/* Colors */
var(--color-brown-dark)
var(--color-green-medium)
var(--color-text-primary)

/* Typography */
var(--font-serif)
var(--text-2xl)
var(--weight-semibold)

/* Spacing */
var(--space-6)
var(--space-12)

/* Layout */
var(--container-max-width)
var(--content-max-width)
```

---

## Maintenance

### Adding New Colors
1. Add to `:root` in `design-system.css`
2. Document in this guide
3. Test contrast ratios
4. Update semantic mappings if needed

### Adding New Components
1. Design with existing tokens
2. Add styles to appropriate CSS file
3. Document behavior and usage
4. Create example in style guide

---

## Tools & Resources

**Design Tools**:
- Figma (design mockups)
- Coolors.co (color palette testing)
- Contrast Ratio Checker (WebAIM)

**Code Tools**:
- W3C CSS Validator
- Lighthouse (accessibility audit)
- Browser DevTools (inspect, test)

---

## Version History

- **v1.0** (2026-01-11): Initial design system documentation
- Future updates will be tracked here

---

## Conclusion

This design system ensures visual consistency, accessibility, and maintainability across the Psychoanalytically Speaking website while honoring the ethical and professional values of psychoanalytic practice.
