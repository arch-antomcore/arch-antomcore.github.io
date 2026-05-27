import os
import re

def main():
    css_path = r"c:\Users\guhkh\Desktop\AetherCore\AetherSite\assets\css\main.css"
    with open(css_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    blocks = re.findall(r'([^{]+)\{([^}]+)\}', content)
    
    keywords = ['hero__actions', 'actions']
    matches = []
    
    for selector, rules in blocks:
        sel_clean = selector.strip()
        rules_clean = rules.strip().replace('\n', ' ')
        for kw in keywords:
            if kw in sel_clean:
                matches.append((sel_clean, rules_clean))
                break
                
    print(f"Found {len(matches)} matching selector blocks in CSS.")
    for sel, rules in matches:
        print(f"Selector: {sel}")
        print(f"  Rules: {rules}")

if __name__ == '__main__':
    main()
