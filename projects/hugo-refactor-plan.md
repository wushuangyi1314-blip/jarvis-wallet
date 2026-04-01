# Hugo 网站完整重构方案

> 文档版本：v1.0  
> 创建时间：2026-04-01  
> 目标：支撑未来 5000+ 篇内容持续运营

---

## 1. 问题根因分析

### 1.1 当前问题清单

通过代码审查，发现以下潜在问题：

| 问题类别 | 具体问题 | 影响程度 |
|---------|---------|---------|
| **模板复杂度** | `single.html` 包含内联 JS/CSS 逻辑，超过 200 行 | 🔴 高 |
| **模板耦合** | `baseof.html` 直接写死 head 内容，缺乏 block 覆盖机制 | 🔴 高 |
| **静态资源硬编码** | `heroImage` 使用路径拼接 `assets/images/`，易出错 | 🟡 中 |
| **Shortcodes 分散** | `comparison`、`callout` 等 shortcode 分散且功能重叠 | 🟡 中 |
| **Front Matter 冗余** | Archetype 定义过长（~60 行），字段命名不一致 | 🟡 中 |
| **TOC 生成缺失** | TOC 依赖手动维护，未自动化 | 🟡 中 |
| **Git 工作流缺失** | 无分支策略文档，可能存在 force push 冲突 | 🔴 高 |
| **构建验证缺失** | 无预提交验证，本地错误可能直接上生产 | 🟡 中 |

### 1.2 根因总结

**核心问题：模板承担了太多职责（表现层 + 业务逻辑 + 静态资源管理），且缺乏统一的内容规范。**

```
当前架构问题：
layouts/_default/single.html (200+ 行)
├── HTML 结构
├── 内联 JavaScript (like button sync, TOC highlight)
├── 内联 CSS 类
├── 硬编码路径拼接
└── JSON-LD 手动注入

理想架构：
layouts/_default/single.html (50 行)
├── 纯结构引用
├── 外部 JS 模块
└── block 覆盖点
```

---

## 2. 重构目标

### 2.1 量化目标

| 指标 | 当前值 | 目标值 |
|-----|-------|-------|
| 单篇文章构建时间 | ~2s（预估） | < 1s |
| CSS 文件大小 | 30KB | < 20KB |
| 单个模板文件行数 | ~200 行 | < 80 行 |
| 必需 Front Matter 字段 | 12+ | 6 个核心字段 |
| 构建错误发现时机 | 生产部署后 | 本地预提交 |

### 2.2 战略目标

1. **可扩展性**：支撑 5000+ 篇内容，列表页分页/懒加载
2. **可维护性**：新编辑无需学习 Hugo 模板即可写文章
3. **稳定性**：任何修改都有回滚能力，禁止 force push
4. **一致性**：所有文章共享同一视觉规范，减少样式碎片

---

## 3. Git 分支策略

### 3.1 分支模型

```
main (生产分支)
├── protection: 禁止直接 push，需要 PR
├── 合并条件：至少 1 个 review + CI 通过
│
├── develop (开发分支)
│   └── 功能稳定后合并到 main
│
├── content/* (内容分支)
│   ├── content/articles/new-tool-review.md
│   └── 内容编辑独立分支，避免相互覆盖
│
└── feature/* (功能分支)
    ├── feature/simplify-templates
    └── feature/new-landing-page
```

### 3.2 解决 Force Push 问题

**根本原因**：多人协作时 force push 会覆盖他人提交。

**解决方案**：

```bash
# 1. 在 .git/config 或 .git/config 文件中保护 main 分支
# 使用 GitHub/Gitea 的 Branch Protection Rules：
# - Block force pushes to main
# - Require PR reviews
# - Require status checks

# 2. 团队共识：永远不要 force push main
# 如需修正，创建一个 recovery 分支

# 3. 危险命令需要二次确认
git config --global alias.push-force-with-lease "!git push --force-with-lease origin HEAD"
```

### 3.3 提交规范

