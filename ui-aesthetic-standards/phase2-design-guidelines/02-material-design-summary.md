# Google Material Design 核心要点

## 设计原则 (Design Principles)

### 1. Material是隐喻 (Material is the metaphor)
- 虚拟纸张和墨水的数字化表达
- 表面和阴影传达空间层次
- 运动传达意图和关系

### 2. 大胆、图形、有意 (Bold, Graphic, Intentional)
- 印刷设计方法(网格、间距、颜色)
- 使用主色调和副色调创造层次
- 图像作为主要表达工具
- 嵌入式品牌元素

### 3. 动效提供意义 (Motion provides meaning)
- 元素之间的连接关系
- 过渡引导注意力
- 动画有目的,不装饰性

---

## 配色系统 (Color System)

### Material Color Palette
```
Primary Colors:
- 50-50:   最浅
- 100-500: 浅到主色
- 500:     主色/品牌色
- 700-900: 深色变体

语义色:
- Primary:    主品牌色 (500)
- Primary Variant: 深色 (700)
- Secondary:  辅助强调色 (通常是accent)
- Secondary Variant: 深色
- Background: 页面背景
- Surface:    卡片/面板背景
- Error:      错误红 #B00020
- On Primary: 主色上的文字(白/黑)
- On Secondary: 辅助色上的文字
- On Background: 背景上的文字
- On Surface:  表面上的文字
```

### Material 颜色示例 (Indigo/Pink)
```
Primary:        #6200EE
Primary Dark:   #3700B3
Secondary:      #03DAC6
Background:     #FFFFFF
Surface:        #FFFFFF
Error:          #B00020
On Primary:     #FFFFFF
On Secondary:   #000000
```

### 配色规则
- 主色占UI的30%
- 次要色占UI的10%
- 背景/表面用中性色
- 确保4.5:1对比度(正文), 3:1(大文字)
- 深色模式使用更亮的强调色

---

## 字体层级 (Typography)

### Roboto 字体系统
```
Font Family: Roboto (Latin), Noto (其他语言)

Styles:
- H1:  96sp, Light (-1.5 letter spacing)
- H2:  60sp, Light
- H3:  48sp, Regular
- H4:  34sp, Regular
- H5:  24sp, Regular
- H6:  20sp, Medium (500 weight)
- Subtitle1: 16sp, Regular
- Subtitle2: 14sp, Medium
- Body1: 16sp, Regular (主要正文)
- Body2: 14sp, Regular (次要正文)
- Button: 14sp, Medium (ALL CAPS, +1.25 letter spacing)
- Caption: 12sp, Regular
- Overline: 10sp, Regular (ALL CAPS, +1.5 letter spacing)
```

### 排版规则
- 使用sp单位(可缩放像素), 匹配系统字体设置
- 正文行高: 24sp (150%)
- 标题行高: 32sp (紧凑)
- 最大行宽: 65字符
- 标题使用Medium(500)或Bold(700)

---

## 间距系统 (Spacing)

### 8dp 网格系统
```
Base Unit: 8dp

Spacing Scale:
- 0dp:    无间距
- 4dp:    XS/极小间距
- 8dp:    S/小间距
- 16dp:   M/标准间距
- 24dp:   L/大间距
- 32dp:   XL/组件间距
- 48dp:   XXL/区块间距
- 64dp:   XXXL/大幅间距
```

### 组件间距
```
页面边距:         16dp (手机)
卡片内边距:       16dp
列表项高度:       48dp (最小)
触摸目标:         48x48dp (最小)
图标尺寸:         24dp (标准), 48dp (加大)
FAB尺寸:          56dp (标准), 40dp (迷你)
App Bar高度:      56dp (手机), 64dp (桌面)
Bottom Navigation: 56dp
Cards:            8dp 圆角
Buttons:          4dp 圆角 或 圆形(文字按钮)
Dialogs:          24dp 圆角
```

### 网格系统
```
栅格(Grid):
- 列数: 12列
- Gutter: 16dp (手机), 24dp (桌面)
- Margin: 16dp (手机)
- 总宽度: 360dp - 840dp (自适应)
```

---

## 组件设计 (Components)

### 按钮 (Buttons)

#### Contained Button (实心按钮)
```
背景: Primary色
文字: On Primary色
高度: 36dp
圆角: 4dp
Padding: 16dp水平
Typography: BUTTON样式
用途: 主要操作
```

