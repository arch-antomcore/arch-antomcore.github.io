import os
from tools.list_sections import parse_sections

def main():
    path = r"c:\Users\guhkh\Desktop\AetherCore\AetherSite\arquitetura.html"
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    sections = parse_sections(content)
    print(f"==================== arquitetura.html ({len(sections)} sections) ====================")
    for idx, sec in enumerate(sections):
        print(f"  [{idx+1}] Line {sec['line']}: ID='{sec['id']}', Class='{sec['class']}'")
        if sec['heading']:
            print(f"      Heading: {sec['heading']}")

if __name__ == '__main__':
    main()
