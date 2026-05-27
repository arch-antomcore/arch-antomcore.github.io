import os
import re

def main():
    css_path = r"c:\Users\guhkh\Desktop\AetherCore\AetherSite\assets\css\main.css"
    if not os.path.exists(css_path):
        print("CSS file not found.")
        return
        
    with open(css_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Let's find all CSS blocks with selectors containing 'card', 'grid', 'btn', or 'button'
    # CSS blocks look like selector { rules }
    # A regex to match blocks (supporting nested braces is tricky, but main.css doesn't use nested CSS/Sass braces)
    blocks = re.findall(r'([^{]+)\{([^}]+)\}', content)
    
    keywords = ['card', 'grid', 'btn', 'button', 'section', 'panel']
    matches = []
    
    for selector, rules in blocks:
        sel_clean = selector.strip()
        rules_clean = rules.strip().replace('\n', ' ')
        for kw in keywords:
            if kw in sel_clean:
                matches.append((sel_clean, rules_clean))
                break
                
    print(f"Found {len(matches)} matching selector blocks in CSS.")
    # Print some interesting ones
    for sel, rules in matches[:60]:
        if any(x in sel for x in ['card', 'grid', 'btn', 'button']):
            print(f"Selector: {sel}")
            print(f"  Rules: {rules[:120]}...")

if __name__ == '__main__':
    main()
