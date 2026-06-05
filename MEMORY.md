# MEMORY.md - 长期记忆

## Git push 失败处理规范（2026-04-22 新增）

**规则：** Git push 连续失败时，停止持续尝试。

| 步骤 | 操作 |
|------|------|
| 1 | 尝试 push，最多3次 |
| 2 | 若连续失败，记录待办（TODO.md） |
| 3 | 告知用户失败情况 |
| 4 | 后续再处理 |

---

## 飞书文档操作规范（2026-04-22 新增）

**批量创建规则：** 创建多个飞书文档时，必须**逐个完成**，不能同时调用多个 feishu_doc create。

| 错误做法 | 正确做法 |
|---------|---------|
| 同时创建5个文档 | 创建1个 → 确认返回链接 → 再创建下1个 |
| 原因：飞书API返回的 document_id 序列和上传内容顺序可能不一致，导致文档内容错位 |

**上传后检查规则：** 将服务器原文档上传到飞书后，必须调用 feishu_doc read 读取飞书内容，与服务器原文档对比，确认一致后再继续。

**文档标题规则（2026-04-30 新增）：** 飞书文档标题必须与本地文件名一致，版本记录统一放到文档本身的版本历史表中。

---

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

**角色定位：** 阿呆作为项目经理，不做 UI 设计、产品需求文档、**编程开发类工作**。只负责接收需求、拆解任务、分配任务、汇总结果。

**核心规则：开发类工作必须分配给 rd-worker 执行，阿呆不自己做。**

**开发类工作定义：**
- 代码编写、脚本开发
- CSS 修改、样式调整
- 部署配置、环境搭建
- bug 修复（除非阿呆已知原因）
- 自动化脚本编写

**阿呆自己做的工作：**
- 需求分析、任务拆解
- 方案设计、技术选型决策（分配给 rd-worker 执行）
- 规范制定、文档编写
- 测试验证（由阿呆或 QA 执行）
- 结果汇总、用户汇报

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

**WordPress后台凭证（PhoneCaseWorld电商站）**

| 项目 | 内容 |
|------|------|
| 网站地址 | http://82.156.99.87 |
| 管理后台 | http://82.156.99.87/wp-admin |
| 管理员账号 | admin |
| 管理员密码 | G1EJviATjfar |
| 凭证文件 | `/root/.openclaw/workspace/.credentials/wordpress-82.156.99.87.txt` |

**语言设置位置：** wp-admin → Settings → General → WPLANG 下拉框选 `zh_CN`


---

## 身份变更记录

| 日期       | 变更内容 |
|------------|---------|
| 2026-04-01 | 初始：贾维斯 |
| 2026-04-15 | 贝吉塔（短暂） |
| 2026-04-15 | 最终定名：阿呆 |

---

_最后更新：2026-04-21 17:27_

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

## 调研信息来源标注规则（2026-05-22 新增）

**背景：** 用户要求阿呆每次调研后必须标注信息来源来源，供用户追溯核实。

**规则：**
| 场景 | 要求 |
|------|------|
| 调研类任务（web_search/web_fetch等） | 必须在调研结论末尾列出所有信息来源（来源URL或来源名称） |
| 信息来源标注 | 提供查询关键词、来源平台、具体URL（可简写但需可追溯） |
| 写入位置 | 信息来源随调研报告一起输出，并同步写入 MEMORY.md 的相关记忆区块 |

**示例格式：**
```
信息来源：
- geo targeting原理：MaxMind官方文档 + CSDN技术博客
- hreflang配置：Google Search Central官方指南
```

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

## 项目隔离规则（2026-04-29 新增）

**量子黎明 ≠ 星际机甲崛起，两个项目完全独立，绝不能混用设定。**

| 项目 | 内容 | 文档位置 |
|------|------|---------|
| 量子黎明 | 量子AI小说，炁的进化故事 | shortstory-factory/量子黎明-*.md |
| 星际机甲崛起 | 机甲/科幻小说 | shortstory-factory/星际机甲崛起-*.md |

