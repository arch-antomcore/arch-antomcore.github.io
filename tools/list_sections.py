import os
import re

def parse_sections(content):
    # Match section starts: <section followed by anything up to >
    # We want to capture the section tag and the immediate heading inside it
    sections = []
    # Let's search for matches of <section ...>
    for match in re.finditer(r'<section([^>]*)>', content, re.DOTALL | re.IGNORECASE):
        attribs = match.group(1)
        # Find class and id
        class_match = re.search(r'class=["\']([^"\']+)["\']', attribs)
        id_match = re.search(r'id=["\']([^"\']+)["\']', attribs)
        aria_match = re.search(r'aria-labelledby=["\']([^"\']+)["\']', attribs)
        
        # Let's find the first h1, h2, h3 within 1500 chars of this section start
        section_end = content.find('</section>', match.end())
        if section_end == -1:
            section_end = match.end() + 1500
        section_text = content[match.start():section_end]
        
        heading_match = re.search(r'<h([1-3])[^>]*>(.*?)</h\1>', section_text, re.DOTALL | re.IGNORECASE)
        heading = ""
        if heading_match:
            heading = re.sub(r'<[^>]+>', '', heading_match.group(2)).strip()
            # clean whitespace
            heading = " ".join(heading.split())
            
        sections.append({
            'class': class_match.group(1) if class_match else 'None',
            'id': id_match.group(1) if id_match else 'None',
            'aria-label': aria_match.group(1) if aria_match else 'None',
            'heading': heading,
            'line': content[:match.start()].count('\n') + 1
        })
    return sections

def main():
    root_dir = r"c:\Users\guhkh\Desktop\AetherCore\AetherSite"
    html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
    
    for f in sorted(html_files):
        path = os.path.join(root_dir, f)
        with open(path, 'r', encoding='utf-8') as file_obj:
            content = file_obj.read()
        sections = parse_sections(content)
        if sections:
            print(f"\n==================== {f} ({len(sections)} sections) ====================")
            for idx, sec in enumerate(sections):
                print(f"  [{idx+1}] Line {sec['line']}: ID='{sec['id']}', Class='{sec['class']}'")
                if sec['heading']:
                    print(f"      Heading: {sec['heading'][:100]}")

if __name__ == '__main__':
    main()
