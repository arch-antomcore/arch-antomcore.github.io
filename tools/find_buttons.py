import os
import re

def find_buttons_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    buttons = []
    
    # Match <button ...>
    for match in re.finditer(r'<button([^>]*)>(.*?)</button>', content, re.DOTALL | re.IGNORECASE):
        attribs = match.group(1)
        text = re.sub(r'<[^>]+>', '', match.group(2)).strip()
        # Clean unicode characters that crash Windows console
        text = text.replace('↗', '->').replace('→', '->').replace('✓', '[ok]')
        class_match = re.search(r'class=["\']([^"\']+)["\']', attribs)
        buttons.append({
            'tag': 'button',
            'class': class_match.group(1) if class_match else 'None',
            'text': text,
            'line': content[:match.start()].count('\n') + 1
        })
        
    # Match <a ... class="...btn..." ...>
    for match in re.finditer(r'<a([^>]*class=["\']([^"\']*(?:btn|cta|magnetic)[^"\']*)["\'][^>]*)>(.*?)</a>', content, re.DOTALL | re.IGNORECASE):
        attribs = match.group(1)
        classes = match.group(2)
        text = re.sub(r'<[^>]+>', '', match.group(3)).strip()
        text = " ".join(text.split())
        # Clean unicode characters that crash Windows console
        text = text.replace('↗', '->').replace('→', '->').replace('✓', '[ok]')
        buttons.append({
            'tag': 'a',
            'class': classes,
            'text': text,
            'line': content[:match.start()].count('\n') + 1
        })
        
    return buttons

def main():
    root_dir = r"c:\Users\guhkh\Desktop\AetherCore\AetherSite"
    html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
    
    for f in sorted(html_files):
        path = os.path.join(root_dir, f)
        buttons = find_buttons_in_file(path)
        if buttons:
            print(f"\n==================== {f} ({len(buttons)} button elements) ====================")
            for btn in buttons:
                print(f"  Line {btn['line']}: <{btn['tag']} class='{btn['class']}'> text='{btn['text']}'")

if __name__ == '__main__':
    main()
