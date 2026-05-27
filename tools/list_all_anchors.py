import os
import re

def main():
    path = r"c:\Users\guhkh\Desktop\AetherCore\AetherSite\index.html"
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We want to find matches for <a... and </a>
    # Let's write a parser that tracks open and close positions
    lines = content.split('\n')
    
    # Simple regex to search for '<a ' and '</a>'
    for idx, line in enumerate(lines):
        line_num = idx + 1
        opens = list(re.finditer(r'<a\b', line, re.IGNORECASE))
        closes = list(re.finditer(r'</a>', line, re.IGNORECASE))
        
        if opens:
            for op in opens:
                # print snippet of the line starting from match
                snippet = line[op.start():op.start()+60]
                print(f"Line {line_num}: OPEN '{snippet}...'")
        if closes:
            for cl in closes:
                print(f"Line {line_num}: CLOSE")

if __name__ == '__main__':
    main()
