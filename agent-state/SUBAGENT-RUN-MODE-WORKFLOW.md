# SubAgent Run Mode 工作流规范

> **固化时间：** 2026-04-20
> **背景：** lightclawbot 通道不支持 session/thread 模式，所有 SubAgent 必须使用 run 模式；通过状态文件中转实现上下文复用

---

## 核心原则

1. **所有 SubAgent 使用 run 模式**（lightclawbot 硬限制）
2. **状态文件中转**作为上下文传递机制（不是内存，是磁盘文件）
3. **阿呆（主Agent）作为协调者**，统一管理状态文件的读写
4. **SubAgent 无状态**，每次 run 都是全新上下文，但通过文件继承历史

---

## 目录结构

```
/root/.openclaw/workspace/agent-state/
  ├── README.md                          ← 本文件
  ├── rd-agent-state.json               ← 研发Agent状态
  ├── operations-state.json             ← 运营Agent状态
  ├── pm-agent-state.json               ← 产品Agent状态
  ├── ui-agent-state.json               ← UI设计Agent状态
  ├── data-agent-state.json             ← 数据分析Agent状态
  ├── qa-agent-state.json               ← QA Agent状态
  └── novelist-agent-state.json         ← 小说家Agent状态
```

---

## 状态文件格式（JSON）

```json
{
  "agent": "rd-agent",
  "task": "当前任务描述",
  "phase": "planning|coding|review|done",
  "files": ["相关文件路径"],
  "progress": {
    "done": ["已完成的关键步骤"],
    "next": ["下一步要做的事"],
    "blocked": ["阻塞点（如果有）"]
  },
  "context": {
    "last_commit": "git commit hash",
    "branch": "当前分支",
    "git_status": "有未提交修改|clean"
  },
  "updated_at": "2026-04-20T07:00:00+08:00",
  "updated_by": "main"
}
```

---

## 整合后的完整工作流（阿呆 + SubAgent 协作）

### 完整十步流程

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
⑥ SubAgent 读取状态文件 → 知道要做什么、在哪做
      ↓
⑦ SubAgent 执行任务
      ↓
⑧ SubAgent 更新状态文件（progress.done、phase）
      ↓
⑨ 阿呆读取结果 → 更新 MEMORY.md（归档）
      ↓
⑩ 汇总结果同步给用户
      ↓
⑪ 状态文件 phase → done 或 归档
```

### 任务分配判断标准

| 任务类型 | 分配给 |
|---------|-------|
| 内容写作、研究 | 运营经理 |
| 代码/部署/CSS/技术开发 | 研发 |
| 产品规划、需求文档 | 产品经理 |
| 界面设计、设计稿 | UI设计师 |
| 数据分析 | 数据分析师 |
| 测试验证、样式检查 | QA |
| 流程协调、跨Agent沟通 | 阿呆 |

### 异常处理

```
SubAgent 执行失败：
  → 状态文件标记 blocked
  → 阿呆收到结果 → 分析原因
  → 阿呆决定：重试 / 改派 / 人工介入
  → 更新状态文件（phase 重置）

SubAgent 超时：
  → 同上处理

阿呆判断需要人工介入：
  → 直接处理
  → 更新状态文件记录
```

### 与原工作流的对比

| 原来（阿呆直接分配） | 现在（加状态文件中转） |
|---------------------|----------------------|
| 阿呆直接 spawn SubAgent | 阿呆先更新状态文件 |
| SubAgent 自己理解上下文 | SubAgent 读取文件获得上下文 |
| 任务完成就结束 | 状态持久化到文件 |
| 结果靠阿呆记忆 | 结果写回文件，阿呆读取 |

### 关键区别

| | 原来 | 现在 |
|---|---|---|
| **上下文传递** | SubAgent 自己理解（靠 prompt） | 通过状态文件（显式） |
| **断点续传** | ❌ 失败只能重来 | ✅ 新 Agent 读文件继续 |
| **状态可见性** | 阿呆靠记忆 | 阿呆随时可读文件 |
| **执行透明度** | 黑箱 | 白盒（文件可查） |

---

## SubAgent 行为规范（各Agent需遵守）

### 通用规则

1. **启动时**：必须读取对应的状态文件
2. **执行时**：严格按照状态文件中的 `progress.next` 执行
3. **完成时**：更新状态文件（done、next、phase）
4. **失败时**：在 blocked 中记录原因，phase 保持不变

### rd-agent 额外规范

```javascript
// 读取状态文件
const state = JSON.parse(readFileSync('/root/.openclaw/workspace/agent-state/rd-agent-state.json'));

// 完成后写回
writeFileSync('/root/.openclaw/workspace/agent-state/rd-agent-state.json', JSON.stringify(state, null, 2));
```

---

## 与 session/thread 模式的本质区别

| | run + 文件中转 | session/thread |
|---|---|---|
| 上下文存储 | 外部文件（磁盘） | Agent 内存（内存） |
| 生命周期 | 手动管理 | 自动保持 |
| 跨 run 记忆 | ✅ 通过文件继承 | ❌ 每次 run 丢失 |
| 状态一致性 | ✅ 可见可追溯 | ⚠️ 内存不可见 |
| 实现复杂度 | 需规范化 | 原生支持 |

---

## 优势

1. **状态可见**：阿呆可以随时查看文件，了解每个 Agent 在做什么
2. **可追溯**：所有变更记录在文件中
3. **断点续传**：Agent 崩溃后，新 Agent 可从文件恢复上下文
4. **无状态设计**：每个 Agent run 都是独立的，不依赖内存

---

## 注意事项

- 状态文件更新使用**原子写**（先写临时文件再 rename），避免并发冲突
- 每次 spawn 前，阿呆应检查状态文件的 phase，避免重复分配
- phase="done" 时，阿呆应清理或归档状态文件
