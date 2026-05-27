import os
import re

def main():
    root_dir = r"c:\Users\guhkh\Desktop\AetherCore\AetherSite"
    html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
    
    print(f"Applying semantic sweep to {len(html_files)} files...")
    
    for filename in html_files:
        filepath = os.path.join(root_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        
        # 1. Insert skip link after <body>
        if 'class="skip-link"' not in content:
            body_pattern = r'(<body[^>]*>)'
            skip_link_html = '\n    <a href="#top" class="skip-link">Ir para o conteúdo principal</a>'
            new_content = re.sub(body_pattern, r'\1' + skip_link_html, content, count=1, flags=re.IGNORECASE)
            if new_content != content:
                content = new_content
                modified = True
                
        # 2. Add aria-controls="navOverlay" to the navToggle button
        if 'id="navToggle"' in content and 'aria-controls="navOverlay"' not in content:
            content = content.replace('id="navToggle"', 'id="navToggle" aria-controls="navOverlay"')
            modified = True
            
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  - Successfully updated: {filename}")
        else:
            print(f"  - No changes needed: {filename}")

if __name__ == '__main__':
    main()