```
<type>(<scope>): <subject>

Types:
- feat: 新功能
- fix: 修复 bug
- content: 文章内容更新
- style: 样式调整
- refactor: 重构
- docs: 文档
- test: 测试
- chore: 杂项

Example:
content(articles): add Claude 4 review article
fix(templates): correct heroImage path resolution
```

---

## 4. Hugo 模板重构方案

### 4.1 重构原则

1. **单一职责**：每个文件只做一件事
2. **DRY 原则**：公共部分提取到 partials
3. **配置外置**：硬编码值移到 config.toml/params
4. **渐进增强**：先简化，再增强功能

### 4.2 具体简化步骤

#### Step 1: 拆分 baseof.html（目标：移除内联 head）

**当前问题**：`baseof.html` 写死了 Google Fonts、gtag.js、JSON-LD

**重构后**：

```html
<!-- layouts/_default/baseof.html -->
<!DOCTYPE html>
<html lang="{{ .Site.LanguageCode }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ with .Title }}{{ . }} | {{ end }}{{ .Site.Title }}</title>
    <meta name="description" content="{{ with .Description }}{{ . }}{{ else }}{{ .Site.Params.description }}{{ end }}">
    <link rel="canonical" href="{{ .Permalink }}">
    
    {{ partial "head/fonts.html" . }}
    {{ partial "head/styles.html" . }}
    {{ partial "head/seo.html" . }}
    
    {{ block "extraHead" . }}{{ end }}
</head>
<body>
    {{ partial "header.html" . }}
    {{ block "main" . }}{{ end }}
    {{ partial "footer.html" . }}
    {{ partial "scripts/bottom.html" . }}
    {{ block "extraScripts" . }}{{ end }}
</body>
</html>
```

#### Step 2: 简化 single.html（目标：< 80 行）

**当前问题**：single.html 包含 200+ 行，包含内联 JS

**重构后**：

```html
<!-- layouts/_default/single.html -->
{{ define "main" }}
{{ $related := where .Site.RegularPages "Section" "articles" | complement (slice .) | first 4 }}

<article class="article" data-pagefind-body>
    {{ partial "article/hero.html" . }}
    {{ partial "article/header.html" . }}
    
    <div class="article-layout">
        {{ partial "article/toc.html" . }}
        <div class="article-content" data-pagefind-body>
            {{ .Content }}
        </div>
    </div>
    
    {{ partial "article/affiliate-card.html" . }}
    {{ partial "article/like-section.html" . }}
</article>

{{ partial "article/related.html" (dict "related" $related "Site" $.Site) }}
{{ end }}

{{ define "extraScripts" }}
<script src="{{ .Site.BaseURL }}js/article.js"></script>
{{ end }}
```

#### Step 3: 创建 partials 结构

```
layouts/partials/
├── head/
│   ├── fonts.html        # Google Fonts 链接
│   ├── styles.html       # CSS 链接
│   └── seo.html          # JSON-LD + meta tags
├── article/
│   ├── hero.html         # 文章顶部大图
│   ├── header.html       # 标题 + meta 信息
│   ├── toc.html          # 目录（可折叠）
│   ├── affiliate-card.html
│   ├── like-section.html
│   └── related.html
└── ui/
    ├── card.html          # 通用卡片组件
    ├── button.html
    └── badge.html
```

#### Step 4: 统一 Shortcodes

**当前问题**：callout、comparison、pros、cons 各自独立

**重构后**：使用统一的 `card` shortcode，通过 type 参数区分

```html
<!-- 统一使用 card shortcode -->
{{< card type="pros" title="优点" >}}
- 速度快
- 界面简洁
{{< /card >}}

{{< card type="cons" title="缺点" >}}
- 价格高
- 移动端体验差
{{< /card >}}

{{< card type="comparison" title="对比" >}}
| 功能 | A | B |
|-----|---|---|
| 价格 | $10 | $20 |
{{< /card >}}

<!-- 原有 shortcodes 作为 wrapper，内部调用 card -->
```

### 4.3 移除的问题结构

