#!/bin/bash
cd /root/.openclaw/workspace/novel-factory/星际机甲崛起/创作/01-章节草稿/第1卷
for f in 091-*.md 092-*.md 093-*.md 094-*.md 095-*.md; do
  echo "=== Processing $f ==="
  python3 /root/.openclaw/workspace/skills/humanize-chinese-2-0-0/scripts/humanize_cn.py "$f" -a --scene general -o "${f%.md}_h.md" 2>/dev/null
done
