# 设计规范对比速查表

## Apple HIG vs Google Material Design 对比

| 维度 | Apple HIG | Material Design |
|------|-----------|-----------------|
| **设计哲学** | 清晰、尊重、深度 | Material是隐喻、大胆图形、有意动效 |
| **字体** | SF Pro (系统) | Roboto / Google Sans |
| **网格基础** | 4pt | 8dp |
| **按钮圆角** | 8pt | 4dp (contained), 无(flat) |
| **卡片圆角** | 12-16pt | 8dp (MD2), 可变(MD3) |
| **触摸目标** | 44x44pt | 48x48dp |
| **阴影** | 微妙, 柔和 | 更明显, 多层阴影 |
| **动效时长** | 0.2-0.3s | 75ms-500ms |
| **配色** | 系统色(蓝绿橙红灰紫) | Primary/Secondary/Background |
| **导航模式** | Tab Bar + Navigation Bar | Bottom Navigation + App Bar |

---

## 核心要点速查表

### 配色系统
| 用途 | Apple HIG | Material Design |
|------|------------|-----------------|
| 主要操作 | Blue #007AFF | Primary #6200EE |
| 成功 | Green #34C759 | Green #03DAC6 |
| 警告 | Orange #FF9500 | Amber |
| 错误 | Red #FF3B30 | Error #B00020 |
| 次要文字 | Gray #8E8E93 | On Surface 60% |

### 间距规范
```
Apple HIG:
- 页面边距: 16pt (手机) / 24pt (平板) / 32pt (桌面)
- 组件间距: 16pt / 24pt / 32pt / 48pt
- 触控区域: 44x44pt

Material Design:
- 页面边距: 16dp
- 组件间距: 8dp / 16dp / 24dp / 32dp / 48dp / 64dp
- 触控区域: 48x48dp
```

### 字体层级
```
Apple HIG:
- Display: 34pt+
- Large Title: 34pt Bold
- Title 1: 28pt Bold
- Body: 17pt Regular
- Caption: 12pt Regular

Material Design:
- H1: 96sp Light
- H4: 34sp Regular
- Subtitle1: 16sp Regular
- Body1: 16sp Regular
- Caption: 12sp Regular
```

### 组件尺寸
```
Buttons:
- Apple: 高度44pt, 圆角8pt
- MD: 高度36dp, 圆角4dp

Cards:
- Apple: 圆角12-16pt, 轻微阴影
- MD: 圆角8dp, Elevation 2dp

Lists:
- Apple: 高度44-88pt
- MD: 高度48dp

App Bar:
- Apple: 44pt (手机) / 64pt (桌面)
- MD: 56dp (手机) / 64dp (桌面)

Bottom Nav:
- Apple: 49pt
- MD: 56dp
```

---

## 通用设计原则

### 1. 一致性 (Consistency)
- 同类元素使用相同样式
- 交互行为保持一致
- 遵循平台惯例

### 2. 层级 (Hierarchy)
- 最重要的内容最大最醒目
- 使用颜色、大小、位置区分层级
- 避免同级元素大小相同

### 3. 对比 (Contrast)
- 正文: 4.5:1 最小
- 大文字: 3:1 最小
- 触控目标: 3:1 最小
- 背景与文字: 确保可读性

### 4. 留白 (Whitespace)
- 相关元素靠近
- 不相关元素分隔
- 留白不是浪费,是呼吸

### 5. 对齐 (Alignment)
- 使用网格系统
- 元素与参考线对齐
- 文本边缘对齐

### 6. 可重复性 (Repetition)
- 复用设计模式
- 建立组件库
- 保持视觉语言一致

---

## 常用设计模式

### 栅格系统 (Grid)
```
桌面: 12列, 24px gutter, 80px margin
平板: 8列, 24px gutter, 32px margin
手机: 4列, 16px gutter, 16px margin
```

### 容器宽度
```
窄内容: 640px
中等内容: 800px
宽内容: 1200px
全宽: 100%
```

### 内边距规律
```
小元素(按钮内): 8-12px 水平, 4-8px 垂直
卡片/组件: 16px
区块/章节: 24-48px
页面级: 16-32px
```
