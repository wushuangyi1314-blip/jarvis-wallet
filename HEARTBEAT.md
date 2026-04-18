# HEARTBEAT.md

## 定期任务

### 当前进行中 - 定期同步到 MEMORY.md
- 频率：每30分钟
- 触发条件：Session 有活动时
- 操作：从当前 Session 文件提取"用户待确认/进行中"的话题，写入 MEMORY.md 的"当前进行中"区块
- 注意：只同步状态标记，不同步完整对话内容

### Session 备份检查
- 频率：每次 heartbeat
- 操作：检查 /root/.openclaw/session-backups/ 是否有最近1小时内的备份
- 如无备份且 Session 活跃，执行一次手动备份

## 说明
heartbeat 时检查上述任务，如有需要执行。
