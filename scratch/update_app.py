import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original content length: {len(content)}")
