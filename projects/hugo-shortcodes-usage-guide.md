# Hugo Shortcodes 使用指南

> 适用角色：运营 Agent、RD Agent  
> 创建日期：2026-03-31

---

## 一、Shortcodes 是什么？

Shortcodes 是 Hugo 提供的简写语法，让运营在编写文章时，可以用简单标记快速生成复杂样式的内容。

**类比：** 类似 Notion 的 Block 语法，但最终会渲染成漂亮的 HTML。

---

## 二、7 个核心 Shortcodes

| 名称 | 用途 | 使用频率 |
|---|---|---|
| `tool_card` | 工具信息卡片 | ⭐⭐⭐ |
| `comparison` | 对比表格 | ⭐⭐⭐ |
| `pros_cons` | 优缺点 | ⭐⭐ |
| `rating` | 星级评分 | ⭐⭐ |
| `feature_list` | 特性列表 | ⭐⭐ |
| `cta` | 行动召唤按钮 | ⭐ |
| `tag` | 标签徽章 | ⭐ |

---

## 三、详细用法

### 1. tool_card — 工具信息卡片

**使用场景：** 文章中插入工具概览

**语法：**
```markdown
{{</* tool_card 
  name="Claude 3.5"
  logo="https://example.com/logo.png"
  pricing="Free"
  rating="4.9"
  category="AI Assistant"
  link="https://claude.ai"
*/>}}
```

**输出：** 工具卡片（Logo + 名称 + 定价 + 评分星级 + CTA按钮）

---

### 2. comparison — 对比表格

**使用场景：** 工具A vs 工具B

**语法：**
```markdown
{{</* comparison */>}}
| Feature | Claude | GPT-4 |
|---------|--------|-------|
| Price | Free | $20/mo |
| Context | 200K | 128K |
| Speed | Fast | Medium |
{{</* /comparison */>}}
```

**输出：** 带渐变表头、斑马纹的美化表格

---

### 3. pros_cons — 优缺点

**使用场景：** 展示工具优缺点

**语法：**
```markdown
{{</* pros_cons */>}}
## Pros
- Great accuracy
- Fast response
- Free tier available

## Cons
- Limited languages
- No image generation
{{</* /pros_cons */>}}
```

**输出：** 左右分栏（绿色✓优点 / 红色✗缺点）

---

### 4. rating — 星级评分

**使用场景：** 显示评分

**语法：**
```markdown
{{</* rating value="4.8" max="5" */>}}
```

**输出：** ★★★★☆ (4.8/5)

---

### 5. feature_list — 特性列表

**使用场景：** 列出工具特性

**语法：**
```markdown
{{</* feature_list */>}}
- 🔍 **Advanced Research** — Real-time web search capabilities
- 📝 **Long-form Writing** — Supports up to 50K words per request
- 💻 **Code Generation** — Multi-language support with syntax highlighting
- 🎨 **Image Generation** — Create images from text descriptions
{{</* /feature_list */>}}
```

**输出：** 图标+标题+描述的列表样式

---

### 6. cta — 行动召唤按钮

**使用场景：** 插入CTA按钮

**语法：**
```markdown
{{</* cta 
  text="免费试用 Claude"
  link="https://claude.ai"
  style="primary"
*/>}}
```

**style 可选值：** `primary` | `secondary` | `outline`

**输出：** 样式化按钮

---

### 7. tag — 标签徽章

**使用场景：** 显示标签

**语法：**
```markdown
{{</* tag text="AI Assistant" color="blue" */>}}
{{</* tag text="Free" color="green" */>}}
{{</* tag text="Beta" color="orange" */>}}
```

**color 可选值：** `blue` | `green` | `orange` | `red` | `gray`

**输出：** 胶囊样式标签

---

## 四、快速对照表

| 你想写 | 用这个 | 语法复杂度 |
|---|---|---|
| 工具概览卡片 | `tool_card` | 中 |
| 两个工具对比 | `comparison` | 低 |
| 优缺点列表 | `pros_cons` | 低 |
| 打分展示 | `rating` | 低 |
| 功能特性列表 | `feature_list` | 低 |
| 行动按钮 | `cta` | 低 |
| 小标签 | `tag` | 低 |

---

## 五、RD Agent 任务

### 需要开发的内容

创建以下 Shortcode 模板文件：

```
themes/aitoolreviewr/layouts/shortcodes/
├── tool_card.html
├── comparison.html
├── pros_cons.html
├── rating.html
├── feature_list.html
├── cta.html
└── tag.html
```

### 开发顺序建议

1. 先做基础模板（comparison、rating、tag、cta）— 简单
2. 再做复杂模板（tool_card、pros_cons、feature_list）— 需要CSS配合

### 样式要求

- 与现有文章详情页风格保持一致
- 支持暗色模式（如已实现）
- 响应式布局（移动端友好）

---

## 六、运营 Agent 任务

### 使用流程

1. **写文章时**：使用 Shortcodes 语法插入内容
2. **Hugo 构建**：自动渲染成最终 HTML
3. **发布**：无需额外操作

### 注意事项

- Shortcodes 语法必须使用 `{{</* ... */>}}` 或 `{{< ... >}}` 包裹
- 对比表格使用 Markdown 标准语法编写表头和内容
- 标签颜色根据工具属性选择（免费=green，付费=blue，Beta=orange）

---

## 七、示例文章

```
# Claude 3.5 vs GPT-4: 深度对比

{{</* tool_card name="Claude 3.5" pricing="Free" rating="4.9" */>}}

{{</* tool_card name="GPT-4" pricing="$20/mo" rating="4.7" */>}}

{{</* comparison */>}}
| Feature | Claude 3.5 | GPT-4 |
|---------|------------|-------|
| Price | Free | $20/mo |
| Context Window | 200K | 128K |
{{</* /comparison */>}}

{{</* pros_cons */>}}
## Claude 3.5
## Pros
- 完全免费
- 超长上下文

## Cons
- 中文能力稍弱
## Cons
- 需要科学上网
{{</* /pros_cons */>}}

{{</* cta text="立即体验 Claude" link="https://claude.ai" */>}}
```

---

## 八、优先级

| 优先级 | Shortcode | 原因 |
|---|---|---|
| P0 | `comparison` | 高频使用，提升表格可读性 |
| P0 | `tool_card` | 核心场景，工具展示 |
| P1 | `pros_cons` | 常见内容格式 |
| P1 | `rating` | 配合 tool_card 使用 |
| P2 | `feature_list` | 中频使用 |
| P2 | `cta` | 低频但重要 |
| P3 | `tag` | 可用 Markdown 代替 |

---

## 九、后续优化方向

- 考虑新增 `pricing_table` — 定价方案表格
- 考虑新增 `quote` — 引用块（大佬评价）
- 考虑新增 `video_embed` — 视频嵌入

---

> 如有疑问，联系 PM 确认。
