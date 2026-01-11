"""
Update all HTML pages with Pill Navigation
Replaces legacy text navigation with modern pill navigation
"""

import re
from pathlib import Path

# Base directory
base_dir = Path(r"c:/Users/ADMIN/.gemini/antigravity/scratch/psychoanalytically-speaking")

# Pages to update with their active navigation item
pages_to_update = {
    "about.html": "About",
    "approach.html": "Approach",
    "blogs.html": "Blogs",
    "consultation.html": "Consultation",
    "contact.html": "Contact",
    "ebooks.html": None,  # No specific nav item
    "lectures.html": "Lectures",
    "readings.html": "Readings",
    "reading-groups.html": None,  # No specific nav item
    "special-requests.html": None,  # No specific nav item
}

# Pill navigation template
def get_pill_nav(active_page):
    nav_items = ["Home", "About", "Approach", "Consultation", "Blogs", "Readings", "Lectures", "Contact"]
    
    nav_html = """  <!-- Header with Pill Navigation -->
  <div class="pill-nav-container">
    <nav class="pill-nav" aria-label="Primary" role="navigation">
      <a class="pill-logo" href="index.html" aria-label="Home">
        <h1 class="site-title" style="margin: 0; font-size: var(--text-xl);">Psychoanalytically Speaking</h1>
      </a>

      <div class="pill-nav-items desktop-only">
        <ul class="pill-list" role="menubar">
"""
    
    # Add navigation items
    for item in nav_items:
        href = "index.html" if item == "Home" else f"{item.lower()}.html"
        is_active = ' is-active' if item == active_page else ''
        
        nav_html += f"""          <li role="none">
            <a role="menuitem" href="{href}" class="pill{is_active}" aria-label="{item}">
              <span class="hover-circle" aria-hidden="true"></span>
              <span class="label-stack">
                <span class="pill-label">{item}</span>
                <span class="pill-label-hover" aria-hidden="true">{item}</span>
              </span>
            </a>
          </li>
"""
    
    nav_html += """        </ul>
      </div>

      <button class="mobile-menu-button mobile-only" aria-label="Toggle menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </nav>

    <div class="mobile-menu-popover mobile-only">
      <ul class="mobile-menu-list">
"""
    
    # Add mobile menu items
    for item in nav_items:
        href = "index.html" if item == "Home" else f"{item.lower()}.html"
        is_active = ' is-active' if item == active_page else ''
        
        nav_html += f"""        <li><a href="{href}" class="mobile-menu-link{is_active}">{item}</a></li>
"""
    
    nav_html += """      </ul>
    </div>
  </div>
"""
    
    return nav_html

# Process each page
for page_name, active_item in pages_to_update.items():
    page_path = base_dir / page_name
    
    if not page_path.exists():
        print(f"⚠️  Skipping {page_name} (not found)")
        continue
    
    print(f"📝 Updating {page_name}...")
    
    # Read file
    content = page_path.read_text(encoding='utf-8')
    
    # Add pill-nav.css if not present
    if 'pill-nav.css' not in content:
        content = content.replace(
            '<link rel="stylesheet" href="css/animations.css">',
            '<link rel="stylesheet" href="css/animations.css">\n    <link rel="stylesheet" href="css/pill-nav.css">'
        )
    
    # Replace header navigation
    # Pattern to match old header structure
    header_pattern = r'<header class="site-header">.*?</header>'
    
    new_nav = get_pill_nav(active_item)
    content = re.sub(header_pattern, new_nav.strip(), content, flags=re.DOTALL)
    
    # Add pill-nav.js if not present
    if 'pill-nav.js' not in content:
        content = content.replace(
            '<script src="js/main.js"></script>',
            '<script src="js/pill-nav.js"></script>\n    <script src="js/main.js"></script>'
        )
    
    # Write back
    page_path.write_text(content, encoding='utf-8')
    print(f"✅ Updated {page_name}")

print("\n🎉 All pages updated with Pill Navigation!")
