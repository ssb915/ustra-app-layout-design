import os
import re

dir_path = r"d:\Project\React\Barber Shop\Layout Design"

for file in os.listdir(dir_path):
    if file.endswith(".html"):
        filepath = os.path.join(dir_path, file)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # For index.html
        if file == "index.html":
            content = re.sub(
                r'<div class="logo-text">USTRA</div>',
                r'<img src="image/bg-eress-logo.png" alt="Ustra Logo" style="height: 60px; object-fit: contain; background: white; padding: 10px; border-radius: 12px; margin-bottom: 5px;">\n    <div class="logo-text">USTRA</div>',
                content
            )
        # For home.html
        elif file == "home.html":
            content = re.sub(
                r'<div style="font-weight: 800; font-size: 24px; color: var\(--accent-gold\); letter-spacing: 1px;">USTRA</div>',
                r'<div style="display: flex; align-items: center; gap: 10px;"><img src="image/bg-eress-logo.png" alt="Logo" class="top-logo"><span style="font-weight: 800; font-size: 24px; color: var(--accent-gold); letter-spacing: 1px;">USTRA</span></div>',
                content
            )
        # For other files
        else:
            # Replace basic <h1>...</h1>
            content = re.sub(
                r'<h1>(.*?)</h1>',
                r'<h1><img src="image/bg-eress-logo.png" alt="Logo" class="top-logo" style="margin-right: 10px; vertical-align: middle;"> \1</h1>',
                content
            )
            # Replace <h1 class="...">...</h1>
            content = re.sub(
                r'(<h1 class=".*?">)(.*?)(</h1>)',
                r'\1<img src="image/bg-eress-logo.png" alt="Logo" class="top-logo" style="margin-right: 10px; vertical-align: middle;"> \2\3',
                content
            )
            # Replace <h1 style="...">...</h1>
            content = re.sub(
                r'(<h1 style=".*?">)(.*?)(</h1>)',
                r'\1<img src="image/bg-eress-logo.png" alt="Logo" class="top-logo" style="margin-right: 10px; vertical-align: middle;"> \2\3',
                content
            )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
