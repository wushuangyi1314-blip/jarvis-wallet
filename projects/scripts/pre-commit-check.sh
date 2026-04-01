#!/bin/bash
# pre-commit-check.sh
# 文章提交前的自动检查脚本
# 用法: ./pre-commit-check.sh <文章文件路径>

set -e

ARTICLE_FILE="$1"

if [ -z "$ARTICLE_FILE" ]; then
    echo "❌ 用法: ./pre-commit-check.sh <文章文件路径>"
    exit 1
fi

if [ ! -f "$ARTICLE_FILE" ]; then
    echo "❌ 文件不存在: $ARTICLE_FILE"
    exit 1
fi

echo "🔍 开始检查文章: $ARTICLE_FILE"
echo "================================"

ERRORS=0

# 1. 检查 frontmatter 是否完整
echo -n "📋 检查 frontmatter... "
if grep -q "^---$" "$ARTICLE_FILE" && head -20 "$ARTICLE_FILE" | grep -q "^---$"; then
    # 提取 frontmatter 内容
    FRONTMATTER=$(sed -n '/^---$/,/^---$/p' "$ARTICLE_FILE" | head -20)
    
    HAS_TITLE=$(echo "$FRONTMATTER" | grep -q "title:" && echo "yes" || echo "no")
    HAS_DESC=$(echo "$FRONTMATTER" | grep -q "description:" && echo "yes" || echo "no")
    HAS_DATE=$(echo "$FRONTMATTER" | grep -q "date:" && echo "yes" || echo "no")
    
    if [ "$HAS_TITLE" = "yes" ] && [ "$HAS_DESC" = "yes" ] && [ "$HAS_DATE" = "yes" ]; then
        echo "✅ 通过"
    else
        echo "❌ 缺少必填字段 (title/description/date)"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "❌ 缺少 frontmatter (需要 --- 包裹)"
    ERRORS=$((ERRORS + 1))
fi

# 2. 检查是否使用了禁止的 HTML 标签
echo -n "🚫 检查禁止的 HTML 标签... "
PROHIBITED_TAGS=$(grep -oE '<(table|div|span|br|p)[^>]*>' "$ARTICLE_FILE" 2>/dev/null | head -5 || true)
if [ -n "$PROHIBITED_TAGS" ]; then
    echo "❌ 发现禁止的 HTML 标签:"
    echo "$PROHIBITED_TAGS" | while read -r tag; do
        echo "   - $tag"
    done
    echo "   → 请使用 Markdown 语法而非 HTML"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ 通过"
fi

# 3. 检查表格格式（如果有表格）
echo -n "📊 检查表格格式... "
TABLE_LINES=$(grep -c "^|" "$ARTICLE_FILE" 2>/dev/null || echo "0")
if [ "$TABLE_LINES" -gt 0 ]; then
    # 检查表格是否有表头分隔符行
    if grep -q "^|---" "$ARTICLE_FILE"; then
        echo "✅ 通过 (发现 $TABLE_LINES 个表格行)"
    else
        echo "⚠️  警告: 表格缺少表头分隔符 |---|"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "ℹ️  无表格，跳过"
fi

# 4. 检查标题层级是否跳级
echo -n "📑 检查标题层级... "
H2_COUNT=$(grep -cE "^## " "$ARTICLE_FILE" 2>/dev/null || echo "0")
H4_COUNT=$(grep -cE "^#### " "$ARTICLE_FILE" 2>/dev/null || echo "0")

if [ "$H4_COUNT" -gt 0 ] && [ "$H2_COUNT" -eq 0 ]; then
    echo "❌ 检测到 H4 标题但没有 H2 标题（标题跳级）"
    ERRORS=$((ERRORS + 1))
else
    echo "✅ 通过"
fi

# 5. 检查 Hugo 构建（如果 Hugo 可用）
echo -n "🏗️  检查 Hugo 构建... "
if command -v hugo &> /dev/null; then
    # 切换到项目目录执行构建
    PROJECT_DIR=$(cd "$(dirname "$ARTICLE_FILE")/../.." && pwd)
    cd "$PROJECT_DIR"
    
    # 临时构建检查
    if hugo --destination /tmp/hugo-test-build 2>&1 | grep -q "ERROR"; then
        echo "❌ Hugo 构建失败"
        hugo --destination /tmp/hugo-test-build 2>&1 | grep "ERROR" | head -3
        ERRORS=$((ERRORS + 1))
    else
        echo "✅ 通过"
    fi
else
    echo "ℹ️  Hugo 未安装，跳过构建检查"
fi

# 6. 检查文件命名
echo -n "📁 检查文件名... "
FILENAME=$(basename "$ARTICLE_FILE" .md)
if [[ "$FILENAME" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo "✅ 通过"
else
    echo "⚠️  建议使用小写字母和连字符命名 (如: ai-tool-name-2026.md)"
fi

echo "================================"
if [ $ERRORS -eq 0 ]; then
    echo "✅ 所有检查通过！文章可以提交。"
    exit 0
else
    echo "⚠️  发现 $ERRORS 个问题，建议修复后再提交。"
    exit 1
fi