| 移除项 | 原因 | 替代方案 |
|-------|------|---------|
| `heroImage` 硬编码 `assets/images/` 前缀 | 路径易错 | 使用 `resources.Get` 配合相对路径 |
| TOC 手动维护 | 易遗漏、更新不及时 | 自动从 Markdown 标题生成 |
| 内联 JavaScript | 难以维护 | 独立 JS 模块，按需加载 |
| `rating`、`readingTime` 字段 | 非必需 | 计算属性自动生成 |
| `featuredTool`、`toolCard` | 字段冗余 | 统一到 `affiliate` 配置块 |

---

## 5. 内容工作流

### 5.1 文章创作流程

```
┌─────────────────────────────────────────────────────────────┐
│  1. 创建分支                                                │
│     git checkout -b content/articles/new-tool-review        │
├─────────────────────────────────────────────────────────────┤
│  2. 使用标准模板                                            │
│     hugo new articles/new-tool-review.md                    │
├─────────────────────────────────────────────────────────────┤
│  3. 填写核心 Front Matter                                   │
│     title, description, date, categories, tags              │
├─────────────────────────────────────────────────────────────┤
│  4. 写作内容（使用 Shortcodes 保证样式）                     │
│     {{< card type="pros" >}}优点内容{{< /card >}}           │
├─────────────────────────────────────────────────────────────┤
│  5. 本地预览                                                │
│     hugo server                                             │
│     访问 http://localhost:1313                              │
├─────────────────────────────────────────────────────────────┤
│  6. 提交并推送                                              │
│     git add . && git commit -m "content: add new review"    │
│     git push origin content/articles/new-tool-review        │
├─────────────────────────────────────────────────────────────┤
│  7. 创建 PR（通过 GitHub UI）                               │
│     - 自动触发 CI 构建验证                                  │
│     - Review 通过后合并到 main                              │
│     - 自动部署到 Cloudflare Pages                           │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 简化后的 Front Matter

```yaml
---
title: "文章标题"
description: "SEO 描述，50-160 字符"
date: 2026-04-01
categories: ["AI Writing"]
tags: ["tag1", "tag2"]
heroImage: "article-cover.jpg"

# 全部可选字段
affiliate:
  name: "工具名称"
  desc: "一句话描述"
  url: "https://example.com"
---
```

### 5.3 样式统一策略

1. **Shortcodes 强制约束**：所有需要特殊样式的内容必须使用 shortcodes
2. **CSS 变量驱动**：颜色、间距等使用 CSS 变量，便于全局调整
3. **组件审查**：新增 shortcode 需通过设计审查
4. **禁止内联样式**：文章内容中禁止 `<style>` 标签

---

## 6. 部署流程

### 6.1 Cloudflare Pages 配置

```yaml
# 构建配置（通过 Cloudflare Pages UI 设置）
Build command: hugo --gc --minify
Build output directory: public
Root directory: /

# 环境变量
HUGO_VERSION: 0.123.0

# 触发条件
- Push to main branch: 自动部署
- Pull Request: 部署预览 URL
```

### 6.2 缓存管理策略

| 缓存类型 | 配置 | 说明 |
|---------|------|------|
| **静态资源** | `Cache-Control: public, max-age=31536000, immutable` | JS/CSS/图片长期缓存 |
| **HTML 页面** | `Cache-Control: public, max-age=3600` | 内容可能更新 |
| **API/JSON** | `Cache-Control: no-cache` | 搜索索引等实时数据 |
| **Cloudflare CDN** | 启用 "Cache Everything" 页面规则 | 按路径规则匹配 |

### 6.3 验证流程

```
部署前检查清单：
□ hugo --gc --minify 构建成功（无 error）
□ 所有文章页面可访问（抽查 5 篇）
□ 搜索功能正常
□ TOC 正确渲染
□ 图片正常加载
□ 移动端样式正常
□ Console 无 JS 错误

部署后检查清单：
□ 主页正常加载
□ 文章页正常加载
□ 搜索功能正常
□ 验证 Google Analytics 有数据
```

### 6.4 回滚方案

```bash
# Cloudflare Pages 仪表板操作：
# 1. 进入 Pages 项目
# 2. 点击 "Deployments"
# 3. 选择上一个成功的 deployment
# 4. 点击 "Roll back"

