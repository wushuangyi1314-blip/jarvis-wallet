#!/bin/bash
cd /root/.openclaw/workspace/skills/humanize-chinese-2-0-0
for f in /root/.openclaw/workspace/novel-factory/星际机甲崛起/创作/01-章节草稿/第1卷/0{36,37,38,39,40,41,42,43,44,45}-*.md; do
  echo "=== Processing $f ==="
  python3 scripts/humanize_cn.py "$f" -a --scene general -o "${f%.md}_h.md" 2>/dev/null
done
