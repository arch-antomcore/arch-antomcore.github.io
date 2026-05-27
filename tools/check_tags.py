import os
import re

def check_unclosed_anchors(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We want to check if <a> tags match </a> tags correctly in terms of count and hierarchy.
    # Simple check: let's find all '<a ' and '</a>'
    open_tags = re.findall(r'<a\b', content, re.IGNORECASE)
    close_tags = re.findall(r'</a>', content, re.IGNORECASE)
    
    if len(open_tags) != len(close_tags):
        print(f"  - Count mismatch in {os.path.basename(filepath)}: opens={len(open_tags)}, closes={len(close_tags)}")
        
    # Let's do a simple state machine check for nested or unclosed links
    # Standard HTML does not allow <a> tags to be nested.
    pos = 0
    in_anchor = False
    anchor_start_line = 0
    issues = []
    
    # We can scan the file line by line or token by token
    # Let's tokenize using a regex to find all <a, </a, <div, etc.
    tokens = re.finditer(r'<(/?a)\b|<!--|-->', content, re.IGNORECASE)
    in_comment = False
    
    for token in tokens:
        tok_text = token.group(0)
        tok_type = token.group(1)
        
        # Check comment
        if tok_text == '<!--':
            in_comment = True
            continue
        elif tok_text == '-->':
            in_comment = False
            continue
            
        if in_comment:
            continue
            
        line_num = content[:token.start()].count('\n') + 1
        
        if tok_type.lower() == 'a':
            if in_anchor:
                issues.append(f"Line {line_num}: Nested or unclosed anchor tag (already in anchor opened at line {anchor_start_line}).")
            in_anchor = True
            anchor_start_line = line_num
        elif tok_type.lower() == '/a':
            if not in_anchor:
                issues.append(f"Line {line_num}: Closing </a> tag without an open anchor.")
            in_anchor = False
            
    if in_anchor:
        issues.append(f"End of file: Anchor tag opened at line {anchor_start_line} was never closed.")
        
    return issues

def main():
    root_dir = r"c:\Users\guhkh\Desktop\AetherCore\AetherSite"
    html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
    
    print("Checking for anchor tag issues...")
    total_issues = 0
    for f in sorted(html_files):
        path = os.path.join(root_dir, f)
        issues = check_unclosed_anchors(path)
        if issues:
            print(f"\n--- Issues in {f} ---")
            for iss in issues:
                print(f"  {iss}")
            total_issues += len(issues)
            
    print(f"\nTotal issues: {total_issues}")

if __name__ == '__main__':
    main()