#### Outlined Button (边框按钮)
```
背景: 透明
边框: 1.5dp Primary色
文字: Primary色
高度: 36dp
圆角: 4dp
用途: 次要操作
```

#### Text Button (文字按钮)
```
无背景, 无边框
文字: Primary色 或 Secondary色
Padding: 8dp水平
用途: 最低优先级操作
```

### 卡片 (Cards)
```
背景: Surface色
圆角: 8dp
阴影: Elevation 2dp (0 2px 4px rgba(0,0,0,0.2))
内边距: 16dp
可中断内容使用分隔线
状态: Rest / Pressed(阴影变2dp) / Focused(Outline)
```

### 应用栏 (App Bar)
```
高度: 56dp (手机), 64dp (桌面)
背景: Surface色
左侧: Back箭头 或 菜单图标
中央: 标题(可选)
右侧: 操作图标(24dp)
Elevation: 4dp (可滚动时显示)
```

### 底部导航 (Bottom Navigation)
```
高度: 56dp
图标尺寸: 24dp
标签: 12sp
项目数: 3-5个
选中项: Primary色 + 粗体
未选中: On Surface色
背景: Surface色
Elevation: 8dp
```

### 对话框 (Dialogs)
```
圆角: 28dp
背景: Surface色
Padding: 24dp
标题: 20sp Medium
正文: 16sp Regular
按钮对齐: 右对齐 或 堆叠(3个以上)
Elevation: 24dp
遮罩: 32% 黑色
```

---

## Elevation & Shadows (阴影层级)

### Elevation Values
```
- 0dp:  平面表面
- 1dp:  卡片静止
- 2dp:  卡片按下 / 卡片hover
- 4dp:  App Bar
- 6dp:  FAB静止
- 8dp:  菜单 / Bottom Navigation
- 12dp: 对话框
- 16dp: 导航抽屉
- 24dp: Modal对话框
```

### 阴影表达式
```
1dp:  0 1px 2px rgba(0,0,0,0.12)
2dp:  0 1px 4px rgba(0,0,0,0.14), 0 1px 2px rgba(0,0,0,0.12)
4dp:  0 2px 4px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.14)
6dp:  0 3px 6px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.14)
8dp:  0 4px 8px rgba(0,0,0,0.20), 0 2px 4px rgba(0,0,0,0.14)
12dp: 0 6px 12px rgba(0,0,0,0.22), 0 4px 6px rgba(0,0,0,0.16)
16dp: 0 8px 16px rgba(0,0,0,0.24), 0 4px 8px rgba(0,0,0,0.18)
24dp: 0 12px 24px rgba(0,0,0,0.28), 0 6px 12px rgba(0,0,0,0.20)
```

---

## 动效 (Motion)

### 动画原则
1. **自然**: 使用真实物理(重力、加速)
2. **有意**: 动画传达信息
3. **清晰**: 元素运动有明确开始和结束

### 标准时长
```
- 最短:  75ms (微交互)
- 短:    150ms (快速反馈)
- 标准:  200ms (标准UI)
- 长:    300ms (复杂过渡)
- 最长:  500ms (页面级)
```

### 缓动曲线
```
- Easing Standard: cubic-bezier(0.4, 0.0, 0.2, 1) [进入/退出]
- Easing Decelerated: cubic-bezier(0.0, 0.0, 0.2, 1) [进入]
- Easing Accelerated: cubic-bezier(0.4, 0.0, 1, 1) [退出]
- Easing Sharp: cubic-bezier(0.4, 0.0, 0.6, 1) [同时进出]
```

### 模式
- **Container transform**: 卡片展开为详情页
- **Shared element**: 列表项展开为详情
- **Fade through**: Tab切换内容
- **Fade in/out**: Modal/Toast

---

## Material Design 3 (Material You)

### 新增特性
1. **Dynamic Color**: 从壁纸提取配色
2. **Tonal Palette**: 基于色相/色度/不透明度
3. **新Elevation**: 基于色调而非阴影
4. **新组件**: 新Button, FAB, Cards, Chips

### 配色方式
```
Surface + On Surface: 替代Background/Primary
Surface Variant: 容器背景
Outline/Outline Variant: 边框
```

### 圆角系统
```
Extra Small: 4dp
Small: 8dp
Medium: 12dp
Large: 16dp
Extra Large: 28dp
Full: 圆形
```
