"""
Add favicon link to all HTML pages
"""

from pathlib import Path

# Base directory
base_dir = Path(r"c:/Users/ADMIN/.gemini/antigravity/scratch/psychoanalytically-speaking")

# Get all HTML files
html_files = list(base_dir.glob("*.html"))

favicon_tag = '    <link rel="icon" type="image/png" href="favicon.png">'

for html_file in html_files:
    print(f"📝 Adding favicon to {html_file.name}...")
    
    content = html_file.read_text(encoding='utf-8')
    
    # Skip if favicon already added
    if 'favicon.png' in content:
        print(f"   ⏭️  Already has favicon")
        continue
    
    # Add favicon after the title tag
    content = content.replace(
        '</title>',
        f'</title>\n{favicon_tag}'
    )
    
    html_file.write_text(content, encoding='utf-8')
    print(f"   ✅ Added favicon link")

print("\n🎉 Favicon added to all pages!")
