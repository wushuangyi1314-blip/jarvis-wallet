# UI审美标准体系 - 项目概览

## 📁 项目结构

```
ui-aesthetic-standards/
├── README.md                          # 本文件 - 项目概览
├── phase1-website-reference/          # 阶段1产出物
│   ├── 01-social-media-analysis.md    # 社交媒体分析
│   └── [screenshots/]                 # 网站截图库
├── phase2-design-guidelines/           # 阶段2产出物
│   ├── 01-apple-hig-summary.md        # Apple HIG核心要点
│   ├── 02-material-design-summary.md  # Material Design核心要点
│   └── 03-comparison-quickref.md      # 规范对比速查表
├── phase3-style-recommendations/       # 阶段3产出物
│   └── 01-ai-tools-review-site-style.md  # AI工具评测网站风格建议
└── screenshots/                        # 截图库
    ├── anthropic.png
    ├── apple-store.png
    ├── canva.png
    ├── cursor.png
    ├── figma.png
    ├── linear.png
    ├── linkedin.png
    ├── midjourney.png
    ├── notion.png
    ├── openai.png
    └── shopify-store.png
```

---

## 📊 各阶段产出物汇总

### 阶段1: 参考网站截图库 + 分析报告

**截图统计**: 11个网站截图成功收集

| 类别 | 网站 | 状态 |
|------|------|------|
| 社交媒体 | LinkedIn | ✅ |
| SaaS工具 | Notion, Figma, Linear, Canva | ✅ |
| 电商 | Shopify, Apple Store | ✅ |
| AI产品 | OpenAI, Anthropic, Midjourney, Cursor | ✅ |

**分析内容**:
- 配色系统 (色值/色板)
- 布局结构 (网格/层级)
- 字体系统 (字号/字重)
- 间距规范 (留白/边距)
- 卡片设计 (圆角/阴影)
- 总体风格定位

---

### 阶段2: 设计规范核心要点速查表

**Apple HIG**:
- 三大设计原则 (清晰/尊重/深度)
- 配色系统 (系统色/语义色)
- SF Pro字体层级 (11级)
- 4pt网格间距系统
- 组件设计规范 (按钮/卡片/导航)
- 动效原则

**Material Design**:
- 三大设计原则
- Material配色板 (Primary/Secondary)
- Roboto字体层级
- 8dp网格系统
- 组件设计规范
- Elevation阴影层级
- Material 3新特性

**对比速查表**:
- HIG vs MD 核心差异
- 通用设计原则
- 常用设计模式

---

### 阶段3: AI工具评测网站风格建议

**风格定位**: "学术现代极简"
- 结合Anthropic学术感 + Linear开发者美学

**参考网站**:
1. Anthropic - 整体感觉参考
2. Linear - 极简风格参考
3. Figma - 品牌色和展示方式参考
4. Apple Store - Bento Box卡片布局参考

**配色方案**: "Deep Tech"
- Primary: #6366F1 (Indigo)
- Secondary: #10B981 (绿色)
- Light背景: #FAFAFA
- Dark背景: #0A0A0A

**布局方案**:
- 清晰层级: Header → Hero → Featured → Categories → Grid
- Bento Box工具卡片网格
- 响应式断点设计

**字体方案**:
- Inter (正文/UI)
- 可选Source Serif (大标题)

**组件规范**:
- 卡片: 16px圆角, 微妙阴影
- 按钮: 8px圆角, 44px高度
- 标签: 14px全圆角胶囊
- 导航: 64px高度, 半透明模糊

---

## 🎯 核心设计原则总结

### 从参考网站提炼的共同模式
1. 极致留白
2. 有限配色 (1-2主色)
3. 粗体标题 (48-84px)
4. 微妙阴影/圆角
5. 产品截图作为英雄图

### 从规范学习提炼的关键点
1. **Apple HIG**: 44pt触控目标, 4pt网格, SF Pro字体
2. **Material**: 48dp触控目标, 8dp网格, Roboto字体
3. **通用**: 4.5:1对比度, 一致性, 层级清晰

### AI工具评测网站特殊考量
- 专业/权威感 (学术气质)
- 高效信息展示 (工具对比)
- 现代技术感 (Indigo/深色主题)
- 清晰的评分系统
- 快速筛选体验

---

## 📋 设计检查清单

### 配色
- [ ] 主色定义 (Primary)
- [ ] 辅助色定义 (Secondary/Accent)
- [ ] 文字色层级 (Primary/Secondary/Caption)
- [ ] 语义色 (成功/警告/错误)
- [ ] 浅色/深色模式适配

### 字体
- [ ] 字体族选择
- [ ] 字号层级定义
- [ ] 字重使用规范
- [ ] 行高设置

### 间距
- [ ] 基础网格单位
- [ ] 页面边距
- [ ] 组件间距
- [ ] 响应式断点

### 组件
- [ ] 按钮样式
- [ ] 卡片设计
- [ ] 输入框
- [ ] 导航栏
- [ ] 标签/胶囊
- [ ] 评分组件

### 动效
- [ ] 时长规范
- [ ] 缓动曲线
- [ ] 交互反馈

### 无障碍
- [ ] 对比度检查
- [ ] 触控目标尺寸
- [ ] 字体缩放支持
