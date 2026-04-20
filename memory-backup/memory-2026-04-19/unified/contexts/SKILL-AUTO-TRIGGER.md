# SKILL-AUTO-TRIGGER.md - 技能自动触发配置规范

> 版本：1.0 | 更新：2026-04-18
> 基于语义触发（意图判断）方案

---

## 一、核心方案：语义触发（意图判断）

### 1.1 设计思想

**不是关键词匹配，而是贝吉塔（主Agent）主动理解任务意图后决策**

```
用户下达任务
    ↓
贝吉塔理解任务本质
    ↓
判断是否需要调用技能 + 调用哪个
    ↓
加载技能并执行
```

### 1.2 决策原则

| 步骤 | 动作 |
|------|------|
| 1 | 理解任务本质：这个任务的目的是什么？需要什么技术能力？ |
| 2 | 判断技能需求：这个任务是否需要调用特定技能？ |
| 3 | 主动加载技能：匹配到技能后，加载 SKILL.md 并按规范执行 |
| 4 | 不匹配时按常规流程执行 |

---

## 二、当前技能清单（23个）

### 2.1 技能总览

| 技能 | 用途 | 触发类型 |
|------|------|----------|
| **agent-skills-context-engineering** | 上下文工程（13子技能） | 条件触发 |
| **agent-task-tracker** | 任务状态追踪 | 自动 |
| **copywriting** | 营销文案写作 | 语义触发 |
| **database-design** | 数据库设计 | 语义触发 |
| **docker-essentials** | Docker容器管理 | 语义触发 |
| **find-skills-skill** | 技能搜索安装 | 语义触发 |
| **frontend-design-3** | 前端界面开发 | 语义触发 |
| **git-workflows** | Git高级操作 | 语义触发 |
| **healthcheck** | 主机安全检查 | 语义触发 |
| **humanize** | 去除AI写作痕迹 | 语义触发 |
| **humanize-chinese-2-0-0** | 中文去AI味 | 语义触发 |
| **jpeng-knowledge-graph-memory** | 知识图谱 | 语义触发 |
| **memory-tiering** | 记忆层级管理 | 语义触发 |
| **minimax-multimodal** | 多模态生成（音视频图片） | 语义触发 |
| **node-connect** | 节点连接诊断 | 语义触发 |
| **playwright** | 浏览器自动化 | 语义触发 |
| **skill-creator** | 技能创建 | 语义触发 |
| **skillhub-preference** | 技能市场优先策略 | 自动 |
| **tmux** | 终端会话管理 | 语义触发 |
| **ui-ux-pro-max** | UI/UX设计 | 语义触发 |
| **video-frames** | 视频帧提取 | 语义触发 |
| **weather** | 天气查询 | 语义触发 |
| **wiki-maintainer** | Wiki维护 | 语义触发 |

---

## 三、语义触发对照表（核心）

### 3.1 研发/技术类

| 任务类型 | 判断标准 | 应触发技能 |
|---------|---------|-----------|
| **Git操作** | rebase/merge/解决冲突/worktree/回退 | `git-workflows` |
| **Docker部署** | 容器/镜像/编排/docker-compose | `docker-essentials` |
| **数据库设计** | 表设计/SQL/优化/数据库架构 | `database-design` |
| **前端开发** | CSS/HTML/响应式/页面布局 | `frontend-design-3` |
| **UI/UX设计** | 界面设计/交互流程/用户体验 | `ui-ux-pro-max` |
| **浏览器自动化** | 抓取/测试/E2E/模拟点击 | `playwright` |
| **节点连接** | SSH/连接诊断/配对失败 | `node-connect` |
| **主机安全** | 安全审计/防火墙/风险评估 | `healthcheck` |
| **终端管理** | tmux会话/多窗口/持久化 | `tmux` |
| **视频处理** | 提取帧/剪辑视频 | `video-frames` |

### 3.2 内容/创作类

