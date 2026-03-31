# 设计规范深度学习笔记
> Apple HIG + Material Design 3 核心要点

---

## Apple Human Interface Guidelines

### 访问
https://developer.apple.com/design/human-interface-guidelines/

### 核心原则

#### 1. 清晰 (Clarity)
- 内容是核心，装饰服务于功能
- 清晰的字体层级和信息层次
- 足够的信息密度，避免过度留白或过度拥挤
- 使用系统字体 (SF Pro)

**实践要点**:
- 正文字号 ≥ 17pt (iOS)
- 标题使用粗体或半粗体
- 颜色对比度符合 WCAG AA
- 避免纯装饰性元素

#### 2. 尊重 (Deference)
- 界面帮助用户理解内容，不分散注意力
- 轻柔的视觉提示，不过度强调
- 内容区域最大化，控制区最小化
- 支持手势操作，减少物理按钮

**实践要点**:
- 深色模式提供沉浸体验
- 半透明效果暗示层级
- 导航系统直观易用
- 减少不必要的弹窗

#### 3. 深度 (Depth)
- 清晰的视觉层级和导航路径
- 有意义的转场动画
- 触摸反馈及时响应
- 支持多任务处理

**实践要点**:
- 使用导航栏/标签栏/手势组合
- 动效揭示内容关系
- Haptic feedback 增强交互
- 支持拖拽、分屏等功能

---

### iOS 设计要点

#### 布局
```
安全区域:
- 顶部: 状态栏 (44pt) + 导航栏 (44pt)
- 底部: Home指示器 (34pt) + 标签栏 (49pt)
- 刘海屏: 内容从 59pt 开始

边距:
- 小组件: 16pt
- 大组件: 20pt
- 全宽按钮: 16pt 边距
```

#### 颜色
```
语义色:
- 系统蓝: #007AFF (链接、交互)
- 系统绿: #34C759 (成功)
- 系统红: #FF3B30 (错误、删除)
- 系统橙: #FF9500 (警告)
- 系统黄: #FFCC00 (注意)

深色模式:
- 背景: #000000 (纯黑)
- 卡片: #1C1C1E
- 分割线: #38383A
```

#### 字体 (SF Pro)
```
标题:
- 大标题: 34pt Bold
- 标题1: 28pt Bold
- 标题2: 22pt Bold
- 标题3: 20pt Semibold

正文:
- 正文: 17pt Regular
- 副标题: 15pt Regular
- 注释: 13pt Regular
- 标注: 12pt Regular
```

#### 组件
```
按钮:
- 主按钮: 圆角 10pt, 高度 50pt
- 次按钮: 透明背景, 蓝色文字
- 图标按钮: 44x44pt (触摸目标)

输入框:
- 圆角 10pt
- 内边距 12pt
- 搜索框带图标

卡片:
- 圆角 12pt
- 阴影轻微
- 内边距 16pt
```

#### 动效
```
时长:
- 微交互: 100ms
- 组件: 200ms
- 页面: 350ms

缓动:
- 展开: ease-out
- 收回: ease-in
- 交互动画: spring

原则:
- 有目的性 - 传达层级关系
- 及时响应 - < 100ms
- 可中断 - 支持手势打断
```

---

## Google Material Design 3

### 访问
https://m3.material.io/

### 核心原则

#### 1. Material隐喻
- 基于物理世界的材质感
- 柔和阴影暗示高度
- 表面可折叠、卷曲
- 支持光影动态效果

**实践要点**:
- Elevation (阴影层级)
- Surface Tint (表面色调)
- 组件悬浮效果
- 纸张/布料材质暗示

#### 2. 大胆图形设计
- 更大胆的配色
- 更明确的 Typography
- 更大的圆角
- 突出的品牌元素

**实践要点**:
- 主色调更鲜艳
- 标题字号增大
- 圆角半径增大
- 强调色大胆使用

#### 3. 有意动效
- 动效传达意义
- 基于物理的动画
- 响应用户输入
- 减少过渡时间

**实践要点**:
- Motion tokens 标准化
- Stateful 交互反馈
- 滚动联动效果
- 可访问的动效选项

---

### Material Design 3 核心系统

#### Design Tokens

```css
/* 颜色 Token */
--md-sys-color-primary: #6750A4;
--md-sys-color-on-primary: #FFFFFF;
--md-sys-color-primary-container: #EADDFF;
--md-sys-color-secondary: #625B71;
--md-sys-color-surface: #FFFBFE;
--md-sys-color-surface-variant: #E7E0EC;
--md-sys-color-outline: #79747E;
--md-sys-color-error: #B3261E;

/* 圆角 Token */
--md-sys-shape-corner-small: 8dp;
--md-sys-shape-corner-medium: 12dp;
--md-sys-shape-corner-large: 16dp;
--md-sys-shape-corner-extra-large: 28dp;

/* 阴影 Token */
--md-sys-elevation-1: 1dp;
--md-sys-elevation-2: 3dp;
--md-sys-elevation-3: 6dp;
--md-sys-elevation-4: 8dp;
--md-sys-elevation-5: 12dp;
```

