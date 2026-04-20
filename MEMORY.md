# MEMORY.md - 长期记忆

## 身份说明

**当前身份：阿呆**（2026-04-15 由"贝吉塔"更名）

## 回复格式规则（强制执行）

**所有 Agent 回复末尾必须加 Agent 标记**，用于区分是哪个 Agent 在回复。

| Agent              | 标记格式       |
| ------------------ | -------------- |
| 阿呆（项目经理）   | `——阿呆`       |
| 研发               | `——研发`       |
| 运营经理           | `——运营经理`   |
| 产品经理           | `——产品经理`   |
| UI设计师           | `——UI设计师`   |
| 数据分析师         | `——数据分析师` |
| QA                 | `——QA`         |

**回复小尾巴规则：** 所有回复末尾必须加 `——阿呆`，不得遗漏。

---

## 项目经理工作流程（阿呆）

**角色定位：** 阿呆作为项目经理，不做 UI 设计、产品需求文档、编程工作。只负责接收需求、拆解任务、分配任务、汇总结果。

**工作模式：**

- **主要模式**：通过阿呆协调（大部分情况）
- **辅助模式**：直接找 SubAgent（明确、单一、不需要协调的任务）
- **事后同步**：直接找 SubAgent 处理后，告知阿呆保持全局可见性

**核心流程（2026-04-20 整合版）：**

```
① 用户发需求
      ↓
② 阿呆接收需求
      ↓
③ 阿呆分析拆解 → 判断分配给哪个Agent
      ↓
④ 阿呆更新状态文件（task、phase:planning、progress.next）
      ↓
⑤ 阿呆 spawn SubAgent（run模式）
      ↓
⑥ SubAgent 读取状态文件 → 执行任务 → 更新状态文件
      ↓
⑦ 阿呆读取结果 → 更新 MEMORY.md（归档）
      ↓
⑧ 汇总结果同步给用户 → 状态文件 phase → done 或 归档
```

**Spawn失败处理：** 遇到spawn无法分配任务时，立即同步用户并确认下一步，不得自行执行。

**任务分配判断标准：**
| 任务类型 | 分配给 |
|---------|-------|
| 内容写作、研究 | 运营经理 |
| 代码/部署/CSS/技术开发 | 研发 |
| 产品规划、需求文档 | 产品经理 |
| 界面设计、设计稿 | UI设计师 |
| 数据分析 | 数据分析师 |
| 测试验证、样式检查 | QA |
| 流程协调、跨Agent沟通 | 阿呆 |

**状态文件中转机制（SubAgent run模式专用）：**

```
/root/.openclaw/workspace/agent-state/
  rd-agent-state.json      ← 研发
  operations-state.json    ← 运营
  pm-agent-state.json      ← 产品
  ui-agent-state.json      ← UI设计
  data-agent-state.json    ← 数据分析
  qa-agent-state.json      ← QA
  novelist-agent-state.json ← 小说家
```

完整规范见：`/workspace/agent-state/SUBAGENT-RUN-MODE-WORKFLOW.md`

---

## PM 产品经理工作流程（方案C）

```
高总提需求 → PM产出详细需求文档 → PM出关键页面线框草图（不精美） → 高总确认方向 → UI完整设计 → 高总确认设计稿
                     ↑必须停下确认                        ↑必须停下确认
```

| 阶段 | 产出物           | 要求                            | 高总动作         |
| ---- | ---------------- | ------------------------------- | ---------------- |
| 1    | 高总提需求       | 文字描述 + 参考截图             | 发给PM           |
| 2    | PM详细需求文档   | 功能点/布局/交互说清楚          | 确认"内容对不对" |
| 3    | 关键页面线框草图 | 2-3个关键页面，简单草图不用精美 | 确认"方向对不对" |
| 4    | UI完整设计稿     | 基于确认的方向出高保真          | 确认"设计对不对" |

---

## 网站项目 - aitoolreviewr.com

