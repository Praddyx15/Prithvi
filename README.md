# Psychoanalytically Speaking

> A professional psychoanalytic practice website with modern animations and elegant design

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Design System](#design-system)
- [Components](#components)
- [Browser Support](#browser-support)
- [Performance](#performance)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Psychoanalytically Speaking** is a professional website for a psychoanalytic practice offering depth-oriented, exploratory therapy. The site emphasizes thoughtful design, subtle animations, and ethical presentation aligned with psychoanalytic principles.

### Live Demo
- **Production**: [Your domain here]
- **Demo Navigation**: Open `pill-nav-demo.html` locally

### Key Principles
- **Depth over Speed**: No quick-fix messaging
- **Professional Aesthetic**: Warm, contemplative design
- **Ethical Stance**: Confidentiality and non-diagnostic approach
- **Accessibility First**: WCAG 2.1 AA compliant
- **Performance**: Fast load times, optimized animations

---

## ✨ Features

### 🎨 Visual Features
- **Modern Pill Navigation**: ReactBits-inspired animated navigation with circular hover effects
- **WebGL Silk Background**: Three.js shader-based animated backgrounds
- **Split-Text Animations**: Character/word-by-word reveal animations
- **Scroll Reveal**: Progressive content disclosure on scroll
- **Decorative Graphics**: Subtle psychology-themed imagery

### 🔧 Technical Features
- **Vanilla JavaScript**: No frameworks, pure web technologies
- **GSAP Animations**: Professional-grade animation library
- **Responsive Design**: Mobile-first, works 320px to 4K
- **Sticky Navigation**: Smooth scroll with persistent header
- **Mobile Menu**: Hamburger menu with slide-down animation
- **Progressive Enhancement**: Graceful degradation for older browsers

### ♿ Accessibility Features
- **Semantic HTML5**: Proper document structure
- **ARIA Labels**: Screen reader friendly
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Clear visual focus indicators
- **Reduced Motion**: Respects `prefers-reduced-motion`

---

## 📁 Project Structure

```
psychoanalytically-speaking/
│
├── 📄 index.html                 # Homepage
├── 📄 about.html                 # About page
├── 📄 approach.html              # Psychoanalytic approach
├── 📄 consultation.html          # Scheduling and fees
├── 📄 contact.html               # Contact information
├── 📄 blogs.html                 # Blog listings
├── 📄 lectures.html              # Educational offerings
├── 📄 readings.html              # Recommended books
├── 📄 reading-groups.html        # Reading groups
├── 📄 ebooks.html                # E-book resources
├── 📄 special-requests.html      # Custom consultations
├── 📄 pill-nav-demo.html         # Navigation demo page
│
├── 📂 css/                       # Stylesheets
│   ├── base.css                  # CSS Reset
│   ├── design-system.css         # Design tokens & variables
│   ├── components.css            # Reusable UI components
│   ├── pages.css                 # Page-specific styles
│   ├── animations.css            # Animation & effects
│   ├── decorative.css            # Decorative graphics
│   └── pill-nav.css              # Pill navigation styles
│
├── 📂 js/                        # JavaScript
│   ├── main.js                   # Core interactions
│   ├── pill-nav.js               # Pill navigation component
│   ├── silk-background.js        # WebGL shader background
│   └── split-text.js             # Text animation
│
├── 📂 images/                    # Assets
│   ├── depth-spiral.png          # Psychology graphics
│   ├── hero-pattern.png
│   ├── journey-icon.png
│   ├── layers-pattern.png
│   ├── listening-icon.png
│   ├── mind-profile.png
│   ├── reflection-icon.png
│   ├── time-icon.png
│   └── unconscious-layers.png
│
└── 📂 docs/                      # Documentation
    ├── ARCHITECTURE.md           # Technical architecture
    ├── DESIGN_SYSTEM.md          # Design guidelines
    └── DEPLOYMENT.md             # Deployment guide
```

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Web server (for local testing): Python, Node.js, or any HTTP server

### Quick Start

1. **Clone or download** this repository

2. **Serve with a local web server**:

   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with http-server)
   npx http-server -p 8000
   
   # PHP
   php -S localhost:8000
   ```

3. **Open in browser**: `http://localhost:8000`

### No Build Required!

This is a **static website** with no build process. Simply:
- Edit HTML/CSS/JS files directly
- Refresh browser to see changes
- No compilation, transpilation, or bundling needed

---

## 🎨 Design System

### Color Palette

#### Primary Colors
```css
--color-brown-darker: #3D2817    /* Deep, grounded */
--color-brown-dark: #4A3828      /* Primary text/UI */
--color-brown-medium: #6B4423    /* Secondary text */
--color-brown-light: #8B6F47     /* Accents */
```

#### Secondary Colors
```css
--color-green-dark: #6B7A5E      /* Calm, contemplative */
--color-green-medium: #7A8B70    /* Links, borders */
--color-green-light: #8B9A7E
--color-green-pale: #A8B89C
```

#### Accent
```css
--color-indigo: #4A5899          /* Subtle depth */
--color-indigo-light: #6B7DB5
```

#### Neutrals
```css
--color-white: #FFFFFF
--color-off-white: #FAFAF8       /* Background */
--color-cream: #F5F4F0           /* Surfaces */
--color-cream-dark: #E8E6E0      /* Borders */
```

### Typography

- **Primary Font**: Crimson Text (Serif) - Elegant, scholarly
- **Secondary Font**: Inter (Sans-serif) - Clean, modern UI
- **Base Size**: 16px (1rem)
- **Scale**: 1.25 ratio (Minor Third)

### Spacing

All spacing uses a **4px base unit**:
```css
--space-1: 4px    --space-8: 32px   --space-16: 64px
--space-2: 8px    --space-10: 40px  --space-20: 80px
--space-3: 12px   --space-12: 48px  --space-24: 96px
--space-4: 16px                     --space-32: 128px
--space-6: 24px
```

---

## 🧩 Components

### Pill Navigation

**Modern animated navigation** with circular hover effects.

**Features**:
- Circular expansion from bottom on hover
- Text slide-up animation
- Active state indication
- Mobile hamburger menu
- Logo rotation on hover

**Customization** (in `js/pill-nav.js`):
```javascript
new PillNavigation({
  baseColor: '#FAFAF8',
  pillColor: '#4A3828',
  hoveredPillTextColor: '#FAFAF8',
  ease: 'power3.out'
});
```

### Silk Background

**WebGL shader-based animated background** using Three.js.

**Usage** (in HTML):
```html
<section 
  data-silk-background 
  data-silk-color="#8B6F47" 
  data-silk-speed="3" 
  data-silk-scale="1.2" 
  data-silk-opacity="0.25">
</section>
```

### Split-Text Animation

**Character/word reveal animation** using Intersection Observer.

**Usage** (in HTML):
```html
<h1 
  data-split-text 
  data-split-type="chars" 
  data-split-delay="30" 
  data-split-duration="1000">
  Psychoanalytically Speaking
</h1>
```

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Mobile Safari | 14+ | ✅ Full Support |
| Chrome Android | 90+ | ✅ Full Support |
| IE 11 | - | ⚠️ Degraded (no animations) |

### Required APIs
- CSS Grid & Flexbox
- CSS Custom Properties
- Intersection Observer API
- WebGL (for silk background)
- ES6+ JavaScript

---

## ⚡ Performance

### Metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

### Optimizations
- ✅ Minimal dependencies (Three.js, GSAP only)
- ✅ Lazy-loaded animations (Intersection Observer)
- ✅ GPU-accelerated transforms
- ✅ Debounced resize handlers
- ✅ Efficient event delegation
- ✅ Will-change hints for animations

### File Sizes (Unminified)
- **HTML**: ~14 KB per page
- **CSS**: ~40 KB total
- **JS**: ~25 KB total (custom code)
- **Dependencies**: ~47 KB (GSAP, cached), ~600 KB (Three.js, cached)

---

## 📦 Deployment

### Static Hosting Recommendations

#### Netlify (Recommended)
```bash
# netlify.toml
[build]
  publish = "."
  
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

#### Vercel
```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

#### GitHub Pages
- Push to `main` branch or `gh-pages` branch
- Enable GitHub Pages in repository settings
- Custom domain supported

### Production Checklist

- [ ] Minify CSS/JS files
- [ ] Optimize images (WebP format)
- [ ] Add `robots.txt` and `sitemap.xml`
- [ ] Configure SSL/HTTPS
- [ ] Add analytics (Plausible, Google Analytics)
- [ ] Test form submission backend
- [ ] Set up custom domain
- [ ] Configure CDN for static assets
- [ ] Add Open Graph meta tags
- [ ] Test across devices and browsers

---

## 🤝 Contributing

### Development Workflow

1. **Make changes** to HTML/CSS/JS
2. **Test locally** with a web server
3. **Check accessibility** with browser DevTools
4. **Validate HTML** at [validator.w3.org](https://validator.w3.org/)
5. **Test responsiveness** on multiple screen sizes

### Code Style

- **HTML**: Semantic, indented with 2 spaces
- **CSS**: BEM-inspired naming, grouped by component
- **JavaScript**: ES6+, camelCase, JSDoc comments

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add: Brief description of changes"

# Push and create pull request
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Psychoanalytically Speaking

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

**Prithvi Behl**  
Email: psychoanalyticallyseeking@gmail.com  
Booking: [topmate.io/prithvibehl](https://topmate.io/prithvibehl/)

---

## 🙏 Acknowledgments

- **ReactBits** - Inspiration for pill navigation component
- **Three.js** - WebGL shader implementation
- **GSAP** - Professional animation library
- **Google Fonts** - Crimson Text and Inter typefaces

---

## 📚 Additional Resources

- [Design System Documentation](docs/DESIGN_SYSTEM.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Pill Navigation Demo](pill-nav-demo.html)

---

<div align="center">
  <p><strong>Built with care for depth-oriented psychological work</strong></p>
  <p>© 2026 Psychoanalytically Speaking. All rights reserved.</p>
</div>
