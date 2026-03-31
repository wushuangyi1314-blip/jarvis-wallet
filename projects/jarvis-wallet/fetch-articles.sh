#!/bin/bash
# Script to fetch articles from aitoolreviewr.com

ARTICLES_DIR="/root/.openclaw/workspace/projects/jarvis-wallet/hugo/content/articles"

fetch_article() {
    local slug="$1"
    local url="https://aitoolreviewr.com/articles/${slug}/"
    local output="${ARTICLES_DIR}/${slug}.md"
    
    echo "Fetching: $url"
    
    # Fetch HTML
    curl -s "$url" > /tmp/article-${slug}.html
    
    # Extract and save via Python
    python3 << PYEOF
import re

with open('/tmp/article-${slug}.html', 'r') as f:
    html = f.read()

# Find title
title_match = re.search(r'<h1[^>]*>([^<]+)</h1>', html)
title = title_match.group(1) if title_match else "${slug}"

# Find date
date_match = re.search(r'📅([^<]+)', html)
date = date_match.group(1).strip() if date_match else "Mar 2026"

# Find content
toc_end = html.find('</aside>')
if toc_end == -1:
    toc_end = 0
    
# Try to find article-content div
content_div_start = html.find('<div class=article-content>', toc_end)
if content_div_start == -1:
    content_div_start = html.find('<p>', toc_end)
    content_start = content_div_start
else:
    content_start = content_div_start + len('<div class=article-content>')

# Find where content ends (related articles or footer)
content_end = len(html)
for marker in ['<div class=related-articles', '<div class=article-footer', '<div class=sidebar', '<section class=']:
    pos = html.find(marker, content_start)
    if pos > 0 and pos < content_end:
        content_end = pos

body = html[content_start:content_end]

# Convert to markdown
body = re.sub(r'<br\s*/?>', '\n', body)
body = re.sub(r'<p[^>]*>', '\n\n', body)
body = re.sub(r'<h([1-6])[^>]*>', lambda m: '\n\n' + '#' * int(m.group(1)) + ' ', body)
body = re.sub(r'<li[^>]*>', '\n- ', body)
body = re.sub(r'<strong[^>]*>', '**', body)
body = re.sub(r'</strong>', '**', body)
body = re.sub(r'<em[^>]*>', '*', body)
body = re.sub(r'</em>', '*', body)
body = re.sub(r'<a[^>]*href="([^"]+)"[^>]*>([^<]*)</a>', r'[\2](\1)', body)
body = re.sub(r'<table[^>]*>', '\n\n| ', body)
body = re.sub(r'<tr[^>]*>', '| ', body)
body = re.sub(r'<th[^>]*>', '| ', body)
body = re.sub(r'<td[^>]*>', ' | ', body)
body = re.sub(r'</tr>', '\n', body)
body = re.sub(r'</table>', '\n\n', body)
body = re.sub(r'<[^>]+>', '', body)
body = re.sub(r'&nbsp;', ' ', body)
body = re.sub(r'&amp;', '&', body)
body = re.sub(r'&lt;', '<', body)
body = re.sub(r'&gt;', '>', body)
body = re.sub(r'&#39;', "'", body)
body = re.sub(r'&rsquo;', "'", body)
body = re.sub(r'&ldquo;', '"', body)
body = re.sub(r'&rdquo;', '"', body)
body = re.sub(r'\n{4,}', '\n\n', body)
body = body.strip()

# Build front matter
fm = f'''---
title: "{title}"
date: "{date}"
draft: false
---

'''

# Save
with open('/tmp/article-${slug}.md', 'w') as f:
    f.write(fm + body)

print(f"Saved: /tmp/article-${slug}.md ({len(body)} chars)")
PYEOF
    
    # Move to final location
    mv "/tmp/article-${slug}.md" "${output}"
    echo "  -> ${output}"
}

# Fetch all 12 missing articles
fetch_article "best-ai-image-editing-tools-2026"
fetch_article "best-free-ai-tools-2026"
fetch_article "elevenlabs-voice-ai-review"
fetch_article "google-gemini-25-ultra"
fetch_article "gpt5-vs-claude4-2026"
fetch_article "meta-llama-4-review"
fetch_article "midjourney-v7-review"
fetch_article "perplexity-vs-chatgpt-search"
fetch_article "runway-gen4-review"
fetch_article "sora-video-generation-review"
fetch_article "stable-diffusion-4-vs-midjourney-v7"
fetch_article "ai-coding-tools-2026"

echo ""
echo "Done! Verifying..."
wc -l "${ARTICLES_DIR}"/*.md