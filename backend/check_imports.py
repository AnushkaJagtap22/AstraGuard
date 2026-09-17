import os, re

src_dir = r'c:\Users\Anushka\Documents\ANUSHKA\AstraGuard\frontend\src'
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith('.jsx') or f.endswith('.js'):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8') as file:
                content = file.read()
                matches = re.findall(r'import\s+\{(.*?)\}\s+from\s+[\'\"]lucide-react[\'\"]', content, re.DOTALL)
                for m in matches:
                    imports = [x.strip().split(' as ')[0].strip() for x in m.split(',') if x.strip()]
                    print(f'{f}: {imports}')