# 或通过 CLI：
npx wrangler pages deployment rollback <deployment-id>
```

---

## 7. 迁移步骤

### 7.0 代码库清理（在 Phase 0 之前执行）

**清理目标：删除无用文件，简化代码库结构**

```bash
# 需要删除的文件/目录

# 1. Hugo 构建产物（不应提交到 Git）
public/
resources/
.hugo_build.lock
hugo_stats.json

# 2. 根目录的 Hugo 生成文件（应在 layouts/ 中）
about.html
index.html
privacy.html
terms.html
search.js
search-index.js
sitemap.xml

# 3. 孤立目录
projects/jarvis-wallet/

# 4. 根目录的 HTML 测试截图（无用）
*.png (根目录下的 Hugo 测试截图)

# 确认 layouts/ 中的文件是模板而非生成物
layouts/index.html  # 这是模板，开头是 {{ define }}
```

**清理后 Git 状态应该是：**
```
/
├── content/
├── layouts/          # Hugo 模板（.html 文件是模板）
├── static/          # 静态资源
├── hugo.toml
├── cloudflare-pages.toml
├── .gitignore
└── (其他配置文件)
```

---

### 7.1 执行计划

| 阶段 | 任务 | 预计时间 | 风险等级 |
|-----|------|---------|---------|
| **Phase 0: 准备** | 创建备份、分支保护规则 | 1h | 🟢 低 |
| **Phase 1: 模板重构** | 拆分 baseof、实现 partials | 4h | 🟡 中 |
| **Phase 2: 简化 Front Matter** | 更新 archetype、迁移现有文章 | 2h | 🟡 中 |
| **Phase 3: Shortcode 统一** | 创建统一 card shortcode | 2h | 🟢 低 |
| **Phase 4: 内容验证** | 全量构建测试、内容抽查 | 2h | 🟡 中 |
| **Phase 5: 部署上线** | 切换到生产环境 | 1h | 🔴 高 |
| **Phase 6: 监控验证** | 48h 监控问题 | 48h | 🟢 低 |

**总预计时间：约 2 个工作日**

### 7.2 Phase 0 - 准备工作

```bash
# 1. 创建完整备份
git tag backup-pre-refactor-$(date +%Y%m%d)
git push origin backup-pre-refactor-$(date +%Y%m%d)

# 2. 克隆到本地备份
cp -r /path/to/hugo-site /path/to/backup/

# 3. 在 GitHub/Gitea 设置 Branch Protection
# - Require pull request reviews before merging: ON
# - Require status checks to pass before merging: ON
# - Include administrators: ON
# - Do not allow bypassing the above settings: ON

# 4. 禁止 force push to main
# 在 repo settings 中启用 "Block force push"
```

### 7.3 Phase 1 - 模板重构

```bash
# 创建功能分支
git checkout -b feature/simplify-templates

# 重构文件结构
mkdir -p layouts/partials/head layouts/partials/article layouts/partials/ui
mkdir -p assets/js

# 创建各个 partial 文件（详见第 4 节）
# ...

# 本地测试
hugo server --disableFastRender
# 访问 http://localhost:1313 验证

# 提交
git add .
git commit -m "refactor: simplify template structure"
```

### 7.4 Phase 2 - Front Matter 简化

```bash
# 创建迁移脚本
cat > scripts/migrate-frontmatter.py << 'EOF'
import yaml
import os
from pathlib import Path

def migrate_article(content):
    # 读取 front matter
    # 保留核心字段：title, description, date, categories, tags, heroImage
    # 移除冗余字段：rating, ratingCount, readingTime, featuredTool, toolCard 等
    # 保留但合并：affiliate 相关字段统一到 affiliate 块
    pass
EOF

