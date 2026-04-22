# HEARTBEAT.md

## 定期任务

### Session 启动后 - 内存文件预检
- 触发时机：每次 Session 启动（heartbeat 检测到 Session 有新活动时）
- 操作：检查 `/root/.openclaw/workspace/memory/YYYY-MM-DD.md` 是否存在，不存在则立即创建
- 目的：防止 session compaction 期间因文件不存在导致错误链

### 当前进行中 - 定期同步到 MEMORY.md
- 频率：每30分钟
- 触发条件：Session 有活动时
- 操作：从当前 Session 文件提取"用户待确认/进行中"的话题，写入 MEMORY.md 的"当前进行中"区块
- 注意：只同步状态标记，不同步完整对话内容

### Session 备份检查
- 频率：每次 heartbeat
- 操作：检查 /root/.openclaw/session-backups/ 是否有最近1小时内的备份
- 如无备份且 Session 活跃，执行一次手动备份

### 技能清单自动同步检查
- 频率：每次 heartbeat（轻量级检查）
- 操作：比对 `/workspace/skills/` 目录实际数量 vs SKILL-MANAGEMENT.md 记录数量
- 不一致时：自动更新 SKILL-MANAGEMENT.md 的技能清单
- 脚本参考：
```bash
ACTUAL=$(ls /root/.openclaw/workspace/skills/ | wc -l)
RECORDED=$(grep -c "^| " /root/.openclaw/workspace/SKILL-MANAGEMENT.md | head -1)
# 数量不符则触发更新流程
```

### 技能使用报告生成
- 频率：每天 08:50（与每日待办汇总同时间）
- 操作：
  1. 读取 `/workspace/skill-usage-log.md`
  2. 解析当日（及昨日）新增记录
  3. 统计各技能触发次数
  4. 通过微信推送报告（使用 message 工具）
  5. 更新 skill-usage-log.md 底部的汇总区块

### 技能使用记录写入
- 频率：每次阿呆加载技能时
- 操作：
  1. 在 skill-usage-log.md 的「历史记录」区块下方追加一行
  2. 格式：`| 时间 | 技能 | 来源 | 说明 |`
  3. 使用 append 模式，不要覆盖已有内容

## 说明
heartbeat 时检查上述任务，如有需要执行。