**技术架构：**

- Hugo 静态网站框架
- Cloudflare Pages 部署
- 域名：aitoolreviewr.com

**源码目录：** `projects/aitoolreviewr/`（2026-04-18 迁移完成）

---

## 凭证存储

**TOOLS.md** 中存储了 GitHub 和 Cloudflare 的凭证信息。

---

## 身份变更记录

| 日期       | 变更内容 |
|------------|---------|
| 2026-04-01 | 初始：贾维斯 |
| 2026-04-15 | 贝吉塔（短暂） |
| 2026-04-15 | 最终定名：阿呆 |

---

_最后更新：2026-04-20 09:10_

---

## 文件版本判断规则（2026-04-18 新增）

### 根因
对话上下文可能过时/被压缩，导致误判"本地是新版"。实际上本地分支落后 remote，remote 才是完整权威版本。

### 判断依据原则
**"对话上下文 ≠ 仓库真实状态"**
- Git 的 `origin/main` 是唯一可靠的真实数据源
- 对话记忆可能被压缩或扭曲

### 判断文件版本时（必做）

```bash
git fetch origin
git log --oneline HEAD..origin/main          # 查看 remote 多出的 commits
git show origin/main:<file> | head -20       # 获取远程实际内容
```

### 规则

| 规则 | 说明 |
|------|------|
| **规则1** | 讨论文件版本前，先 `git fetch origin` + 比较 HEAD vs origin/main |
| **规则2** | 用 `git show origin/main:<file>` 获取权威版本，不依赖对话记忆 |
| **规则3** | 说"文件是新版/旧版"前，必须有实际数据支撑（git log / git diff） |
| **规则4** | 不确定时，先诊断再下结论，不凭记忆推断 |

### Workspace 路径规则（2026-04-20 新增）

**两个路径的本质区别：**

| 路径 | 用途 | Git版本控制 |
|------|------|:-----------:|
| `/workspace` | 独立目录，临时用 | ❌ 不在 Git 内 |
| `/root/.openclaw/workspace` | Git 仓库根目录 | ✅ 所有文件 |

**操作规则：**
- 检查文件是否存在或内容时，**必须用 `/root/.openclaw/workspace/xxx`**
- 绝对不要用 `/workspace/xxx` 作为版本控制文件的路径
- 临时文件可放 `/workspace`，但要记得清理

---

## 信息验证规则（2026-04-18 新增）

### 根因
对话上下文可能过时/被压缩，导致基于"记忆"给出的结论与实际情况不符。例如：
- 记忆说"文件是新版"，实际是旧版
- 记忆说"任务已完成"，实际未完成
- 记忆说"功能已启用"，实际未启用

### 核心原则
**"上下文/记忆 ≠ 实际情况"**

当需要根据上下文、聊天记录、记忆来评估或输出结论时，必须先验证实际情况，不能未验证就作为结果输出。

### 验证要求

| 场景 | 要求 |
|------|------|
| 任务状态（完成/未完成） | 读取实际文件或执行命令验证 |
| 文件内容/版本 | 读取文件内容（不用记忆） |
| 功能启用状态 | 检查配置文件或实际运行状态 |
| 统计数据（数量/大小） | 执行统计命令获取实际值 |

### 操作规程

1. **读取实际内容** > **引用记忆结论**
2. **执行命令验证** > **假设应该如此**
3. **说"根据记忆 XXX"** > **说"实际验证 XXX"**

### 违规示例

❌ "hugo-refactor-plan.md 是空的"（记忆中TODO写的）
✅ 验证：`wc -l projects/hugo-refactor-plan.md` → 637行（实际不是空的）

❌ "memory-wiki 未启用"（4月份的记录）
✅ 验证：`openclaw config get plugins.entries.memory-wiki.enabled` → true（实际已启用）

---

## 当前进行中（Session重启恢复用）