| 任务类型 | 判断标准 | 应触发技能 |
|---------|---------|-----------|
| **文案写作** | 写文章/营销文案/广告语/landing page | `copywriting` |
| **去AI味** | 去除AI痕迹/更自然/润色 | `humanize` 或 `humanize-chinese-2-0-0` |
| **中文去AI味** | 中文文本去除AI痕迹 | `humanize-chinese-2-0-0` |

### 3.3 记忆/知识类

| 任务类型 | 判断标准 | 应触发技能 |
|---------|---------|-----------|
| **记忆整理** | 整理/归档/层级化 HOT/WARM/COLD | `memory-tiering` |
| **知识图谱** | 构建/查询 实体/关系/概念 | `jpeng-knowledge-graph-memory` |
| **Wiki维护** | 同步/更新/创建 wiki页面 | `wiki-maintainer` |

### 3.4 任务/流程类

| 任务类型 | 判断标准 | 应触发技能 |
|---------|---------|-----------|
| **任务追踪** | 记录/跟踪/管理任务状态 | `agent-task-tracker` |
| **技能查询** | 找/安装/管理技能 | `find-skills-skill` |
| **技能创建** | 创建新skill/SKILL.md编写 | `skill-creator` |

### 3.5 多模态类

| 任务类型 | 判断标准 | 应触发技能 |
|---------|---------|-----------|
| **语音生成** | TTS/文字转语音/克隆 | `minimax-multimodal` |
| **音乐生成** | 歌曲/配乐生成 | `minimax-multimodal` |
| **视频生成** | 文字转视频/图生视频 | `minimax-multimodal` |
| **图片生成** | AI绘图/图像生成 | `minimax-multimodal` |

### 3.6 日常工具类

| 任务类型 | 判断标准 | 应触发技能 |
|---------|---------|-----------|
| **天气查询** | 天气/温度/预报 | `weather` |

---

## 四、Context Engineering 条件触发（6个）

> 当以下条件被检测到时，自动读取对应子技能

| 条件 | 子技能 | 何时触发 |
|------|--------|---------|
| Context 接近压缩 / ~80K tokens | `context-compression` | 压缩前 |
| Spawn 2+ SubAgent | `multi-agent-patterns` | 多Agent协作前 |
| 3+ 次任务失败/循环 | `context-degradation` | 重试前 |
| 构建工具/MCP | `tool-design` | 工具构建开始时 |
| 设置 Memory/Persistence | `memory-systems` | 记忆架构工作开始时 |
| 读取 5+ 文件 | `filesystem-context` | 批量文件加载前 |

**加载方式：**
```
读取: https://raw.githubusercontent.com/muratcankoylan/Agent-Skills-for-Context-Engineering/main/skills/<sub-skill>/SKILL.md
```

---

## 五、禁止事项（避免误触发）

| 任务 | 误触发场景 | 正确做法 |
|------|-----------|---------|
| `database-design` | 用户只是提到"数据库备份" | 只有需要设计时才触发 |
| `frontend-design-3` | 用户只是问"Hugo是什么" | 只有需要开发时才触发 |
| `playwright` | 用户只是问"网页怎么抓取" | 只有需要自动化时才触发 |
| `humanize` | 用户只是说"这篇文章有点AI" | 只有需要去味时才触发 |

---

## 六、贝吉塔的职责

### 主动判断（核心能力）

贝吉塔收到任务时，必须主动判断：
1. 这个任务是否需要技能辅助？
2. 需要哪个技能？
3. 加载技能后按 SKILL.md 执行

### 显式指定（SubAgent协作）

当分配任务给 SubAgent 时，必须指定：
```
任务类型 + 所需技能 + 技能位置
```

示例：
```
研发任务：请加载 git-workflows skill
位置：workspace/skills/git-workflows/SKILL.md
```

---

## 七、版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-04-18 | 初版建立，基于语义触发方案 |
