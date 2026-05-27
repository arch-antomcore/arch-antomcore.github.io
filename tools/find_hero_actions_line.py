import os

def main():
    path = r"c:\Users\guhkh\Desktop\AetherCore\AetherSite\assets\css\main.css"
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for idx, line in enumerate(lines):
        if '.hero__actions' in line:
            print(f"Line {idx+1}: {line.strip()}")
            # Print surrounding lines
            for j in range(-3, 6):
                if 0 <= idx + j < len(lines):
                    print(f"  {idx+j+1}: {lines[idx+j].strip()}")

if __name__ == '__main__':
    main()