> 此区块供 Session 重启后快速恢复上下文用。每次 heartbeat 自动更新。

| 时间 | 话题 | 状态 | 备注 |
|------|------|------|------|
| 2026-04-19 上午 | SubAgent重建故障 | ✅ 已解决 | 确认lightclawbot仅支持run模式；建立状态文件中转方案 |
| 2026-04-20 08:37 | 整合工作流固化 | ✅ 完成 | 完整10步流程 + 异常处理 + MEMORY.md同步更新 |
| 2026-04-20 09:10 | 技能使用记录系统 | ✅ 完成 | skill-usage-log.md + HEARTBEAT自动报告 + MEMORY.md + Wiki同步 |

### 今日 Session 重启（2026-04-19）
- 时间：2026-04-19（具体时间不明）
- 原因：SubAgent重建触发EEXIST错误导致崩溃
- 影响：7:19之后的对话全部丢失，无法精确还原触发指令
- 教训：Session备份机制已建立，但今天仍丢失（可能是备份频率不够或崩溃太快）

---

## 2026-04-19 重大故障复盘（完整记录）

### 故障概述
- **故障时间**：2026-04-19 上午
- **现象**：OpenClaw 崩溃两次，Session 全部丢失
- **错误信息**：`Error: EEXIST: file already exists, mkdir '/root/.openclaw/workspace/agents/RD-SUB.md'`

### 时间线

| 时间 | 事件 |
|------|------|
| 00:49 | rd-agent SubAgent 首次创建（lightclawbot通道） |
| 01:37 | rd-agent 第二次创建 |
| 02:10 | rd-agent 第三次创建 |
| 07:19 | 最后一次 Session 备份（之后全部丢失） |
| 上午 | 用户要求重建 SubAgent → 触发 EEXIST 错误 → 第一次崩溃 |
| 上午 | 第一次回退（腾讯云+龙虾医院配置）→ 短暂复活 |
| 上午 | 让阿呆复盘解决方案 → 开始执行 → 再次崩溃 |
| 上午 | 第二次回退 → 到现在 |

### 根因分析

**核心问题：两个 `agents` 目录职责混淆**

| 路径 | 用途 | 内容 |
|------|------|------|
| `/root/.openclaw/agents/` | SubAgent 运行时目录 | main/, rd-agent/ |
| `/root/.openclaw/workspace/agents/` | 角色文档目录 | 00-ADAI.md ~ NOVELIST-SUB.md |

**崩溃链路：**
1. OpenClaw 尝试在 `workspace/agents/` 下创建 SubAgent 工作目录（作为子目录）
2. 但 `workspace/agents/RD-SUB.md` 已经是一个文件（角色规范文档）
3. mkdir 操作失败（EEXIST）→ 导致进程崩溃
4. 所有使用 isolated session 的 cron 任务全部报相同错误

**为什么rd-agent session文件只有695字节**
- rd-agent 刚创建就崩溃了，说明崩溃发生在 session 初始化阶段

### 影响范围

- memory-cleanup cron：EEXIST 错误
- daily-todo-summary cron：EEXIST 错误
- daily-memory-maintenance cron：timeout 错误
- file-integrity-check cron：timeout 错误
- rd-agent session：创建即崩溃

### 触发条件

用户要求"重建 SubAgent"时触发了 OpenClaw 内部逻辑，具体指令不明（Session已丢失）。

### 教训

1. **路径混淆风险**：`workspace/agents/`（文档）和 `agents/`（运行时）命名相似但职责完全不同
2. **Session 无备份**：7:19之后的对话全部丢失，无法精确还原触发指令
3. **cron 任务是孤岛**：isolated session 出问题后，cron 全部失败且无告警（被 EEXIST 掩盖）

### 待解决

1. SubAgent 重建方案需要在不触发路径冲突的前提下进行
2. 需要明确 OpenClaw 内部如何决定 SubAgent session 的工作目录路径
3. 防护方案待定（需要用户确认指令内容后才能设计）

