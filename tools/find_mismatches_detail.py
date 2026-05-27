import os
import re

def main():
    path = r"c:\Users\guhkh\Desktop\AetherCore\AetherSite\index.html"
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We want to find matches for <a... (excluding comments)
    # Let's strip comments first
    content_clean = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    
    # Find all matches of <a (opening) and </a> (closing)
    # Support whitespace/newlines inside the closing tag like </a  > or </a\n>
    opens = list(re.finditer(r'<a\b[^>]*>', content_clean, re.IGNORECASE | re.DOTALL))
    closes = list(re.finditer(r'</a\s*>', content_clean, re.IGNORECASE | re.DOTALL))
    
    print(f"Total opens found: {len(opens)}")
    print(f"Total closes found: {len(closes)}")
    
    # Print line numbers for opens
    print("\n--- OPEN TAGS ---")
    for op in opens:
        line = content_clean[:op.start()].count('\n') + 1
        snippet = op.group(0).replace('\n', ' ')
        print(f"Line {line}: {snippet[:80]}")
        
    # Print line numbers for closes
    print("\n--- CLOSE TAGS ---")
    for cl in closes:
        line = content_clean[:cl.start()].count('\n') + 1
        snippet = cl.group(0).replace('\n', ' ')
        print(f"Line {line}: {snippet}")

if __name__ == '__main__':
    main()