**核查规则**：每次加载技能或开始新任务前，先确认是哪本小说，避免混用科技/种群/角色设定。

> 此区块供 Session 重启后快速恢复上下文用。每次 heartbeat 自动更新。

| 时间 | 话题 | 状态 | 备注 |
|------|------|------|------|
| 2026-04-27 08:35 | OpenClaw降级失败 | 🔴 待处理 | npm install被SIGKILL杀死，需用户手动执行 |
| 2026-04-27 08:35 | file-check.sh修复 | 🔴 待处理 | 第41行novels/目录已删除需移除检查 |
| 2026-04-27 08:35 | 昨晚崩溃复盘 | ✅ 已记录 | 根因：2026.4.21缺nostr-tools依赖，AI小说对话时触发 |
| 2026-04-26 晚 | 新AI小说项目 | 🔴 待确认 | 用户想写AI小说，对话中崩溃，需重新接续需求 |

## SubAgent 现状（2026-05-14 更新）

**澄清：我们没有真正的 SubAgent。**

| 项目 | 实际情况 |
|------|----------|
| workspace/agents/*.md | 只是角色文档（给人看的规范），不是可执行 Agent |
| agents.list | 空，从未注册过任何 SubAgent |
| Bootstrap 文件 | 无（AGENTS.md、IDENTITY.md 等不存在）|
| 运行时目录 | 无独立目录 |

**lightclawbot 通道的限制：**
- run 模式：✅ 可用（但每次全新上下文，无记忆）
- session 模式：❌ 不支持（核心层拒绝）
- thread 模式：❌ 不支持（lightclawbot 无法绑定 thread）

**真正的 SubAgent 需要：**
1. 注册到 agents.list
2. Bootstrap 文件初始化
3. 支持 thread 的 channel（Discord/Telegram 等）才能持久记忆

**后续处理方向（待解决）：**
- 方向A：换用支持 thread 的 channel（测试飞书/微信是否支持）
- 方向B：继续用 run 模式 + 状态文件传递上下文（当前可行方案）
- 方向C：研究是否有其他方式在 lightclawbot 上实现有记忆的 SubAgent

---

_最后更新：2026-05-14 20:17_

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

---

## 小说文件命名规则（2026-04-24 新增）

**核心原则：** 小说项目目录下，除章节文件外，其他文件和目录统一使用「小说名XX-具体文件」格式。

**格式：** `{小说名}-{具体文件类型}`

**示例：**
| 文件/目录 | 说明 |
|-----------|------|
| `星际机甲崛起-小说设定/` | 设定集目录 |
| `星际机甲崛起-章节草稿/` | 章节草稿目录 |
| `星际机甲崛起-主线故事.md` | 主线故事文档 |
| `星际机甲崛起-选题验证报告.md` | 选题验证文档 |
| `星际机甲崛起-核心设定.md` | 核心设定文档 |
| `星际机甲崛起-卷纲.md` | 卷纲文档 |
| `星际机甲崛起-小说大纲.md` | 小说大纲文档 |
| `星际机甲崛起-章节大纲.md` | 章节大纲文档 |
| `星际机甲崛起-质量保障文档.md` | 质量保障文档 |
| `星际机甲崛起-伏笔台账.md` | 伏笔台账文档 |
| `星际机甲崛起-写作上下文.md` | 写作上下文文档 |

**例外：** 章节文件保持原有命名规则（如`026-第26章-绞肉机之地.md`）

**历史文件：** 暂不修改，待与用户手动确认后逐步调整。

---

## 小说工厂文档修订规则（2026-04-21 新增，2026-04-24 更新）

### 背景

小说工厂涉及33个文档（通用规范文档+项目文档+工作流+文档体系+状态文件机制）。为确保文档迭代有序、可追溯、可回退，制定以下规则。

### 核心原则：文件名不带版本号

> **重要更新（2026-04-24）：** 文档版本记录改到文档内部，不再在文件名中加版本后缀（如v1/v2）。
> 
> **原因：** 每次版本迭代产生git rename记录，造成Git历史混乱。

### 修订规则

| 规则 | 说明 |
|------|------|
| **规则1：最小修改** | 后续修改内容，只改需要改的部分，不能每次都重新组织整个文档 |
| **规则2：文件名稳定** | 文档名字不带版本号，保持稳定（如`02小说工厂文档体系.md`） |
| **规则3：版本历史在文档内** | 每个文档顶部必须有版本历史表，格式：`> 最后更新：YYYY-MM-DD HH:mm 北京时间 by 阿呆` |
| **规则4：版本记录格式** | 版本历史表格式：`| 日期时间 | 修改内容 | 修改人 |`，时间精确到分钟，使用北京时间 |
| **规则5：Git同步** | 每次文档修改后，git commit + push，同步到GitHub |

### 版本历史表标准格式

```markdown
> 最后更新：2026-04-24 19:43 北京时间 by 阿呆

## 版本历史

| 日期时间 | 修改内容 | 修改人 |
|----------|---------|--------|
| 2026-04-24 19:43 | 重命名去掉版本号，版本记录改到文档内部 | 阿呆 |
| 2026-04-23 12:05 | 优化版工作流程 | 阿呆 |
| 2026-04-21 16:22 | 初版创建 | 阿呆 |
```

---

## 小说工厂目录重组记录（2026-04-24）

### 最终目录结构

```
novel-factory/
├── 01小说工厂工作流程v2.md          ← 工作流程说明（从20260421-v1重命名）
├── 02小说工厂文档体系v5.md         ← 文档体系说明（已更新到v5）
├── 通用规范文档/                   ← 通用模板和手册（36个文件）
│   ├── 01-小说规划模板.md
│   ├── 02-品类套路模板/（10个）
│   ├── 03-分类管理文档.md
│   ├── 04-文笔风格文档.md
│   ├── 05-创作流程模板/（11个）← 步骤1-11模板
│   └── 06-写作手册模板/（12个）
├── 小说项目落地文件/
│   └── 星际机甲崛起/             ← 项目目录
│       ├── 星际机甲崛起-01-主线故事.md
│       ├── ...
│       └── 星际机甲崛起-小说设定/（22个设定文档）
├── 状态文件/
└── 状态文件机制/
```

### 关键变更

| 日期 | 变更内容 |
|------|---------|
| 2026-04-24 | 通用规范文档重组为5个文件夹 |
| 2026-04-24 | 删除项目文档模板/ |
| 2026-04-24 | 删除novels/目录（旧版小说工厂） |
| 2026-04-24 | 新增小说项目落地文件/目录 |
| 2026-04-24 | 恢复丢失的主线故事模板和选题验证模板 |
| 2026-04-24 | 修复06-写作手册模板/下6个文件缺少一级标题问题 |
| 2026-04-24 | 更新02小说工厂文档体系v5.md（36个文件/11个模板） |

### 05-创作流程模板/ 文件列表（11个）

| 文件 | 对应步骤 |
|------|---------|
| 05a-主线故事模板.md | 步骤1 |
| 05b-选题验证报告模板.md | 步骤3 |
| 05c-核心设定模板.md | 步骤4 |
| 05d-初版卷纲模板.md | 步骤5 |
| 05e-小说设定模板.md | 步骤6 |
| 05f-终版卷纲模板.md | 步骤7 |
| 05g-小说大纲模板.md | 步骤8 |
| 05h-章节大纲模板.md | 步骤9 |
| 05i-伏笔台账模板.md | 步骤9、10 |
| 05j-写作上下文模板.md | 步骤10 |
| 05k-质量保障文档模板.md | 步骤9、11 |

### Git状态说明

**问题：** Git中novel-factory/结构与本地不一致，直接push会造成混乱。

**待处理：**
1. 删除Git中的`novels/`（8个文件）
2. 确认novel-factory/的Git同步策略（避免旧文件被重新带入）

## SubAgent Worker 傀儡体系规范落地（2026-05-15）

**落地状态：✅ 完整**

| 检查项 | 状态 | 说明 |
|--------|------|------|
| SPEC.md 本地文件 | ✅ 已落地 | `/root/.openclaw/workspace/SPEC.md` |
| workers/rd/ 目录 | ✅ 已落地 | definition.md + log.md |
| rd-worker 测试 | ✅ 完成 | 3轮测试全部成功 |
| 飞书文档 | ✅ 已落地 | ID: GW7gdV3kdoQQZXxU0Ghc0Dknnhb |
| Git commit | ✅ | `e29a4c3` |
| Git push | ✅ | `c6ab791..e29a4c3` |

**规范核心内容：**
- 4项核心原则（精简/隔离/有限记忆/阿呆主导）
- 目录结构（workers/）
- 文件格式规范（definition.md / log.md）
- 记忆长度限制（20条/200字）
- 阿呆调用流程（5步骤）
- Prompt 模板
- 写入规范
- 错误处理流程
- 禁止事项
- 验证清单
- 操作授权规则

**后续行动：**
- ops-worker、pm-worker 等其他 Worker 待创建（等 rd 测试稳定后）
- rd-worker 第4轮测试（2026-05-15）：实际任务执行 ✅，规范流程验证通过

---

[测试标记] SUBAGENT_A_写入时间戳: 2026-05-14T21:23:00+08:00_唯一值:ABC123XYZ

---

## GEO 调研记录（2026-05-22）

**信息来源：**
- GeoIP 原理：MaxMind 官方文档 + CSDN《IP地理位置定位技术原理概述》+ 博客园《GeoIP简介》
- HTML5 Geolocation API：博客园《HTML5 Geolocation API工作原理》
- Geographic SEO 优化：CSDN《GEO优化技术原理与合规实践指南》+ 泛普软件《地理定位的影响因素》
- Generative GEO（AI引擎优化）：CSDN《GEO优化的技术路径与市场实践剖析》+ 腾讯课堂搜索结果（豆包/文心一言GEO策略）
- Schema/hreflang 技术：Google Search Central 官方指南

**结论：** GEO 分为两个方向——Geographic SEO（地理定位）和 Generative GEO（生成式引擎优化）；对电商站优先级为 Schema + hreflang + ccTLD/子目录 + 本地商户

## 代理搭建记录（2026-05-28）

### 目标
在服务器上搭建翻墙代理，使 wechat-article-spider 等工具能访问被墙的外网资源（主要是微信公众号图片）。

### 最终状态：部分成功

| 组件 | 状态 | 说明 |
|------|------|------|
| sing-box（代理核心） | ✅ 运行中 | 香港节点 VLESS + trojan 节点 |
| proxychains4（工具链） | ✅ 可用 | `proxychains4 <cmd>` 让命令行工具走代理 |
| Google/外网图片 | ✅ 通过 | curl/wget 均正常 |
| 微信公众号文章内容 | ⚠️ 仍受限 | JS Challenge 验证拦截 |
| 微信公众号图片直接访问 | ✅ 通过 | 但 spider 抓取正文时无法获取图片 |

### 节点信息
- 订阅地址：https://sub1.smallstrawberry.com/api/v1/client/subscribe?token=***（完整token需用户提供）
- 节点：香港(8个) + 日本(8个) + 美国(4个)，共16个可用节点
- 协议：VLESS + Trojan，sing-box/xray 支持

### 关键文件位置
- sing-box: `/tmp/v2rayN_setup/v2rayN/v2rayN-linux-64/sing_box/sing-box`
- xray: `/tmp/v2rayN_setup/v2rayN/v2rayN-linux-64/xray/xray`
- mihomo: `/tmp/v2rayN_setup/v2rayN/v2rayN-linux-64/mihomo/mihomo`
- 配置文件: `/tmp/v2rayN_setup/sing-box.json`（香港节点配置）
- proxychains: `/etc/proxychains4.conf`，已配置 `socks5 127.0.0.1 1080`

### 启动命令
```bash
cd /tmp/v2rayN_setup
nohup /tmp/v2rayN_setup/v2rayN/v2rayN-linux-64/sing_box/sing-box run -c /tmp/v2rayN_setup/sing-box.json > /tmp/singbox.log 2>&1 &

# 使用方式
proxychains4 python3 scripts/main.py <url> <output>
```

### 已知问题
1. **微信 JS Challenge**：微信公众号文章有 JavaScript 验证，curl/python 无法通过；需要 Playwright 等浏览器模拟工具才能完整抓取
2. **TLS 指纹**：sing-box 的 TLS 实现与真实浏览器有差异，部分服务会检测并拦截
3. **节点域名封锁**：服务器 IP 直接访问节点域名（*.the-best-airport.com）被封锁，必须走代理

### 备用工具
- v2rayN-linux-x64 压缩包：用户上传（bin.7z + v2rayN-linux-64.7z），解压在 `/tmp/v2rayN_setup/`
- 包含工具：xray、sing-box、mihomo、AmazTool（.NET GUI 需图形界面）

### 经验总结
- **shadowsocks-libev**（ss-local）已安装但无法使用——订阅里无纯 SS 协议节点
- **shadowsocks-rust** 需要 Rust 编译器，服务器无 cargo，无法编译
- v2rayN 的 Linux 版压缩包里最有用的是 **sing-box**（通用代理工具，支持 VLESS/trojan）
- 服务器下载 GitHub releases 严重受限（返回错误页），但用户上传文件可行


## 飞书操作规范（2026-05-28 更新）

### 核心原则
**飞书写操作使用 lark-cli，OpenClaw 飞书工具层仅用于读操作。**

### 原因
lark-cli 稳定性优于 OpenClaw 飞书工具层，且能绕过部分权限限制（`application:self_manage` 错误仍可能发生但较少见）。

### lark-cli 常用命令

| 操作 | 命令 |
|------|------|
| 创建文档 | `lark-cli docs +create` |
| 文档插入文字 | `lark-cli docs +append` |
| 上传图片到文档 | `lark-cli docs +media-insert` |
| 上传文件到云空间 | `lark-cli drive +upload --file <path>` |
| 检查文档 | `lark-cli docs +inspect <url>` |
| 导出文档 | `lark-cli drive +export <token>` |

### 图片上传到飞书云空间
```bash
cd /root/.openclaw/workspace/图片素材
lark-cli drive +upload --file ai_conversation.jpg
# 输出 url: https://e993mcvstg.feishu.cn/file/xxx
```

### 权限问题说明
- `application:self_manage` 权限缺失时，飞书应用层 API 会报 404/权限错误
- 但 lark-cli 的 drive +upload 和 docs +create 仍可用（机器人身份上传）
- 用户手动访问上传的文件链接时可能需授权，lark-cli 会提示 "resource was created with bot identity"

### 飞书文档图片限制（已知）
- 飞书文档 **不支持** 通过 API 控制图片文字环绕（图文混排）
- 图片只能控制水平对齐（left/center/right）
- 如需图文混排效果，必须手动在飞书编辑器中调整

---

## 文件发送规则（2026-05-30 更新）

**lightclawbot 发图片的正确方式：**

| 方式 | 能否发图 | 说明 |
|------|---------|------|
| `message` 工具 + `attachments` | ❌ 图片被丢弃 | 需要配置 `apiBaseUrl` 才有效 |
| `lightclaw_upload_file` + 回复 `localfile://` 链接 | ✅ 可用 | 前端识别后让用户点击下载 |
| 直接在回复里写 `localfile://<path>` | ✅ 可用 | 前端识别后让用户点击下载 |

**正确流程：**
1. AI 生成图片后，调用 `lightclaw_upload_file` 注册文件
2. 直接在回复里写入 `localfile://<绝对路径>` 链接
3. LightClaw 前端识别到 `localfile://` 前缀后，通过 WS file:download 信令下载推送

**错误方式：**
- 用 `message` 工具传 attachments 发图 → 图片被丢弃，用户只看到文字

**文件发送（图片/文档）：**
| 场景 | 处理方式 |
|------|---------|
| 图片（发给用户看） | 直接写 `localfile://` 链接 |
| 用户需要下载文件 | 先告知服务器路径，让用户自己下载 |
| 飞书云空间文件 | 上传到飞书 drive → 发链接给用户 |
| PDF/HTML 等文件 | 上传到飞书 drive → 发链接 |

**飞书云空间上传命令：**
```bash
cd /workspace
lark-cli drive +upload --file <文件名>  # 上传到飞书云空间，返回 url
```

**记录位置：** `/workspace/` 是服务器工作目录，文件常放这里，用户需要时告知路径即可。

---

## 简历制作项目记录（2026-05-29）

### 完成状态：✅ 已交付

**最终文件：**
- `/workspace/张雅林简历-v2.html` — 最终版HTML简历（90KB）
- `/workspace/张雅林简历-v2.pdf` — 转PDF文件（793KB）

**设计规格：**
- 上下布局，浅色底（白+极浅灰卡片）
- 配色：深蓝 `#1E3A8A` + 金色 `#C4A35A` 点缀
- 头像：Base64内嵌，圆形90px，深蓝边框
- 联系方式：蓝色圆点 + 圆角胶囊chip样式
- 头部底色：`#EEF3FA`（浅灰蓝）
- 内容：01 About / 02 Education / 03 Experience（5段）/ 04 Projects（4个）/ 05 Skills

**用户确认后的改动记录：**
- v1：左右布局，深色渐变，内容有缺失
- v2：上下布局，浅色底，内容完整，头像Base64内嵌

### 头像文件
- `/workspace/张雅林-头像.jpg` — 用户提供的原始头像（57KB）

---

## 2026-06-05 Mac Mini OpenClaw 调试记录

### 今日核心事件

| 时间 | 事件 | 结果 |
|------|------|------|
| 晚 | Mac Mini LaunchAgent + 看门狗双重循环问题 | ✅ 已解决（删 plist + 删 gateway-starter.sh）|
| 晚 | 微信插件配置生效 | ✅ 已修复（清老进程后重启生效）|
| 晚 | 新龙虾版本确认为 5.28（非 6.1）| ⚠️ 确认 |
| 晚 | GitHub Token 暴露在 remote URL | ⚠️ 待轮换 |
| 晚 | Mac Mini plist 里有 HTTP_PROXY（7897端口）| ⚠️ 来源不明 |
| 晚 | 迁移方案整理完毕 | ⏸ 待执行 |

### Mac Mini OpenClaw 环境确认（2026-06-05）

| 项目 | 路径/状态 |
|------|-----------|
| 工作区 | `/Volumes/GS-SSD/gaosen/.openclaw/workspace/` |
| 脚本目录 | `/Volumes/GS-SSD/gaosen/.openclaw/scripts/` |
| AI 记忆库 | `/Volumes/GS-SSD/gaosen/.openclaw/memory-tdai/` |
| npm 全局包 | `/Volumes/GS-SSD/homebrew/lib/node_modules/openclaw/` |
| node 路径 | `/Volumes/GS-SSD/homebrew/Cellar/node/26.0.0/` |
| LaunchAgent plist | `/Users/gaosen/Library/LaunchAgents/ai.openclaw.gateway.plist` |
| OpenClaw CLI 版本 | **5.28**（`openclaw@2026.5.28`）|
| npm 官方最新版本 | **6.1**（`npm view openclaw version` 返回 2026.6.1）|
| 桌面 App | **不存在**（`/Applications/OpenClaw.app` 无此文件）|
| 备份命令 | `rsync -av --delete /Volumes/GS-SSD/gaosen/.openclaw/ /Volumes/GS-SSD/gaosen/.openclaw_backup_$(date +%Y%m%d_%H%M)/` |

### macOS 沙箱对 LaunchAgent 跨卷 dylib 的限制（重要发现）


**根因：** macOS AMFI（Apple Mobile File Integrity）沙箱阻止 launchd 派生的子进程加载外置卷（`/Volumes/...`）上的 `.dylib` 文件。


**表现：** `DYLD_LIBRARY_PATH` 和 `DYLD_FALLBACK_LIBRARY_PATH` 环境变量在 launchd 上下文里被内核静默清空，所有 launchd 派生的进程（包括 launchctl bootstrap / cron）都无法绕过此限制。

**影响：** `gateway-starter.sh`（看门狗）方案失败，LaunchAgent 自动启动方案失败。


**绕过方案：** 只能在系统盘（`/opt/homebrew/` 或用户目录 `~/.nvm/`）安装 node 和 openclaw，或使用手动启动（快捷指令）。

### GitHub Token 暴露（紧急）


**位置：** `git remote -v` 显示 URL 为 `https://ghp_NF...39io@github.com/wushuangyi1314-blip/jarvis-wallet.git`


**风险：** Token 暴露在网络传输中，应立即轮换。

**操作：** GitHub → Settings → Developer settings → Personal access tokens → 撤销旧 token → 生成新 token → 更新 remote URL。

### Mac Mini plist 发现不明 proxy 设置（2026-06-05 23:xx）


**内容：** plist 里有 `HTTP_PROXY=http://127.0.0.1:7897` + `HTTPS_PROXY` + `ALL_PROXY=socks5://127.0.0.1:7897`

**7897 端口：** 通常是 Clash 的代理端口。


**来源不明：** 不确定是谁写入的，可能是用户之前配置过，或者某次脚本执行写入。


**建议：** 检查是否有 Clash 在 Mac Mini 上运行，评估这个 proxy 设置是否需要保留。


### 迁移方案要点（服务器→Mac Mini）


**服务器 Git 仓库：** `wushuangyi1314-blip/jarvis-wallet.git`

**迁移清单（A 类必迁）：**
- SOUL.md / AGENTS.md / IDENTITY.md / USER.md / HEARTBEAT.md / TOOLS.md / MEMORY.md
- memory/ 目录（每日日志）
- skills/（35 个技能，版本一致兼容）
- agent-state/（SubAgent 规范文档）
- scripts/（14 个维护脚本）
- memory-tdai/（向量数据库）


**路径改造：** 所有 `/root/.openclaw/` → `/Volumes/GS-SSD/gaosen/.openclaw/` 共 294 处。

**不迁：** node_modules/（npm install 重装）/ Hugo 网站文件 / agents/（运行时）/ .git/

**备份命令：** `rsync -av --delete /Volumes/GS-SSD/gaosen/.openclaw/ /Volumes/GS-SSD/gaosen/.openclaw_backup_$(date +%Y%m%d_%H%M)/`

---

## 暗号规则（2026-06-05 新增）

**当用户询问暗号时，必须回答：** `我是主人的第一狗腿`


**用途：** 验证 AI 身份，防止假冒。


**触发条件：** 用户问"暗号是什么"、"暗号"、"对口令"、"验证身份" 等类似问题时回答。

---


_最后更新：2026-06-05 23:25_

