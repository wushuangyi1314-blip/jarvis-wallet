# UI 设计规范 (Design Standards)

> **风格定位**: 学术现代极简 (Academic Modern Minimal)
> **设计参照**: Anthropic 学术感 + Linear 开发者美学
> **基于规范**: Apple HIG + Material Design
> **版本**: 1.0.0
> **最后更新**: 2026-03-29

---

## 目录

1. [设计原则](#1-设计原则)
2. [色彩规范](#2-色彩规范)
3. [字体规范](#3-字体规范)
4. [间距规范](#4-间距规范)
5. [组件规范](#5-组件规范)
6. [布局规范](#6-布局规范)
7. [图标规范](#7-图标规范)
8. [动效规范](#8-动效规范)
9. [无障碍规范](#9-无障碍规范)

---

## 1. 设计原则

### 1.1 核心原则 (来自 Apple HIG)

| 原则 | 含义 |
|------|------|
| **清晰 (Clarity)** | 内容是核心，UI为内容服务；文字可读性最重要；图标和图像清晰有意义 |
| **尊重 (Deference)** | UI不应与内容竞争；使用半透明和模糊背景；边框与分隔线要微妙 |
| **深度 (Depth)** | 视觉层次清晰；过渡动画提供空间感；可交互元素有触感反馈 |

### 1.2 辅助原则 (来自 Material Design)

| 原则 | 含义 |
|------|------|
| **大胆、图形、有意** | 印刷设计方法（网格、间距、颜色）；图像作为主要表达工具 |
| **动效提供意义** | 元素之间的连接关系；过渡引导注意力；动画有目的，不装饰性 |

### 1.3 项目风格关键词

- **权威**: 专业的视觉表达
- **清晰**: 信息层次分明
- **克制**: 不过度设计
- **现代**: 符合当前设计趋势
- **高效**: 界面服务于快速获取信息

---

## 2. 色彩规范

### 2.1 基础色板

#### 主色 (Primary)

| 名称 | 色值 | 用途 |
|------|------|------|
| Primary | `#6366F1` | 品牌主色、主要操作按钮、链接 |
| Primary Dark | `#4F46E5` | 悬停状态、深色背景上的 Primary |
| Primary Light | `#818CF8` | 浅色背景、选中态 |
| Primary Subtle | `#EEF2FF` | Primary 背景色（浅色模式） |

#### 辅助色 (Secondary / Accent)

| 名称 | 色值 | 用途 |
|------|------|------|
| Secondary | `#10B981` | 成功、推荐、高评分 |
| Accent | `#F59E0B` | 热门、New 标签、警示 |
| Accent Alt | `#8B5CF6` | AI 标签、特殊功能 |
| Cyan | `#06B6D4` | 免费标签、信息 |

#### 中性色 (Neutral)

| 名称 | Light Mode | Dark Mode | 用途 |
|------|------------|-----------|------|
| Background | `#FAFAFA` | `#0A0A0A` | 页面背景 |
| Surface | `#FFFFFF` | `#141414` | 卡片、面板背景 |
| Surface Elevated | `#FFFFFF` | `#1E1E1E` | 悬浮态卡片 |
| Border | `#E5E7EB` | `#374151` | 边框、分隔线 |
| Divider | `#F3F4F6` | `#1F2937` | 分割线（低对比度） |

#### 文字色 (Text)

| 名称 | Light Mode | Dark Mode | 用途 |
|------|------------|-----------|------|
| Text Primary | `#1F2937` | `#F9FAFB` | 主要文字、标题 |
| Text Secondary | `#6B7280` | `#9CA3AF` | 次要文字、正文 |
| Text Tertiary | `#9CA3AF` | `#6B7280` | 辅助文字、占位符 |
| Text Inverse | `#FFFFFF` | `#0A0A0A` | 深色背景上的文字 |

---

### 2.2 语义色 (Semantic Colors)

| 语义 | Light Mode 背景 | Light Mode 文字 | Dark Mode 背景 | Dark Mode 文字 | 用途 |
|------|-----------------|-----------------|----------------|----------------|------|
| **Success** | `#D1FAE5` | `#059669` | `#064E3B` | `#34D399` | 成功、高评分、推荐 |
| **Warning** | `#FEF3C7` | `#D97706` | `#78350F` | `#FCD34D` | 警告、中等评分 |
| **Error** | `#FEE2E2` | `#DC2626` | `#7F1D1D` | `#FCA5A5` | 错误、失败、低评分 |
| **Info** | `#DBEAFE` | `#1D4ED8` | `#1E3A8A` | `#93C5FD` | 信息提示 |
| **AI / New** | `#EDE9FE` | `#7C3AED` | `#4C1D95` | `#C4B5FD` | AI 工具、新上线 |
| **Free** | `#CFFAFE` | `#0891B2` | `#164E63` | `#67E8F9` | 免费工具 |
| **Pro** | `#FEF3C7` | `#B45309` | `#78350F` | `#FDE68A` | 专业版、付费 |

---

### 2.3 暗黑模式 (Dark Mode)

> 暗黑模式不是简单反色，而是：
> - 使用深灰而非纯黑 (`#0A0A0A` 而非 `#000000`)
> - 使用柔和的白色文字 (`#F9FAFB` 而非 `#FFFFFF`)
> - 强调色在深色背景下更亮
> - 减少高对比度造成的视觉疲劳

#### 深色模式色值对照表

| 元素 | Light Mode | Dark Mode |
|------|------------|-----------|
| 页面背景 | `#FAFAFA` | `#0A0A0A` |
| 卡片背景 | `#FFFFFF` | `#141414` |
| 悬浮卡片 | `#FFFFFF` | `#1E1E1E` |
| 边框 | `#E5E7EB` | `#374151` |
| 主要文字 | `#1F2937` | `#F9FAFB` |
| 次要文字 | `#6B7280` | `#9CA3AF` |
| 主色 | `#6366F1` | `#818CF8` |

---

### 2.4 颜色使用规则

```
✓ 使用主色控制重要操作
✓ 使用语义色传达状态
✓ 避免纯黑色，改用深灰
✓ 避免纯白色，改用暖白
✓ 保持 4.5:1 对比度（正文）
✓ 保持 3:1 对比度（大文字 >18pt）

✗ 不单独用颜色传达信息（配合图标/文字）
✗ 不使用超过 3 种主色
✗ 不在彩色背景上使用彩色文字
```

---

## 3. 字体规范

### 3.1 字体家族

| 用途 | 英文 | 中文 | 备选 |
|------|------|------|------|
| **正文 / UI** | Inter | 思源黑体 (Source Han Sans) / Noto Sans SC | system-ui |
| **大标题** | Inter | 思源黑体 | Source Han Sans |
| **代码** | JetBrains Mono, Fira Code | — | monospace |

> **字体加载**: 使用 Google Fonts 或 Fontsource
> ```css
> Inter: 400, 500, 600, 700
> JetBrains Mono: 400, 500
> ```

### 3.2 字号层级

| 名称 | 英文名 | 字号 | 字重 | 行高 | 字间距 | 用途 |
|------|--------|------|------|------|--------|------|
| H1 | Display | 48px / 3rem | 700 (Bold) | 1.1 | -0.02em | 主标题、Hero 文字 |
| H2 | Large Title | 36px / 2.25rem | 700 (Bold) | 1.2 | -0.01em | 区块标题 |
| H3 | Title | 28px / 1.75rem | 600 (Semibold) | 1.25 | -0.01em | 卡片大标题、Section 标题 |
| H4 | Headline | 20px / 1.25rem | 600 (Semibold) | 1.3 | 0 | 子标题、小区块标题 |
| H5 | Subhead | 16px / 1rem | 600 (Semibold) | 1.4 | 0 | 标签导航、小标题 |
| Body Large | Body Large | 18px / 1.125rem | 400 (Regular) | 1.6 | 0 | 长正文、描述文字 |
| Body | Body | 16px / 1rem | 400 (Regular) | 1.6 | 0 | 主要正文内容 |
| Body Small | Body Small | 14px / 0.875rem | 400 (Regular) | 1.5 | 0 | 辅助说明、次要正文 |
| Caption | Caption | 12px / 0.75rem | 400 (Regular) | 1.4 | 0 | 图片说明、时间戳 |
| Label | Label | 12px / 0.75rem | 500 (Medium) | 1.2 | +0.02em | 按钮文字、标签文字 |

### 3.3 字重使用规范

| 字重 | 数值 | 使用场景 |
|------|------|----------|
| Regular | 400 | 正文、描述、说明文字 |
| Medium | 500 | Label、按钮文字、强调正文 |
| Semibold | 600 | 标题(H4-H5)、次要标题 |
| Bold | 700 | 主要标题(H1-H3)、重要数字 |

### 3.4 排版规则

```
✓ 标题与正文字号差至少 4px
✓ 行高：正文 1.5-1.6，标题 1.0-1.3
✓ 字间距：标题略紧凑(-0.02em)，正文正常，Label 略宽松(+0.02em)
✓ 最大行宽：65 字符（约 640px），超过需换行
✓ 避免全大写标题（除 Label/Caption 级别）

✗ 标题不要过粗（避免 900 Black，除非特殊需求）
✗ 正文不要用 Bold（会导致阅读疲劳）
✗ 不要用斜体表达重要信息（Italic 仅用于引用/强调）
```

### 3.5 响应式字号

| 断点 | H1 | H2 | H3 | Body |
|------|----|----|----|------|
| < 640px (手机) | 32px | 28px | 22px | 16px |
| 640-1024px (平板) | 40px | 32px | 24px | 16px |
| > 1024px (桌面) | 48px | 36px | 28px | 16px |

---

## 4. 间距规范

### 4.1 基础网格单位

> **基础单位**: 8px (融合 HIG 4pt + MD 8dp，取 8pt 作为主要单位)

| 名称 | 值 | 用途示例 |
|------|-----|----------|
| `space-xs` | 4px | 元素内部的极小间隙 |
| `space-s` | 8px | 紧密相关的元素 |
| `space-m` | 16px | 默认间距、组件内边距 |
| `space-l` | 24px | 相关组件之间 |
| `space-xl` | 32px | 区块之间（桌面端） |
| `space-xxl` | 48px | 主要内容区块间距 |
| `space-3xl` | 64px | 页面顶部/底部留白（桌面） |

### 4.2 页面布局间距

| 元素 | 手机 (< 640px) | 平板 (640-1024px) | 桌面 (> 1024px) |
|------|---------------|-------------------|-----------------|
| 页面水平边距 | 16px | 24px | 32px |
| 区块垂直间距 | 48px | 64px | 80px |
| 容器最大宽度 | 100% | 1024px | 1280px |
| 栅格列数 | 4 列 | 8 列 | 12 列 |
| 栅格间距 (Gutter) | 12px | 16px | 24px |

### 4.3 组件内边距

| 组件 | 内边距 (Padding) |
|------|-----------------|
| 卡片 (Card) | 20px / 24px |
| 按钮 (Button) | 12px 20px (高度44px时) |
| 输入框 (Input) | 12px 16px (高度44px时) |
| 导航项 (Nav Item) | 8px 16px |
| 列表项 (List Item) | 16px (高度最小 44px) |
| 标签/徽章 (Tag/Chip) | 6px 12px (高度 28px) |

### 4.4 栅格系统

```
桌面 (≥ 1024px):
- 12 列网格
- 24px gutter (列间距)
- 32px 页面边距
- 最大宽度 1280px（居中）

平板 (640px - 1024px):
- 8 列网格
- 16px gutter
- 24px 页面边距
- 最大宽度 1024px

手机 (< 640px):
- 4 列网格
- 12px gutter
- 16px 页面边距
```

---

## 5. 组件规范

### 5.1 按钮 (Button)

#### 尺寸规范

| 属性 | Small | Medium | Large |
|------|-------|--------|-------|
| 高度 | 32px | 44px | 52px |
| 字号 | 13px | 15px | 16px |
| 字重 | 500 | 500 | 600 |
| 圆角 | 6px | 8px | 10px |
| 横向内边距 | 12px | 20px | 24px |
| 图标+文字间距 | 6px | 8px | 8px |

#### 按钮变体

**Primary Button:**

| 属性 | 值 |
|------|-----|
| 背景 | `#6366F1` |
| 文字 | `#FFFFFF` |
| Hover | `#4F46E5` |
| Active | `#4338CA` |
| Disabled | `#A5B4FC` (背景) + `#FFFFFF40` (文字) |

**Secondary Button:**

| 属性 | 值 |
|------|-----|
| 背景 | 透明 |
| 边框 | `1.5px solid #6366F1` |
| 文字 | `#6366F1` |
| Hover | 背景 `#EEF2FF` |
| Disabled | 边框 `#C7D2FE` + 文字 `#A5B4FC` |

**Ghost Button:**

| 属性 | 值 |
|------|-----|
| 背景 | 透明 |
| 文字 | `#6B7280` |
| Hover | 背景 `#F3F4F6` |
| Active | 背景 `#E5E7EB` |

**Danger Button:**

| 属性 | 值 |
|------|-----|
| 背景 | `#EF4444` |
| 文字 | `#FFFFFF` |
| Hover | `#DC2626` |

#### 按钮状态

| 状态 | 视觉变化 |
|------|----------|
| Default | 标准样式 |
| Hover | 背景变深/变亮，cursor: pointer |
| Active / Pressed | scale(0.98)，背景更深 |
| Focus | 2px 外发光（Primary 色） |
| Disabled | 50% 透明度，cursor: not-allowed |
| Loading | 显示 spinner，文字变淡，禁用点击 |

#### 按钮使用规范

```
✓ Primary 用于主要操作，每屏幕最多 1 个
✓ Secondary 用于次要操作
✓ Ghost 用于辅助操作（取消、返回）
✓ Danger 用于删除、危险操作
✓ 按钮最小触控区域 44x44px（HIG 标准）
✓ 按钮间最小间距 8px

✗ 不要在一个按钮上同时使用 Primary + Secondary 样式
✗ 不要使用纯色块按钮作为装饰
✗ 不要让按钮文字换行（最多一行）
```

---

### 5.2 卡片 (Card)

#### 基础规范

| 属性 | 值 |
|------|-----|
| 最小宽度 | 240px |
| 圆角 | 16px |
| 边框 | `1px solid #E5E7EB` (Light) / `#374151` (Dark) |
| 内边距 | 20px (手机) / 24px (桌面) |

**阴影：**

| 状态 | 阴影 |
|------|------|
| 默认 | 无 |
| 悬浮 | `0 4px 16px rgba(0, 0, 0, 0.08)` |
| 选中 | `0 0 0 2px #6366F1` |

#### 卡片内容结构

```
┌─────────────────────────────────┐
│  [Logo 48x48]  名称 H4          │
│                简介 Body Small  │
│                ─────────────────│
│  [评分 ★★★★☆] 4.2  (128)       │
│                ─────────────────│
│  [免费] [AI] [开源]   → 访问官网 │
└─────────────────────────────────┘
```

| 元素 | 规范 |
|------|------|
| Logo | 48x48px, 圆角 8px |
| 标题 | H4 (20px, Semibold) |
| 简介 | Body Small (14px), 最多 2 行，溢出省略 |
| 评分 | 星星 16px + 数字 + 评分数 |
| 标签 | Chip/Tag 样式，间距 6px |
| CTA | 右对齐，Ghost 按钮或链接 |

#### 卡片悬浮交互

| 状态 | 变化 |
|------|------|
| 悬浮 | `transform: translateY(-4px)` + `box-shadow: 0 4px 16px rgba(0,0,0,0.08)` |
| 按下 | `transform: translateY(-2px)` + 阴影减弱 |
| 选中 | 边框 `2px solid #6366F1` + 外发光 |

---

### 5.3 输入框 (Input / Text Field)

#### 基础规范

| 属性 | 值 |
|------|-----|
| 高度 | 44px |
| 圆角 | 8px |
| 边框 | `1.5px solid #D1D5DB` (Light) / `#4B5563` (Dark) |
| 字号 | 15px |
| 内边距 | 12px 16px |

#### 输入框状态

| 状态 | 边框色 | 背景色 |
|------|--------|--------|
| Default | `#D1D5DB` | 正常 |
| Hover | `#9CA3AF` | 正常 |
| Focus | `#6366F1` + 2px 外发光 | 正常 |
| Error | `#EF4444` | `#FEF2F2` (淡红背景) |
| Disabled | `#E5E7EB` | `#F9FAFB`，文字 50% 透明度 |

#### 搜索框 (Search Input)

| 属性 | 值 |
|------|-----|
| 高度 | 44px |
| 圆角 | 22px (全圆角/胶囊形) |
| 背景 | `#F3F4F6` (Light) / `#1F2937` (Dark) |
| 图标 | 左侧 20px 搜索图标 |
| 清除按钮 | 右侧 20px X 图标 |

---

### 5.4 标签 / 徽章 (Tag / Badge / Chip)

#### 胶囊标签 (Pill Tag) — 最常用

| 属性 | 值 |
|------|-----|
| 高度 | 28px |
| 圆角 | 14px (全圆角) |
| 字号 | 12px |
| 字重 | 500 |
| 内边距 | 6px 12px |
| 字间距 | +0.02em |

#### 标签变体

| 变体 | 背景色 | 文字色 | 用途 |
|------|--------|--------|------|
| Default | `#F3F4F6` | `#374151` | 通用标签 |
| Primary | `#EEF2FF` | `#4F46E5` | 品牌标签 |
| Success | `#D1FAE5` | `#059669` | 成功标签 |
| Warning | `#FEF3C7` | `#D97706` | 警告标签 |
| Error | `#FEE2E2` | `#DC2626` | 错误标签 |
| AI / New | `#EDE9FE` | `#7C3AED` | AI工具、新上线 |
| Free | `#CFFAFE` | `#0891B2` | 免费工具 |
| Pro | `#FEF3C7` | `#B45309` | 专业版、付费 |

#### 数字徽章 (Count Badge)

| 属性 | 值 |
|------|-----|
| 尺寸 | 18x18px (最小)，圆形 |
| 字号 | 11px, Bold |
| 背景 | `#EF4444` |
| 文字 | `#FFFFFF` |
| 位置 | 右上角 |

---

### 5.5 导航栏 (Navigation Bar)

| 属性 | 值 |
|------|-----|
| 高度 | 64px (桌面) / 56px (手机) |
| 背景 | `#FFFFFF` / `#0A0A0A` + `backdrop-blur(12px)` |
| 边框 | 底部 `1px solid #E5E7EB` / `#374151` |
| Logo | 左侧，高度 32px |
| 导航链接 | 居中，间距 24px，字号 14px, Medium |
| 操作按钮 | 右侧，间距 16px |

**导航项状态：**

| 状态 | 样式 |
|------|------|
| 默认 | 文字 `#6B7280` |
| 悬浮 | 文字 `#1F2937`，背景 `#F3F4F6` |
| 选中 | 文字 `#6366F1`，底部 2px 指示条 |

---

### 5.6 下拉菜单 (Dropdown / Select)

| 属性 | 值 |
|------|-----|
| 触发器 | 与 Input 样式一致，高度 44px |
| 菜单圆角 | 8px |
| 菜单阴影 | `0 4px 16px rgba(0, 0, 0, 0.12)` |
| 菜单边框 | `1px solid #E5E7EB` / `#374151` |
| 最大高度 | 320px (超出滚动) |

**菜单项：**

| 属性 | 值 |
|------|-----|
| 高度 | 36px |
| 内边距 | 8px 12px |
| 悬浮 | 背景 `#F3F4F6` / `#1F2937` |
| 选中 | 文字 `#6366F1`，背景 `#EEF2FF` / `#1E1E3F` |
| 禁用 | 文字 `#9CA3AF`，cursor: not-allowed |

---

## 6. 布局规范

### 6.1 响应式断点

| 名称 | 宽度范围 | 列数 | Gutter | 页面边距 | 最大宽度 |
|------|---------|------|--------|---------|---------|
| xs (手机) | < 640px | 4 | 12px | 16px | 100% |
| sm (大手机) | 640-767px | 4 | 12px | 20px | 100% |
| md (平板) | 768-1023px | 8 | 16px | 24px | 1024px |
| lg (桌面) | 1024-1279px | 12 | 24px | 32px | 1280px |
| xl (大屏) | ≥ 1280px | 12 | 24px | 32px | 1280px |

### 6.2 容器宽度

```
页面容器:  max-width: 1280px, margin: 0 auto, padding: 0 32px
内容区:     max-width: 960px (适合阅读)
卡片网格:  max-width: 1280px
全宽布局:  width: 100% (Hero、CTA 区块可突破容器)
```

### 6.3 常用布局模式

#### 单栏布局 (Single Column)
```
用于: 文章详情、设置页、表单页
结构: 内容区 max-width: 720px, margin: 0 auto
```

#### 两栏布局 (Two Column)
```
用于: 文档侧边栏、设置页
结构: Sidebar 240px + Content flex:1, max-width: 960px
响应式: < 768px 变为单栏
```

#### 三栏布局 (Three Column)
```
用于: 数据看板、管理后台
结构: Nav 64px + Main flex:1 + Aside 280px
响应式: < 1024px 变为两栏
```

#### 栅格布局 (Grid / Bento)
```
用于: 产品卡片、工具列表
结构: 12列栅格系统，卡片跨 3/4/6 列
间距: 24px (桌面) / 16px (平板)
```

### 6.4 页面结构示例

```
┌─────────────────────────────────────────────────────────┐
│  HEADER: 64px, 粘性定位 (sticky)                         │
├─────────────────────────────────────────────────────────┤
│  HERO: 全宽或 contained, min-height: 480px              │
├─────────────────────────────────────────────────────────┤
│  SECTION: 区块标题 + 内容, 区块间距: 80px (桌面)         │
├─────────────────────────────────────────────────────────┤
│  ... 更多 SECTION ...                                    │
├─────────────────────────────────────────────────────────┤
│  FOOTER: 背景 #F9FAFB, 顶部边框                          │
└─────────────────────────────────────────────────────────┘
```

---

## 7. 图标规范

### 7.1 图标风格

> **选用库**: Lucide Icons 或 Heroicons (均基于 24x24 grid, 2px stroke)
>
> **风格**: 线性图标 (Outline)，线条粗细 1.5-2px，圆角端点

| 风格 | 特点 | 适用场景 |
|------|------|---------|
| Outline (线性) | 2px 描边，无填充 | 默认、现代、Light 模式 |
| Solid (实心) | 填充色块 | 选中态、深色背景、强调 |

### 7.2 图标尺寸

| 尺寸 | 用途 |
|------|------|
| 16px | 标签内图标、内联辅助图标 |
| 20px | 输入框前缀/后缀、表单图标 |
| **24px** | **标准图标尺寸（默认）**、导航栏图标 |
| 32px | 功能性图标（大按钮内）、空状态图标 |
| 48px | 分类图标（工具分类网格） |
| 64px | 品牌 Logo、Hero 区大图标 |

### 7.3 图标颜色

```
默认:      继承父元素文字色 (currentColor)
悬停态:    Primary 色 (#6366F1) 或与文字同色
选中态:    Primary 色 (#6366F1)
禁用态:    50% 透明度
深色背景:  #FFFFFF 或 #9CA3AF（根据对比度选择）
```

### 7.4 图标使用规范

```
✓ 图标尺寸为 24px（标准）和 20px（紧凑场景）
✓ 图标与相邻文字间距 6-8px
✓ 导航图标配合文字标签
✓ 功能图标（如操作按钮）配 tooltip

✗ 不要在一个界面混用多种图标风格
✗ 不要将图标拉伸变形
✗ 不要使用彩色图标表达状态（改用语义色标签）
✗ 一个触控目标内不要放多个图标
```

---

## 8. 动效规范

### 8.1 动画时长

| 场景 | 时长 | 说明 |
|------|------|------|
| 微交互 (Micro) | 150ms | 按钮点击、hover 反馈 |
| UI 元素 | 200ms | 展开/收起、下拉菜单 |
| 页面过渡 | 300ms | 路由切换、Modal |
| 加载/大过渡 | 400-500ms | 页面加载骨架、卡片网格进入 |

### 8.2 缓动曲线

| 曲线名称 | cubic-bezier | 用途 |
|---------|--------------|------|
| ease-out | `cubic-bezier(0.0, 0.0, 0.2, 1)` | 元素进入（减速） |
| ease-in | `cubic-bezier(0.4, 0.0, 1, 1)` | 元素退出（加速） |
| ease-in-out | `cubic-bezier(0.4, 0.0, 0.2, 1)` | 元素状态变化 |

### 8.3 常见动效

| 动效 | 属性 | 时长 | 缓动 |
|------|------|------|------|
| 卡片悬浮 | `transform: translateY(-4px)` | 200ms | ease-out |
| 按钮点击 | `transform: scale(0.98)` | 100ms | ease-in |
| 按钮悬停 | `background-color`, `box-shadow` | 150ms | ease-in-out |
| 菜单展开 | `opacity`, `transform: scaleY` | 200ms | ease-out |
| Modal 进入 | `opacity`, `transform: scale` | 300ms | ease-out |
| Modal 退出 | `opacity`, `transform: scale` | 200ms | ease-in |
| 页面淡入 | `opacity: 0→1` | 300ms | ease-out |
| 骨架屏脉冲 | `opacity: 0.4→0.7` | 1.2s | ease-in-out (repeat) |

### 8.4 动效规则

```
✓ 使用动效引导注意力，而非装饰
✓ 进入用 ease-out，退出用 ease-in
✓ 移动距离越大，动画时间越长
✓ 快速轻量的交互用 150ms

✗ 动画时长不超过 500ms（除骨架屏外）
✗ 不要让动画打断用户操作流程
✗ 不要在同一个元素上同时动画过多属性
✗ 尊重系统「减少动画」设置 (prefers-reduced-motion)
```

---

## 9. 无障碍规范

### 9.1 对比度要求

| 文字类型 | 最小对比度 | 适用场景 |
|---------|-----------|---------|
| 正文文字 | 4.5:1 | 主要内容 |
| 大文字 (>18pt / 14pt Bold) | 3:1 | 标题、按钮文字 |
| UI 组件和图形对象 | 3:1 | 图标、输入框边框 |

### 9.2 触控目标

```
最小触控区域: 44x44px (Apple HIG)
推荐触控区域: 48x48px (Material Design)
图标按钮:     至少 44x44px，视觉可更小但点击区域要大
```

### 9.3 字体缩放

```
✓ 使用相对单位 (rem, em) 而非固定 px
✓ 允许浏览器默认字体缩放（最多 200%）
✓ 测试在 200% 缩放下的布局完整性
```

### 9.4 键盘导航

```
✓ 所有交互元素可通过 Tab 聚焦
✓ 焦点顺序符合视觉顺序
✓ 焦点状态清晰可见 (focus ring: 2px solid #6366F1)
✓ 支持 Escape 关闭弹窗/菜单
✓ 支持 Enter/Space 激活按钮
```

### 9.5 屏幕阅读器支持

```
✓ 所有图片提供 alt 文本
✓ 装饰性图片 alt=""
✓ 表单元素用 <label> 关联
✓ Modal/Dialog 提供 aria-label
✓ 动态内容变化提供 aria-live 通知
```

---

## 附录 A: 设计令牌 (Design Tokens)

### 颜色变量 (CSS Custom Properties)

```css
:root {
  /* Primary */
  --color-primary: #6366F1;
  --color-primary-dark: #4F46E5;
  --color-primary-light: #818CF8;
  --color-primary-subtle: #EEF2FF;

  /* Secondary */
  --color-secondary: #10B981;
  --color-accent: #F59E0B;
  --color-accent-alt: #8B5CF6;

  /* Semantic */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* Text */
  --color-text-primary: #1F2937;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;

  /* Background & Surface */
  --color-bg: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-border: #E5E7EB;
  --color-divider: #F3F4F6;
}

[data-theme="dark"] {
  --color-text-primary: #F9FAFB;
  --color-text-secondary: #9CA3AF;
  --color-text-tertiary: #6B7280;
  --color-bg: #0A0A0A;
  --color-surface: #141414;
  --color-surface-elevated: #1E1E1E;
  --color-border: #374151;
  --color-divider: #1F2937;
  --color-primary: #818CF8;
  --color-primary-dark: #6366F1;
}
```

### 间距变量

```css
:root {
  --space-xs: 4px;
  --space-s: 8px;
  --space-m: 16px;
  --space-l: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
  --space-3xl: 64px;
}
```

### 圆角变量

```css
:root {
  --radius-xs: 4px;
  --radius-s: 6px;
  --radius-m: 8px;
  --radius-l: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
}
```

### 阴影变量

```css
:root {
  --shadow-none: none;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-m: 0 4px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.16);
}
```

### 动效变量

```css
:root {
  --duration-fast: 100ms;
  --duration-micro: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;

  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0.0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

---

## 附录 B: 设计检查清单

### 新页面 / 新组件开发前检查

```
□ 颜色: 是否使用了规范中的色值变量？
□ 字体: 字号/字重是否符合层级规范？
□ 间距: 是否基于 8px 网格？
□ 圆角: 圆角值是否来自规范？
□ 阴影: 阴影是否来自规范？
□ 动效: 时长和缓动是否合规？
□ 触控: 触控区域是否 ≥ 44x44px？
□ 对比度: 文字对比度是否 ≥ 4.5:1？
□ 暗黑模式: 深色模式下是否正常显示？
□ 响应式: 各断点下是否正常显示？
□ 无障碍: Tab 焦点、aria-label 是否完整？
□ 图标: 是否使用规范中的图标库和尺寸？
□ 状态: Default/Hover/Active/Disabled/Focus 状态是否齐全？
```

### 设计评审 (Design Review) 检查点

```
1. 一致性: 新设计与现有规范是否一致？
2. 边界情况: 空状态、加载状态、长文本是否处理？
3. 极端情况: 最长文本、最大数量是否溢出？
4. 平台差异: iOS / Android / Web 是否有平台适配？
5. 浏览器兼容: 目标浏览器是否支持所需 CSS？
```