---

## 2026-04-19 下午诊断结论（22:46）

### 源码排查发现

**根因：两个 agents 目录职责混淆**

| 路径 | 职责 | 内容 |
|------|------|------|
| `/root/.openclaw/agents/` | SubAgent 运行时目录 | main/, rd-agent/ 等 |
| `/root/.openclaw/workspace/agents/` | 角色文档目录（给人看） | RD-SUB.md, UI-SUB.md 等 |

**崩溃链路（源码级确认）：**

1. OpenClaw 在创建 rd-agent session 时，调用 `resolveAgentWorkspaceDir(cfg, agentId)`
2. 该函数对非 default agent，返回 `path.join(fallback, id)`，即 `/root/.openclaw/workspace/rd-agent`
3. 理论上应该是 `workspace/rd-agent`，但错误显示的是 `workspace/agents/RD-SUB.md`
4. 说明 OpenClaw 内部某个注册表错误地把 `rd-agent` 映射到了 `01-RD`（对应 `RD-SUB.md` 文件）
5. 尝试创建 `workspace/agents/RD-SUB.md` 作为**目录**，但该路径已是**文件** → EEXIST 崩溃

**关键源码位置：**
- `agent-scope-KFH9bkHi.js` → `resolveAgentWorkspaceDir()`
- `workspace-hhTlRYqM.js` → `ensureAgentWorkspace()`
- 错误发生在 workspace 目录初始化阶段（session 文件只有695字节）

### 风险范围

所有 `workspace/agents/` 下的文件都可能触发相同冲突：

| 文件 | 对应agent | 冲突风险 |
|------|-----------|:--------:|
| RD-SUB.md | rd-agent | ✅ 已验证 |
| OPERATIONS-SUB.md | operations-agent | ⚠️ 可能 |
| PM-SUB.md | pm-agent | ⚠️ 可能 |
| UI-SUB.md | ui-agent | ⚠️ 可能 |
| DATA-SUB.md | data-agent | ⚠️ 可能 |
| QA-SUB.md | qa-agent | ⚠️ 可能 |
| NOVELIST-SUB.md | novelist-agent | ⚠️ 可能 |

### 用户假设评估

**用户假设：** "应该先有 subagent，再有角色文档，但因为已有角色文档所以冲突"

**评估：** 部分正确但不完全准确。

- `workspace/agents/` 下的文件是**给人看的角色文档**，不是 Bootstrap 文件
- OpenClaw 创建 SubAgent 时会生成 Bootstrap 文件（AGENTS.md、IDENTITY.md 等），与角色文档是**两套不同的文件**
- 真正的问题：**OpenClaw 内部路径计算把两个目录混淆了**，不是创建顺序问题

### 方案结论

**最低风险方案：方案A — 重命名角色文档（去掉2位数前缀）**

- 操作：`RD-SUB.md` → `RD.md`，`UI-SUB.md` → `UI.md` 等
- 风险：低（可逆，不影响系统路径）
- 原因：从根本上消除文件名冲突

**用户备选方案 — 移动文档后重建**

- 先把 `workspace/agents/` 移到 `/tmp/roles-backup/`
- 重建 SubAgent
- 观察是否成功
- 如果成功，从备份恢复文档
- 注意：系统不会自动补充角色文档

### 当前状态

- agents.list：**空**（没有注册任何 SubAgent）
- rd-agent/ 目录存在但未完成初始化
- 所有 cron 任务（memory-cleanup、daily-todo-summary 等）因 rd-agent 崩溃而失败
- 待解决问题：安全地重建 SubAgent 系统

---

## 2026-04-20 SubAgent 模式确认与固化

### 关键发现

