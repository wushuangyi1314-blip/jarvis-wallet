# SKILL-MANAGEMENT.md - 技能管理规范

> 版本：1.1 | 更新：2026-04-20
> 重建自：2026-04-15 原始文档

---

## 一、核心规则

### 1. 安装前授权

**【硬性规则】技能操作必须获得明确授权**
- 未经用户明确授权，AI不得安装或删除任何技能
- 所有技能操作前必须与用户确认，获得同意后方可执行

### 2. 安装后同步

添加新技能时**必须同步更新任务分发规则**：
- 该技能负责处理哪些任务类型/场景
- 任务分发规则的维护是技能添加操作的必要组成部分
- 两者必须同时完成，缺一不可

### 4. 自动同步（版本1.1+）

**通过 HEARTBEAT 自动核对实际安装数量：**

每次 heartbeat 时，阿呆自动比对 `/workspace/skills/` 目录与本文件的技能清单：
- 数量不符 → 自动更新本文件的技能清单（14→17 已补全）
- 新增技能 → 追加到清单并同步更新任务分发映射表
- 缺失技能 → 标记并通知用户

**核对命令（心跳时执行）：**
```bash
ls /root/.openclaw/workspace/skills/ | wc -l
# 对比 SKILL-MANAGEMENT.md 记录数量，不一致则自动更新
```

### 3. 删除前备份

删除技能前必须commit空记录到Git，保留删除历史。

---

## 二、技能清单（17个）

| 技能 | 安装时间 | Git Commit | 用途 | 触发场景 |
|------|----------|------------|------|----------|
| find-skills | 2026-04-14 | - | 搜索/安装技能 | 用户说"找技能/安装技能" |
| agent-task-tracker | 2026-04-14 | - | 任务状态追踪 | 用户问"任务/待办" |
| memory-tiering | 2026-04-14 | - | 记忆层级管理 | 用户说"整理记忆" |
| jpeng-knowledge-graph-memory | 2026-04-14 | - | 知识图谱构建 | 用户问"记忆/知识图谱" |
| frontend-design-3 | 2026-04-14 | - | 前端界面开发 | 用户问"前端/网页设计" |
| agent-skills-context-engineering | 2026-04-14 | - | 上下文工程(13子技能) | 上下文压缩/多Agent/降级等 |
| skillhub-preference | 2026-04-14 | - | 技能市场优先策略 | 技能查询时 |
| git-workflows | 2026-04-15 | - | Git高级操作 | rebase/merge/冲突解决 |
| docker-essentials | 2026-04-15 | - | 容器管理 | docker/镜像/容器管理 |
| database-design | 2026-04-15 | - | 数据库设计 | 设计表/写SQL/优化查询 |
| playwright | 2026-04-15 | - | 浏览器自动化测试 | 操作浏览器/抓取数据 |
| copywriting | 2026-04-15 | - | 营销文案写作 | 写营销文案/广告语 |
| humanize | 2026-04-15 | - | 去除AI写作痕迹(英文) | 文本需要更自然 |
| ui-ux-pro-max | 2026-04-15 | - | UI/UX设计 | 设计界面/交互流程 |
| humanize-chinese-2-0-0 | 2026-04-16 | - | 中文去AI味 | 中文文本需要更像人写的 |
| minimax-multimodal | 2026-04-18 | - | 多模态内容生成 | 生成图片/视频/音乐/语音 |
| wiki-maintainer | 2026-04-18 | - | Wiki知识库维护 | 维护整理知识库/Wiki页面 |

---

## 三、任务分发映射表

| 任务类型 | 判断标准 | 应触发技能 |
|---------|---------|-----------|
| 代码开发 | 需要写代码/调试/重构 | frontend-design-3 |
| Git操作 | 需要rebase/merge/解决冲突 | git-workflows |
| 容器部署 | 需要docker/镜像/容器管理 | docker-essentials |
| 数据库 | 需要设计表/写SQL/优化查询 | database-design |
| 浏览器自动化 | 需要操作浏览器/抓取数据 | playwright |
| 文案写作 | 需要写营销文案/广告语 | copywriting |
| 文本优化 | 需要去除AI痕迹/更自然 | humanize |
| UI/UX设计 | 需要设计界面/交互流程 | ui-ux-pro-max |
| 记忆整理 | 需要整理/归档/层级化记忆 | memory-tiering |
| 知识管理 | 需要构建/查询知识图谱 | jpeng-knowledge-graph-memory |
| 任务追踪 | 需要记录/跟踪/管理任务 | agent-task-tracker |
| 上下文优化 | 需要压缩/优化/管理上下文 | agent-skills-context-engineering |
| 技能查询 | 需要找/安装/管理技能 | find-skills |
| 中文文本优化 | 中文文本需要去除AI味/更像人写 | humanize-chinese-2-0-0 |
| 多模态生成 | 需要生成图片/视频/音乐/语音 | minimax-multimodal |
| Wiki维护 | 需要维护整理Wiki/知识库页面 | wiki-maintainer |

---

## 四、同步要求

每次技能操作后必须同步到：
1. **Git仓库** - commit变更
2. **Wiki知识库** - 更新技能索引
3. **unified/记忆** - 记录操作事件

---

## 五、禁止误触发规则

- 只有真正需要技能时才触发
- 用户只是提到某个词不等于需要该技能
- 根据任务本质判断，不是关键词匹配

---

_Last Updated: 2026-04-20_
