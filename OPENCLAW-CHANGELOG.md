# OpenClaw 系统变更日志

> 记录 OpenClaw 配置变更、功能调整、优化操作
> 建立变更追踪机制，确保可追溯性

---

## 2026-04-18

### identityLinks 跨渠道身份映射配置

**目标：** 实现微信与 LightClawBot 跨渠道上下文共享

**配置内容：**
```json
"session": {
  "identityLinks": {
    "lightclawbot:100026176862": ["user:100026176862"],
    "openclaw-weixin:o9cq80_2U36gIHJbVgPUFCmfAl6U@im.wechat": ["user:100026176862"]
  }
}
```

**评估结果：**
- ❌ Session 仍分开，未实现跨渠道上下文共享
- ✅ 配置保留，不影响系统正常运行
- ⚠️ identityLinks 不影响 Session Key 生成（架构限制）

**状态：** ⚠️ 已配置但功能未生效，暂保留观察

**后续行动：** 如需回滚，移除 identityLinks 字段即可

---

### dmScope 配置尝试（已回滚）

**目标：** 通过修改 dmScope 实现跨渠道会话合并

**尝试配置：**
```json
"session": {
  "dmScope": "per-peer"
}
```

**回滚原因：** 
- 未实现跨渠道会话合并
- Session Key 仍基于原始 peer ID，不受 dmScope 影响

**状态：** ✅ 已回滚至 `per-channel-peer`

---

### 每日待办汇总自动化

**新增 Cron：**
| 项目 | 内容 |
|------|------|
| Cron ID | 056a9c77-4159-4658-b874-d44bd28cf06a |
| 时间 | 每天 9:00 Asia/Shanghai |
| 执行内容 | 6步流程：读TODO.md → 搜索聊天记录 → 合并验证 → 更新文档 → 发微信 |

**模板：**
- 模板标识：`DAILY-TODO-SUMMARY`
- 模板文件：`.templates/daily-todo-template.md`

---

## 模板规范

### 命名规则
- 模板文件：`DAILY-TODO-SUMMARY`（全大写下划线）
- 模板位置：`.templates/`
- 模板用途：明确标注

### 记录规范
| 字段 | 要求 |
|------|------|
| 日期 | YYYY-MM-DD |
| 配置内容 | JSON 或详细描述 |
| 评估结果 | 功能是否生效 |
| 后续行动 | 回滚步骤或观察计划 |

---

## 变更追溯检查清单

每次配置变更后，记录：
- [ ] 变更日期
- [ ] 变更内容（配置前 vs 配置后）
- [ ] 变更目标
- [ ] 评估结果
- [ ] 状态（生效/未生效/已回滚）
- [ ] 回滚步骤（如有）

---

_Last Updated: 2026-04-18_
