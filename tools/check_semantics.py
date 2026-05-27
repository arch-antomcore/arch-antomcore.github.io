import os
import re
from html.parser import HTMLParser

class SemanticParser(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
        self.errors = []
        self.headings = []
        self.ids = set()
        self.duplicate_ids = set()
        self.current_tag = None
        self.in_head = False
        self.in_boot = False
        self.in_header = False
        self.nav_count = 0
        self.nav_has_label = []
        self.inputs = []
        self.labels = []
        self.buttons = []
        self.links = []
        self.images = []
        self.canonical = None
        self.lang = None
        
    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attr_dict = dict(attrs)
        
        # Track semantic wrapper state
        if tag == 'div' and attr_dict.get('id') == 'boot':
            self.in_boot = True
        if tag == 'header':
            self.in_header = True
            
        # Check duplicate IDs
        if 'id' in attr_dict:
            val = attr_dict['id']
            if val in self.ids:
                self.duplicate_ids.add(val)
            self.ids.add(val)
            
        # Check head
        if tag == 'head':
            self.in_head = True
        if tag == 'html':
            self.lang = attr_dict.get('lang')
            
        # Check canonical
        if tag == 'link' and attr_dict.get('rel') == 'canonical':
            self.canonical = attr_dict.get('href')
            
        # Check img
        if tag == 'img':
            self.images.append({
                'src': attr_dict.get('src'),
                'alt': attr_dict.get('alt'),
                'decoding': attr_dict.get('decoding'),
                'loading': attr_dict.get('loading'),
                'in_boot': self.in_boot,
                'in_header': self.in_header,
                'line': self.getpos()[0]
            })
            if 'alt' not in attr_dict:
                self.errors.append(f"Line {self.getpos()[0]}: Image missing 'alt' attribute.")
                
        # Check headings
        if tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            level = int(tag[1])
            self.headings.append((level, self.getpos()[0]))
            
        # Check navs
        if tag == 'nav':
            self.nav_count += 1
            has_label = 'aria-label' in attr_dict or 'aria-labelledby' in attr_dict
            self.nav_has_label.append((self.getpos()[0], has_label))
            
        # Check inputs
        if tag in ['input', 'textarea', 'select']:
            self.inputs.append({
                'tag': tag,
                'id': attr_dict.get('id'),
                'name': attr_dict.get('name'),
                'type': attr_dict.get('type'),
                'aria-label': attr_dict.get('aria-label'),
                'aria-labelledby': attr_dict.get('aria-labelledby'),
                'line': self.getpos()[0]
            })
            
        # Check labels
        if tag == 'label':
            self.labels.append({
                'for': attr_dict.get('for'),
                'line': self.getpos()[0]
            })
            
        # Check buttons
        if tag == 'button':
            self.buttons.append({
                'id': attr_dict.get('id'),
                'aria-expanded': attr_dict.get('aria-expanded'),
                'aria-controls': attr_dict.get('aria-controls'),
                'line': self.getpos()[0]
            })
            
        # Check links
        if tag == 'a':
            self.links.append({
                'href': attr_dict.get('href'),
                'target': attr_dict.get('target'),
                'rel': attr_dict.get('rel'),
                'line': self.getpos()[0]
            })

    def handle_endtag(self, tag):
        if tag == 'head':
            self.in_head = False
        if tag == 'div' and self.in_boot and self.current_tag == 'div':
            # This is approximation, but since boot is simple it works
            pass
        if tag == 'header':
            self.in_header = False
        self.current_tag = None
        
    # Also need to reset in_boot when tag closes. Simple approach:
    # If we see tags after boot has closed, we set in_boot to false.
    # In index.html, boot is the first div inside body.
    def handle_data(self, data):
        pass

def parse_all_files(root_dir):
    html_files = [f for f in os.listdir(root_dir) if f.endswith('.html')]
    parsed_data = {}
    
    for f in html_files:
        path = os.path.join(root_dir, f)
        with open(path, 'r', encoding='utf-8') as file_obj:
            content = file_obj.read()
            
        # Simple reset of boot flag logic:
        # Let's parse tag by tag
        parser = SemanticParser(f)
        
        # We can simulate boot tag closure by matching structure or regex.
        # But let's just do it simple: boot starts with id="boot" and ends when the boot div closes.
        # Since boot is a single div containing img, status, p:
        # We can just check the line numbers. Boot is usually within first 130 lines.
        parser.feed(content)
        
        # Let's post-process boot flag: an image is in boot if it is on a line where id="boot" is open.
        # Line range for boot is lines between <div class="boot" id="boot" ...> and </div>.
        boot_match = re.search(r'<div[^>]*id=["\']boot["\'][^>]*>(.*?)</div>', content, re.DOTALL)
        if boot_match:
            boot_start_line = content[:boot_match.start()].count('\n') + 1
            boot_end_line = content[:boot_match.end()].count('\n') + 1
            for img in parser.images:
                if boot_start_line <= img['line'] <= boot_end_line:
                    img['in_boot'] = True
                    
        # Header is inside <header ...> </header>
        header_match = re.search(r'<header[^>]*>(.*?)</header>', content, re.DOTALL)
        if header_match:
            header_start_line = content[:header_match.start()].count('\n') + 1
            header_end_line = content[:header_match.end()].count('\n') + 1
            for img in parser.images:
                if header_start_line <= img['line'] <= header_end_line:
                    img['in_header'] = True
                    
        parsed_data[f] = parser
        
    return parsed_data

def main():
    root_dir = r"c:\Users\guhkh\Desktop\AetherCore\AetherSite"
    parsed_files = parse_all_files(root_dir)
    
    print(f"Scanning {len(parsed_files)} HTML files in {root_dir}...")
    
    total_errors = 0
    
    for filename, parser in parsed_files.items():
        errors = parser.errors.copy()
        
        # 1. Duplicate IDs
        if parser.duplicate_ids:
            errors.append(f"Duplicate IDs found: {', '.join(parser.duplicate_ids)}")
            
        # 2. Heading level shifts (skips)
        prev_level = None
        for level, line in parser.headings:
            if prev_level is not None and level > prev_level + 1:
                errors.append(f"Line {line}: Heading level skip from h{prev_level} to h{level}.")
            prev_level = level
            
        # 3. Label check for inputs
        for inp in parser.inputs:
            if inp['type'] == 'submit' or inp['type'] == 'button' or inp['type'] == 'hidden':
                continue
            has_label = False
            if inp['id']:
                for lbl in parser.labels:
                    if lbl['for'] == inp['id']:
                        has_label = True
                        break
            if inp['aria-label'] or inp['aria-labelledby']:
                has_label = True
            if not has_label:
                errors.append(f"Line {inp['line']}: Input '{inp['tag']}' (id='{inp['id']}', name='{inp['name']}') lacks an associated label or ARIA labeling.")
                
        # 4. Nav label checks if multiple
        if parser.nav_count > 1:
            for line, has_lbl in parser.nav_has_label:
                if not has_lbl:
                    errors.append(f"Line {line}: Page has multiple <nav> elements, but this <nav> lacks a distinguishing 'aria-label' or 'aria-labelledby'.")
                    
        # 5. Check if button toggles are missing aria-controls
        for btn in parser.buttons:
            if btn['aria-expanded'] is not None and btn['aria-controls'] is None:
                errors.append(f"Line {btn['line']}: Toggle button (id='{btn['id']}') has 'aria-expanded' but is missing 'aria-controls'.")
                
        # 6. Check external links for target="_blank" without noopener
        for lnk in parser.links:
            if lnk['target'] == '_blank':
                rel = lnk['rel'] or ''
                if 'noopener' not in rel:
                    errors.append(f"Line {lnk['line']}: Link targeting '_blank' is missing 'rel=\"noopener\"' (current: '{rel}').")
                    
        # 7. Check images for decoding="async" and loading="lazy" (if not in boot and not in header)
        for img in parser.images:
            if not img['in_boot'] and not img['in_header']:
                if img['loading'] != 'lazy':
                    errors.append(f"Line {img['line']}: Image '{img['src']}' is missing 'loading=\"lazy\"'.")
                if img['decoding'] != 'async':
                    errors.append(f"Line {img['line']}: Image '{img['src']}' is missing 'decoding=\"async\"'.")
                    
        # 8. Check links for broken references
        for lnk in parser.links:
            href = lnk['href']
            if not href:
                errors.append(f"Line {lnk['line']}: Link has empty or missing 'href'.")
                continue
                
            # Skip external links and mailto/tel/hashes only
            if href.startswith(('http://', 'https://', 'mailto:', 'tel:', 'javascript:')):
                continue
                
            # If it is a hash link within the same page
            if href.startswith('#'):
                target_id = href[1:]
                if target_id not in parser.ids:
                    errors.append(f"Line {lnk['line']}: Same-page anchor link '{href}' points to non-existent ID.")
                continue
                
            # If it is a link to another page (potentially with hash)
            parts = href.split('#')
            target_page = parts[0]
            target_id = parts[1] if len(parts) > 1 else None
            
            if target_page not in parsed_files:
                errors.append(f"Line {lnk['line']}: Link points to non-existent page file '{target_page}' in the workspace.")
            elif target_id:
                # Check if the target page has this ID
                target_parser = parsed_files[target_page]
                if target_id not in target_parser.ids:
                    errors.append(f"Line {lnk['line']}: Link '{href}' points to non-existent ID '#{target_id}' in '{target_page}'.")
                    
        # 9. Language and Canonical checks
        if not parser.lang:
            errors.append("HTML element is missing 'lang' attribute.")
        if not parser.canonical:
            errors.append("Head is missing <link rel=\"canonical\"> element.")
            
        if errors:
            print(f"\n--- Issues in {filename} ---")
            for err in errors:
                print(f"  - {err}")
            total_errors += len(errors)
            
    print(f"\nScan complete. Total issues found: {total_errors}")

if __name__ == '__main__':
    main()