# 批量迁移现有文章
for f in content/articles/*.md; do
    python scripts/migrate-frontmatter.py "$f"
done

# 验证构建
hugo --gc --minify
```

### 7.5 Phase 5 - 生产部署

```bash
# 1. 确保 CI 测试通过
# 在 GitHub Actions 中检查 hugo build 步骤

# 2. 合并到 main
git checkout main
git merge feature/simplify-templates
git push origin main

# 3. Cloudflare Pages 自动触发部署
# 等待部署完成（约 2-5 分钟）

# 4. 验证生产环境
# - 访问主页
# - 抽查 3-5 篇文章
# - 测试搜索功能
# - 检查 Console 错误
```

### 7.6 风险点和缓解措施

| 风险 | 概率 | 影响 | 缓解措施 |
|-----|-----|-----|---------|
| 模板重构后样式不一致 | 🟡 中 | 🔴 高 | Phase 4 全量视觉回归测试 |
| 构建失败导致部署中断 | 🟡 中 | 🟡 中 | 先在 preview 分支测试 |
| 图片路径失效 | 🟡 中 | 🟡 中 | 批量检查 `assets/images/` 引用 |
| 搜索索引重建失败 | 🟢 低 | 🟡 中 | 保留旧搜索方案作为 fallback |
| Cloudflare Pages 缓存问题 | 🟡 中 | 🟡 低 | 部署后清除缓存 |

---

## 8. 验收标准

### 8.1 功能验收

| 功能 | 验收条件 | 测试方法 |
|-----|---------|---------|
| 主页 | 加载时间 < 3s，无错误 | Lighthouse 审计 |
| 文章列表 | 分页/懒加载正常，文章数正确 | 抽查列表页 |
| 文章详情 | 标题、分类、标签、相关文章正常 | 抽查 5 篇 |
| 图片 | 所有文章 heroImage 正常显示 | 批量检查 |
| TOC | 自动生成，锚点跳转正确 | 点击测试 |
| 搜索 | 关键词搜索返回正确结果 | 手动测试 |
| 移动端 | 响应式布局正常，无水平滚动 | 真机测试 |

### 8.2 技术验收

| 指标 | 验收条件 | 测量方法 |
|-----|---------|---------|
| 构建时间 | `hugo --gc --minify` < 30s | 本地计时 |
| 构建产物大小 | public/ 目录 < 50MB | `du -sh public/` |
| CSS 文件大小 | < 20KB（minified） | `wc -c style.css` |
| 单模板文件行数 | < 80 行 | `wc -l layouts/*.html` |
| 构建警告 | 无 warning | `hugo 2>&1` |

### 8.3 流程验收

| 流程 | 验收条件 |
|-----|---------|
| 分支保护 | main 分支无法 force push |
| PR 要求 | 合并到 main 必须通过 PR review |
| CI 验证 | PR 必须通过 hugo build 才能合并 |
| 部署验证 | 部署后自动发送通知（如 Slack/邮件） |

### 8.4 回归测试清单

```bash
# 完整回归测试命令
hugo --gc --minify && echo "✅ Build Success"

# 检查所有模板文件
find layouts -name "*.html" -exec wc -l {} \; | awk '$1 > 80 {print "❌ " $0}'

# 检查所有文章可访问
for slug in $(hugo --quiet --printI18nWarnings --printPathWarnings 2>&1 | grep -i "warning" | grep -i "path"); do
    echo "⚠️  $slug"
done

# 验证 front matter 字段
grep -L "^title:" content/articles/*.md && echo "❌ Missing title"
grep -L "^description:" content/articles/*.md && echo "❌ Missing description"
```

---

## 附录

### A. 推荐 Hugo 版本

```yaml
HUGO_VERSION: "0.123.0"  # Extended 版本，支持 SCSS
```

### B. 推荐的 VS Code 插件

- Hugo Language and Templates Support
- Hugo Shortcodes
- YAML

### C. 关键文件清单

| 文件 | 用途 |
|-----|------|
| `hugo.toml` | 站点配置 |
| `archetypes/article.md` | 文章模板 |
| `layouts/_default/baseof.html` | 基础 HTML 结构 |
| `layouts/_default/single.html` | 文章详情页模板 |
| `layouts/_default/list.html` | 列表页模板 |
| `assets/css/style.css` | 主样式文件 |
| `assets/js/` | JavaScript 模块 |

---

*文档结束*
