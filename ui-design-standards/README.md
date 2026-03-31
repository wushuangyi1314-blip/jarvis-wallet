# UI设计标准体系 📐

> 为UI Agent建立的设计标准参考库 | 基于Apple HIG + Material Design

---

## 📁 文件结构

```
ui-design-standards/
├── UI-DESIGN-STANDARDS.md    # 核心设计标准文档
├── UI-DESIGN-TOKENS.json     # 设计令牌 (Design Tokens)
├── README.md                  # 本文件
├── QUICK-REFERENCE.md         # 速查手册
└── references/
    └── WEBSITE-REFERENCES.md # 优秀网站参考库
```

---

## 🎯 设计原则

### 四大核心原则

| 原则 | 说明 | 应用场景 |
|------|------|----------|
| **清晰 (Clarity)** | 内容优先，界面元素服务于功能 | 所有界面 |
| **一致性 (Consistency)** | 相似功能使用相似设计模式 | 组件设计 |
| **层次 (Hierarchy)** | 通过视觉权重传达信息优先级 | 布局排版 |
| **克制 (Restraint)** | 只添加必要的元素 | 减法设计 |

---

## 🎨 设计系统概览

### 色彩体系
- **主色**: #2563EB (蓝色 - 信任、科技)
- **辅助色**: #7C3AED (紫色 - 创意、高端)
- **语义色**: 成功/警告/错误/信息

### 字体系统
- **字号层级**: H1(48px) → H4(16px) → Body(16px) → Caption(12px)
- **字体栈**: PingFang SC → Microsoft YaHei → Helvetica Neue

### 间距系统
- **网格**: 8px基础单位
- **间距阶梯**: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

### 动效系统
- **时长**: 100ms(微交互) → 300ms(组件) → 400ms(页面)
- **缓动**: cubic-bezier(0.4, 0, 0.2, 1)

---

## 📖 文档说明

### UI-DESIGN-STANDARDS.md
完整的设计标准文档，包含：
- 设计原则
- 色彩规范
- 字体规范
- 间距规范
- 组件规范
- 动效规范
- 图标规范
- 布局规范
- 响应式设计
- 无障碍设计

### UI-DESIGN-TOKENS.json
设计令牌的JSON格式，便于程序化使用：
- 颜色token
- 字体token
- 间距token
- 阴影token
- 动效token
- 断点token

### QUICK-REFERENCE.md
速查手册，适合快速查阅：
- 常用数值速查
- 组件样式速查
- 设计检查清单

### WEBSITE-REFERENCES.md
优秀网站参考库，包含：
- 25+ 优秀网站分析
- 色彩/字体/布局/动效分析
- 可复用模式提取
- 学习资源链接

---

## 🚀 使用指南

### 设计前
1. 阅读 `UI-DESIGN-STANDARDS.md` 了解设计原则
2. 查阅 `QUICK-REFERENCE.md` 获取具体数值
3. 参考 `WEBSITE-REFERENCES.md` 寻找灵感

### 设计中
1. 使用 `UI-DESIGN-TOKENS.json` 确保一致性
2. 参考组件规范确保风格统一
3. 对照检查清单进行自检

### 设计后
1. 对比标准检查一致性
2. 参考网站库检验专业度
3. 更新文档沉淀经验

---

## 📚 学习资源

### 设计规范
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design 3](https://m3.material.io/)
- [Figma Design Systems](https://design-systems.vercel.app/)

### 设计灵感
- [Mobbin](https://mobbin.com) - 最新UI界面参考
- [Dribbble](https://dribbble.com) - 设计师作品展示
- [Awwwards](https://awwwards.com) - 优秀网页设计

### 工具
- [Coolors](https://coolors.co) - 配色方案生成
- [Contrast Checker](https://contrast-checker.com) - 对比度检查
- [Figma](https://figma.com) - UI设计工具

---

## 🔄 版本历史

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 1.0 | 2026-03-30 | 初始版本，建立完整设计标准体系 |

---

*本文档将持续更新完善*
