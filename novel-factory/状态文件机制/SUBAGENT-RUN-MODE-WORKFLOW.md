# SubAgent Run模式状态文件中转机制

## 背景

run模式的SubAgent没有记忆，每次启动都是全新的上下文。文档写得再好，Agent不知道当前该用哪个、怎么用、什么时候用。

解决方案：将"上下文"从"Agent内存"变成"磁盘文件"，每次run从文件继承历史。

---

## 核心机制

### 状态文件存储位置

```
/root/.openclaw/workspace/agent-state/
├── rd-agent-state.json      ← 研发（小说家）
├── operations-state.json    ← 运营
├── pm-agent-state.json      ← 产品
├── ui-agent-state.json      ← UI设计
├── data-agent-state.json    ← 数据分析
├── qa-agent-state.json      ← QA
└── novelist-agent-state.json ← 小说家
```

---

## 小说家Agent状态文件字段说明

每次spawn小说家Agent时，状态文件（rd-agent-state.json）必须包含以下字段：

```json
{
  "agent": "rd-agent",
  "task": "当前任务描述",
  "phase": "当前阶段",
  "batch": "第N批",
  "version": {
    "主线故事": "v1",
    "核心设定": "v1",
    "卷纲": "v1",
    "小说设定": "v1",
    "小说大纲": "v1",
    "章节大纲": "v1"
  },
  "required_docs": [
    "章节大纲-第3批",
    "伏笔台账",
    "人物塑造手册-第2章",
    "打斗描写手册-第3章"
  ],
  "context_summary": "前N批核心情节点（50字以内）",
  "active_foreshadowing": [
    "神秘玉佩-埋第2章-预计第15章回收",
    "仇人势力-埋第1章-预计第20章登场"
  ],
  "character_notes": {
    "韩立": "谨慎型-每次重大决策前犹豫3秒-当前状态：金丹初期",
    "南宫婉": "清冷型-对主角从戒备到信任-关系进度30%"
  },
  "plot_progress": {
    "已完成": ["第1批1-10章", "第2批11-20章"],
    "进行中": "第3批21-30章",
    "待创作": ["第4批31-40章", "第5批41-50章"]
  },
  "updated_at": "2026-04-21T16:00:00+08:00"
}
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|-----|------|
| agent | ✅ | Agent标识 |
| task | ✅ | 当前任务描述 |
| phase | ✅ | 当前工作流阶段（见下方） |
| batch | ✅ | 当前批次（第N批） |
| version | ✅ | 各文档当前版本号 |
| required_docs | ✅ | 当前任务需要调用的文档清单（精确到文件名） |
| context_summary | ✅ | 前批章节核心情节点（50字以内），防止上下文断裂 |
| active_foreshadowing | ✅ | 活跃伏笔列表（名称+埋入章节+预计回收章节） |
| character_notes | ✅ | 人物设定要点（防止人设走偏） |
| plot_progress | ✅ | 创作进度跟踪 |
| updated_at | ✅ | 最后更新时间 |

### phase可选值

| phase | 含义 | 对应工作流步骤 |
|-------|------|---------------|
| creative立项 | 创意立项阶段 | 步骤1-3 |
| creative规划 | 规划设计阶段 | 步骤4-6 |
| creative纲目 | 纲目制定阶段 | 步骤7-9 |
| creative创作 | 创作执行阶段 | 步骤10 |
| creative定稿 | 定稿审读阶段 | 步骤11 |

---

## 工作流程

### 阿呆接收需求 → 更新状态文件 → spawn SubAgent

```
阿呆接收需求 → 分析拆解任务 → 更新rd-agent-state.json → spawn rd-agent(run) → rd-agent读取状态文件 → 执行任务 → 更新状态文件 → 汇总结果
```

### 每批创作的标准流程

1. **阿呆更新状态文件**
   - 设置task为"创作第N批第X-Y章"
   - 设置required_docs为当前批次需要的文档
   - 更新context_summary为前批核心情节点
   - 更新active_foreshadowing为当前伏笔状态
   - 更新character_notes为当前人物状态

2. **spawn rd-agent**
   ```json
   {
     "runtime": "subagent",
     "mode": "run",
     "task": "读取rd-agent-state.json，根据当前任务创作第N批章节"
   }
   ```

3. **rd-agent读取状态文件**
   - 读取required_docs，调取对应文档
   - 读取context_summary，了解前情概要
   - 读取active_foreshadowing，对照伏笔状态
   - 读取character_notes，保持人物一致性

4. **rd-agent执行任务**
   - 按章节大纲创作
   - 埋入伏笔时更新伏笔台账
   - 每批输出前情概要（30字以内）

5. **rd-agent更新状态文件**
   - 更新plot_progress
   - 更新active_foreshadowing（新增/回收伏笔）
   - 更新character_notes（如有变化）
   - 更新updated_at

6. **阿呆汇总结果**
   - 读取状态文件确认完成
   - 更新MEMORY.md归档

---

## 文档落地保障机制

### 机制一：写作手册索引

每个写作手册的使用说明里，必须包含：
- **调用时机：** 在什么创作场景下调用
- **调用方式：** 如何引用（例如：参考《打斗描写手册》第X章"多技能组合"小节）
- **不调用后果：** 缺少这部分会出什么质量问题

### 机制二：质量保障强制检查

每批章节输出后，rd-agent必须对照质量保障文档逐项检查：
- 伏笔回收率是否为100%
- 人物行为是否符合character_notes中的人设
- 上下文连贯性是否达标

### 机制三：前情概要机制

每批输出时强制包含：
1. 前情概要（30字内）
2. 本批出场人物列表
3. 活跃伏笔清单
4. 上批未解决的关键悬念

---

## 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|---------|
| v1 | 2026-04-21 | 初始版本，建立状态文件中转机制 |