#### Typography Scale

```
Display:
- Display Large: 57sp / -0.25 letter-spacing
- Display Medium: 45sp / 0
- Display Small: 36sp / 0

Headline:
- Headline Large: 32sp / 0
- Headline Medium: 28sp / 0
- Headline Small: 24sp / 0

Title:
- Title Large: 22sp / 0
- Title Medium: 16sp / 0.15 letter-spacing / Medium weight
- Title Small: 14sp / 0.1 letter-spacing / Medium weight

Body:
- Body Large: 16sp / 0.5 letter-spacing
- Body Medium: 14sp / 0.25 letter-spacing
- Body Small: 11sp / 0.4 letter-spacing

Label:
- Label Large: 14sp / 0.1 letter-spacing / Medium weight
- Label Medium: 12sp / 0.5 letter-spacing / Medium weight
- Label Small: 11sp / 0.5 letter-spacing / Medium weight
```

#### 间距系统 (8dp网格)

```
间距阶梯:
- 0dp: 0
- 4dp: 0.25
- 8dp: 0.5
- 12dp: 0.75
- 16dp: 1
- 24dp: 1.5
- 32dp: 2
- 48dp: 3
- 64dp: 4
- 96dp: 6
- 128dp: 8

组件间距:
- 紧密: 4dp
- 舒适: 8dp
- 标准: 16dp
- 宽松: 24dp
- 超宽: 32dp+
```

#### Elevation 系统

```
Level 0: 0dp - 平面
Level 1: 1dp - 表面
Level 2: 3dp - 提升卡片
Level 3: 6dp - FAB待按
Level 4: 8dp - 导航栏
Level 5: 12dp - 对话框
```

#### 组件规范

**Filled Button**:
```
高度: 40dp
圆角: 20dp (full rounded) 或 12dp (medium)
内边距: 24dp horizontal
字重: Medium
字间距: 0.1
```

**Outlined Button**:
```
高度: 40dp
边框: 1dp
圆角: 20dp
边框色: Outline color
```

**Card**:
```
圆角: 12dp (medium) 或 16dp (large)
内边距: 16dp
阴影: Elevation 1
悬停: Elevation 2
```

**Text Field**:
```
高度: 56dp
圆角: 4dp (top only)
边框: 1dp (未聚焦) / 2dp (聚焦)
标签: 12sp (聚焦时缩小)
```

#### 动效规范

```
时长:
- Short 1: 50ms
- Short 2: 100ms
- Short 3: 150ms
- Medium 1: 200ms
- Medium 2: 250ms
- Medium 3: 300ms
- Long 1: 350ms
- Long 2: 400ms
- Long 3: 450ms
- Extra Long: 500ms

缓动:
- Standard: cubic-bezier(0.2, 0, 0, 1)
- Emphasized: cubic-bezier(0.2, 0, 0, 1)
- Decelerated: cubic-bezier(0, 0, 0, 1)
- Accelerated: cubic-bezier(0.3, 0, 1, 1)
```

---

## 两套规范对比

### 相似点

| 方面 | Apple HIG | Material Design 3 |
|------|-----------|-------------------|
| 核心理念 | 清晰、尊重、深度 | Material隐喻、大胆、有意动效 |
| 字体 | 系统字体优先 | 系统字体优先 |
| 间距 | 8pt 网格 | 8dp 网格 |
| 动效 | 流畅、响应快 | 基于物理、标准化 |
| 无障碍 | VoiceOver支持 | Accessibility支持 |

### 差异点

| 方面 | Apple HIG | Material Design 3 |
|------|-----------|-------------------|
| 风格 | 精致、轻盈 | 大胆、现代 |
| 圆角 | 中等 (10-12pt) | 较大 (12-28dp) |
| 阴影 | 柔和、微妙 | 明确的Elevation |
| 色彩 | 柔和的系统色 | 鲜艳的强调色 |
| 深色模式 | 纯黑背景 | 深灰背景 |

---

## 融合应用建议

### 选择策略

**Apple风格适合**:
- 高端、专业产品
- 苹果生态应用
- 需要精致感的设计

**Material风格适合**:
- 跨平台应用
- 需要明确视觉层级
- 品牌色突出的产品

### 融合原则

1. **保持一致** - 选择一套主要遵循
2. **场景适配** - 不同平台可用不同风格
3. **核心统一** - 颜色/字体/间距保持一致
4. **动效克制** - 避免过度动画

---

*本文档为学习笔记，实际设计请参考官方规范*
