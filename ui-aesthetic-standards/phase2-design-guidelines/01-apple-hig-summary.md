# Phase 2: 设计规范核心要点速查表

## Apple Human Interface Guidelines (HIG) 核心要点

### 设计原则 (Design Principles)

#### 1. 清晰 (Clarity)
- 内容是核心, UI为内容服务
- 文字可读性最重要, 使用适当字号和对比度
- 图标和图像清晰、有意义、表达一致
- 留白让重要内容更突出

#### 2. 尊重 (Deference)
- UI不应与内容竞争
- 流畅的交互体验, 无干扰
- 使用半透明和模糊背景(blur effects)
- 边框和分隔线要微妙

#### 3. 深度 (Depth)
- 视觉层次清晰, 用户能感知页面层级
- 过渡动画提供空间感
- 可交互元素有触感反馈
- 导航有明显的视觉路径

---

### 配色系统 (Color)

#### 系统色 (System Colors)
```
iOS System Colors:
- Blue:      #007AFF (主要操作)
- Green:     #34C759 (成功/确认)
- Orange:    #FF9500 (警告)
- Red:       #FF3B30 (错误/删除)
- Gray:      #8E8E93 (次要内容)
- Purple:    #AF52DE (特殊功能)
```

#### 语义色 (Semantic Colors)
- **Primary**: 主要品牌色
- **Secondary**: 次要品牌色
- **Background**: 背景色(浅色/深色模式)
- **GroupedBackground**: 分组背景
- **Label**: 文字色(自动适配对比度)
- **Separator**: 分隔线(低透明度)

#### 配色建议
- 避免纯黑色(#000000), 用深灰替代
- 保持足够对比度(WCAG AA: 4.5:1文字, 3:1大文字)
- 深色模式使用柔和白色(不是纯白)
- 强调色用于可交互元素

---

### 字体层级 (Typography)

#### SF Pro 字体系统
```
Display:      34pt+, Bold
Large Title:  34pt, Bold
Title 1:      28pt, Bold
Title 2:      22pt, Bold
Title 3:      20pt, Semibold
Headline:     17pt, Semibold
Body:         17pt, Regular
Callout:      16pt, Regular
Subhead:      15pt, Regular
Footnote:     13pt, Regular
Caption 1:    12pt, Regular
Caption 2:    11pt, Regular
```

#### 排版原则
- 使用动态类型(Dynamic Type)支持无障碍
- 标题与正文字号差至少4pt
- 行高: 正文1.4-1.6, 标题1.0-1.2
- 字间距: 标题略紧凑(-0.5到-1), 正文正常
- 避免全大写标题(除少数例外)

---

### 间距规范 (Spacing)

#### 基础间距单位
```
4pt Grid System:
- XS:  4pt   (最小间距)
- S:   8pt   (元素内部间距)
- M:   16pt  (标准间距)
- L:   24pt  (组件间距)
- XL:  32pt  (区块间距)
- XXL: 48pt  (大幅间距)
```

#### 标准布局间距
```
页面边距:     16pt (手机) / 24pt (平板) / 32pt (桌面)
卡片内边距:   16pt
列表项高度:   44pt (最小触控目标)
导航栏高度:   44pt (手机) / 64pt (桌面)
标签栏高度:   49pt (手机) / 65pt (带文字)
```

---

### 组件设计原则 (Components)

#### 按钮 (Buttons)
- **Primary**: 实心填充, 圆角8pt, 品牌主色
- **Secondary**: 边框样式, 圆角8pt
- **Text**: 无边框无背景, 仅文字
- 触控区域最小44x44pt
- 按钮间间距至少8pt

#### 卡片 (Cards)
- 圆角12-16pt
- 轻微阴影: 0 2px 8px rgba(0,0,0,0.1)
- 内边距16pt
- 可选轻微背景色区分

#### 输入框 (Text Fields)
- 高度44pt
- 圆角8pt
- 边框1pt #E5E5E5
- 聚焦时边框变品牌色
- 占位符文字用灰色

#### 导航 (Navigation)
- 底部标签栏用于主要导航(3-5个)
- 导航栏用于当前视图上下文
- 面包屑用于深层导航

---

### 动画原则 (Motion)

#### 动画目的
1. **提供反馈**: 点击/交互的视觉确认
2. **引导注意**: 指向重要变化
3. **表达空间关系**: 帮助理解层级

#### 动画特性
- **Duration**: 快速(0.2s)用于小交互, 标准(0.3s)用于页面转换
- **Easing**: 使用系统默认曲线
  - 系统默认: ease-in-out
  - 进入: ease-out (减速感)
  - 退出: ease-in (加速感)
- **避免**: 过长动画, 闪烁, 过多运动

---

### 无障碍 (Accessibility)

#### 核心要求
- 支持Dynamic Type(字体缩放)
- 最小对比度4.5:1(正文), 3:1(大文字)
- 支持VoiceOver/TalkBack
- 触控目标最小44x44pt
- 避免仅靠颜色传达信息

#### 颜色使用
- 总是提供非颜色提示(图标/文字/图案)
- 测试深色模式和增强对比度模式