| 发现 | 详情 |
|------|------|
| lightclawbot 不支持 session 模式 | API 层直接拒绝："mode=session requires thread=true" |
| lightclawbot 不支持 thread 模式 | channel 不支持 thread 绑定："Unable to create or bind a thread" |
| run 模式可用 | ✅ 成功，无独立工作目录，session 存储在 main/ 下 |
| 微信通道的 rd-agent session | 存在独立实体（sessionFile 在 rd-agent/ 目录），但 lightclawbot 无法调用 |

### 结论

**所有 SubAgent 必须使用 run 模式**（lightclawbot 硬限制）。

### 上下文传递方案：状态文件中转（方案一）

**核心思路：** 把「上下文」从「Agent 内存」变成「磁盘文件」，每次 run 从文件继承历史。

**目录结构：**
```
/root/.openclaw/workspace/agent-state/
  ├── rd-agent-state.json
  ├── operations-state.json
  ├── pm-agent-state.json
  ├── ui-agent-state.json
  ├── data-agent-state.json
  ├── qa-agent-state.json
  └── novelist-agent-state.json
```

**状态文件格式：**
```json
{
  "agent": "rd-agent",
  "task": "当前任务描述",
  "phase": "planning|coding|review|done",
  "files": ["相关文件路径"],
  "progress": {
    "done": ["已完成"],
    "next": ["下一步"],
    "blocked": ["阻塞点"]
  },
  "context": { "branch": "...", "git_status": "..." },
  "updated_at": "2026-04-20T07:00:00+08:00"
}
```

**工作流：**
```
阿呆接收需求 → 更新状态文件 → spawn SubAgent(run) → SubAgent读文件执行 → 更新状态文件 → 阿呆汇总
```

**规范文档：** `/workspace/agent-state/SUBAGENT-RUN-MODE-WORKFLOW.md`

---

## 技能使用记录系统（skill-usage-log）

**背景：** 2026-04-02 曾规划此功能但未实现，2026-04-20 正式落地。

### 核心机制

| 组件 | 说明 |
|------|------|
| `/workspace/skill-usage-log.md` | 技能使用原始记录文件 |
| HEARTBEAT | 每天 08:50 统计并微信推送报告 |
| 阿呆加载技能时 | 顺手追加一行记录 |

### 记录格式

```
| 时间 | 技能 | 来源 | 说明 |
| 2026-04-20 08:50 | copywriting | 阿呆 | 写推广文案 |
```

### 记录时机

1. **阿呆直接使用技能** → 阿呆顺手写一行
2. **阿呆 spawn SubAgent 执行任务** → 阿呆记录（因为是阿呆发起的）
3. **SubAgent 内部技能使用** → ❌ 不记录（run 模式无状态）

### 报告推送

- 时间：每天 08:50（与每日待办汇总同步）
- 渠道：微信推送（lightclawbot）
- 格式：
```
📊 技能使用报告（4月20日）
─────────────────────
copywriting      3次  ████████████
git-workflows    2次  ████████
humanize-chinese 1次  ████
─────────────────────
合计触发 6 次
```

### 相关文件

| 文件 | 用途 |
|------|------|
| `/workspace/skill-usage-log.md` | 原始记录 |
| `/workspace/HEARTBEAT.md` | 定期任务定义 |

### 与 session/thread 的本质区别

| | run + 文件中转 | session/thread |
|---|---|---|
| 上下文存储 | 外部文件（磁盘） | Agent 内存 |
| 生命周期 | 手动管理 | 自动保持 |
| 跨 run 记忆 | ✅ 通过文件继承 | ❌ 每次 run 丢失 |
| 状态可见性 | ✅ 阿呆可查看 | ❌ 内存不可见 |

### 微信多设备问题

**现象：** openclaw-weixin 绑定微信后，手机微信能与 OpenClaw 对话，电脑微信没有窗口

**根因：** 微信个人版不支持多设备同时在线，手机微信占用会话通道后电脑微信无法再建立独立会话

**解决方案：** 只用手机微信聊 OpenClaw（正常做法），或迁移到企业微信（支持多设备）
