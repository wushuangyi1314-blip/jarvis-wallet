# AI Tool Review 文章生产标准流程

> 文档版本：v1.0
> 创建时间：2026-04-01
> 适用场景：运营经理撰写 AI 工具评测文章

---

## 一、流程概述

```
运营写文章 → GitHub提交 → Cloudflare Pages自动构建 → 上线发布
```

---

## 二、运营写文章标准

### 2.1 文章存放位置
```
content/articles/文章slug.md
```

### 2.2 frontmatter 模板

```yaml
---
title: "文章标题"
description: "SEO描述，50-160字符"
date: 2026-04-01
heroImage: "图片路径"
categories: ["AI Programming"]
tags: ["tag1", "tag2"]
---
```

**注意：不要写 `toc: true`，这会导致构建失败。**

### 2.3 写作参考文档

| 文档 | 用途 |
|------|------|
| `projects/content-template/sample-benchmark-article.md` | 写作质量标杆 |
| `projects/content-template/WRITING-GUIDE.md` | 写作指南 |

---

## 三、内容样式标准

### 3.1 自动应用的样式

运营写标准 Markdown，以下样式自动生效：

| 元素 | 写法 | 效果 |
|------|------|------|
| 表格 | `\| 表头 \|` + `\|---\|'` | ✅ 渐变紫表头 + 斑马纹 |
| 引用块 | `> 内容` | ✅ 紫色左边框 + 背景 |
| 标题 | `## H2` / `### H3` | ✅ 自动 |
| 列表 | `- 内容` / `1. 内容` | ✅ 自动 |
| 代码块 | \`\`\` | ✅ 自动 |

### 3.2 优缺点自动识别

文章中以以下方式书写的优缺点，会自动应用样式：

```markdown
## ✅ What Cursor Gets Right
- 优点1
- 优点2

## ❌ Where Cursor Falls Short
- 缺点1
- 缺点2
```

效果：自动变成绿色/红色左边框卡片。

### 3.3 Shortcode 用法（可选）

如需特殊样式，可使用 shortcode：

```markdown
<!-- 优缺点双栏 -->
{{< card type="pros" title="Strengths" >}}
- 优点1
- 优点2
{{< /card >}}

<!-- 对比表格 -->
{{< card type="comparison" title="Feature Comparison" >}}
| Feature | A | B |
|---------|---|---|
| Price | $10 | $20 |
{{< /card >}}

<!-- 警告块 -->
{{< card type="warning" title="Note" >}}
警告内容
{{< /card >}}
```

---

## 四、提交与发布流程

### 4.1 GitHub 提交

```bash
git add content/articles/文章slug.md
git commit -m "Add: 文章标题"
git push origin main
```

### 4.2 自动构建

- GitHub push 后，Cloudflare Pages 自动触发构建
- 构建命令：`hugo --gc --minify`
- 预计时间：2-5 分钟

### 4.3 验证上线

访问：`https://aitoolreviewr.com/articles/文章slug/`

---

## 五、CSS 样式文件

样式文件：`static/assets/css/style.css`

已包含的自动样式：
- `.article-content table` — 渐变表头表格
- `.article-content blockquote` — 引用块
- `.article-content h2/h3/h4` — 标题
- 优缺点 JS 自动识别（`static/js/article.js`）

---

## 六、禁止事项

| 禁止 | 原因 |
|------|------|
| `toc: true` | 会导致 Hugo 构建失败 |
| HTML 标签如 `<table>`、`<div>` | 应用 Markdown 语法 |
| `force push` 到 main | 会覆盖他人代码 |

---

## 七、常见问题

**Q: 表格没有样式？**
A: 确保使用标准 Markdown 表格语法，CSS 会自动应用样式。

**Q: 优缺点没有变成绿色/红色卡片？**
A: 确保标题格式为 `## ✅ 优点` 或 `## ❌ 缺点`。

**Q: 构建失败？**
A: 检查 frontmatter 是否正确，特别是不要写 `toc: true`。

---

*文档更新：2026-04-01*
