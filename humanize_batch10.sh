#!/bin/bash
cd /root/.openclaw/workspace/novel-factory/星际机甲崛起/创作/01-章节草稿/第1卷
for f in 096-*.md 097-*.md 098-*.md 099-*.md 100-*.md; do
  echo "=== Processing $f ==="
  python3 /root/.openclaw/workspace/skills/humanize-chinese-2-0-0/scripts/humanize_cn.py "$f" -a --scene general -o "${f%.md}_h.md" 2>/dev/null
done
