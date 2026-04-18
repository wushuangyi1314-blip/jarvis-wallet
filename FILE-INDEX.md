# FILE-INDEX.md — 本地文件索引与目录规范

> 版本：1.0 | 创建：2026-04-18

---

## ⚠️ 核心原则：Git 管理范围

**只有 `/root/.openclaw/workspace/` 内的文件受 Git 版本控制。**

以下目录**不在** Git 管理范围内，Git 操作不会影响它们：

| 目录           | 路径                                   | 说明          |
| -------------- | -------------------------------------- | ------------- |
| scripts/       | `/root/.openclaw/scripts/`             | 维护脚本      |
| memory-tdai/   | `/root/.openclaw/memory-tdai/`         | AI 记忆数据库 |
| skills/ (扩展) | `/root/.openclaw/extensions/*/skills/` | 扩展技能      |
| cron/          | `/root/.openclaw/cron/`                | 定时任务配置  |
| logs/          | `/root/.openclaw/logs/`                | 日志文件      |
| credentials/   | `/root/.openclaw/credentials/`         | 凭证存储      |
| backups/       | `/root/.openclaw/backups/`             | 备份          |
| extensions/    | `/root/.openclaw/extensions/`          | 插件          |

---

## 📁 目录结构总览

```
/root/.openclaw/
├── workspace/                    # ⭐ Git 版本控制目录
│   ├── agents/                   # Agent 规范文档
│   ├── memory/                   # 记忆文件（hot/warm/cold）
│   ├── novels/                   # 小说工厂文件
│   ├── projects/                 # 项目文件（Hugo网站等）
│   ├── skills/                   # 工作区技能
│   ├── AGENTS.md                 # Agent 工作流总规范
│   ├── MEMORY.md                 # 长期记忆
│   ├── SOUL.md                   # AI 人格定义
│   ├── TOKENS.md                 # 凭证（永不 push）
│   ├── TOOLS.md                  # 工具配置
│   └── ...
│
├── scripts/                      # ⭐ 维护脚本（不在 Git 内）
│   ├── alert.sh                  # 告警脚本
│   ├── backup.sh                 # 备份脚本
│   ├── memory-cleanup.sh         # 内存清理
│   ├── health-check.sh           # 健康检查
│   ├── sync-unified.sh           # 统一同步
│   ├── daily-wrapup.sh           # 每日整理
│   ├── weekly-archive.sh         # 每周归档
│   └── ...
│
├── memory-tdai/                  # ⭐ AI 记忆数据库（不在 Git 内）
│   ├── scene_blocks/             # 场景记忆块
│   ├── records/                  # 对话记录索引
│   ├── conversations/            # 原始对话
│   └── vectors.db                # 向量数据库
│
├── skills/                       # 全局技能（pnpm global）
│   └── ...
│
├── extensions/                   # 插件目录
│   └── */skills/                 # 各插件内置技能
│
├── cron/                         # Cron 任务配置
├── logs/                         # 日志目录
├── credentials/                  # 凭证存储
└── backups/                      # 备份目录
```

---

## 📋 关键文件索引

### 工作区文件（Git 管理）

| 文件         | 路径       | 说明               | Git |
| ------------ | ---------- | ------------------ | :-: |
| AGENTS.md    | workspace/ | Agent 工作流总规范 | ✅  |
| MEMORY.md    | workspace/ | 长期记忆           | ✅  |
| SOUL.md      | workspace/ | AI 人格定义        | ✅  |
| TOKENS.md    | workspace/ | 凭证（永不 push）  | ✅  |
| TOOLS.md     | workspace/ | 工具配置           | ✅  |
| USER.md      | workspace/ | 用户信息           | ✅  |
| IDENTITY.md  | workspace/ | AI 身份定义        | ✅  |
| HEARTBEAT.md | workspace/ | 心跳检查配置       | ✅  |
| agents/      | workspace/ | 8 个 Agent 规范    | ✅  |
| memory/      | workspace/ | 记忆目录           | ✅  |
| novels/      | workspace/ | 小说工厂           | ✅  |
| projects/    | workspace/ | 项目目录           | ✅  |
| skills/      | workspace/ | 工作区技能         | ✅  |

### 脚本文件（不在 Git 内）

| 文件              | 路径                     | 说明         | Git |
| ----------------- | ------------------------ | ------------ | :-: |
| alert.sh          | /root/.openclaw/scripts/ | 告警脚本     | ❌  |
| backup.sh         | /root/.openclaw/scripts/ | 备份脚本     | ❌  |
| memory-cleanup.sh | /root/.openclaw/scripts/ | 内存清理     | ❌  |
| health-check.sh   | /root/.openclaw/scripts/ | 健康检查     | ❌  |
| sync-unified.sh   | /root/.openclaw/scripts/ | 统一同步     | ❌  |
| daily-wrapup.sh   | /root/.openclaw/scripts/ | 每日整理     | ❌  |
| weekly-archive.sh | /root/.openclaw/scripts/ | 每周归档     | ❌  |
| clear_cache.sh    | /usr/local/bin/          | 系统缓存清理 | ❌  |

### 记忆与数据（不在 Git 内）

| 文件          | 路径         | 说明         | Git |
| ------------- | ------------ | ------------ | :-: |
| scene_blocks/ | memory-tdai/ | 场景记忆块   | ❌  |
| records/      | memory-tdai/ | 对话记录索引 | ❌  |
| vectors.db    | memory-tdai/ | 向量数据库   | ❌  |

---

## 🔍 乌龙防止规则

### 规则1：检查文件存在性前，先确认路径

```
# ❌ 错误做法
echo "agents目录丢失！"  # 未检查实际路径

# ✅ 正确做法
ls /root/.openclaw/workspace/agents/  # 先检查工作区
ls /root/.openclaw/agents/            # 再检查根目录
find /root/.openclaw -name "agents" -type d  # 全局搜索
```

### 规则2：区分 Git 管理 vs 非 Git 管理

| 操作                | Git 内  | Git 外    |
| ------------------- | ------- | --------- |
| git clone/pull/push | ✅ 影响 | ❌ 不影响 |
| filter-repo         | ✅ 影响 | ❌ 不影响 |
| .git 覆盖           | ✅ 影响 | ❌ 不影响 |
| 日常编辑            | ✅ 影响 | ❌ 不影响 |

### 规则3：关键文件定期验证

脚本：`/root/.openclaw/scripts/file-check.sh`（如不存在需创建）

---

## 🛠️ 文件健康检查脚本模板

```bash
#!/bin/bash
# file-check.sh - 关键文件存在性检查
# 用法: file-check.sh

LOG="/root/.openclaw/logs/file-check.log"
ERRORS=0

check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1"
    else
        echo "❌ $1 (丢失!)"
        ERRORS=$((ERRORS + 1))
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo "✅ $1/"
    else
        echo "❌ $1/ (丢失!)"
        ERRORS=$((ERRORS + 1))
    fi
}

echo "=== 文件健康检查: $(date) ===" | tee -a $LOG

echo "--- Workspace 关键文件 ---"
check_file /root/.openclaw/workspace/AGENTS.md
check_file /root/.openclaw/workspace/MEMORY.md
check_file /root/.openclaw/workspace/TOKENS.md
check_dir /root/.openclaw/workspace/agents/
check_dir /root/.openclaw/workspace/memory/
check_dir /root/.openclaw/workspace/novels/

echo "--- Scripts ---"
check_dir /root/.openclaw/scripts/

echo "--- Memory-TDAI ---"
check_dir /root/.openclaw/memory-tdai/scene_blocks/

if [ $ERRORS -gt 0 ]; then
    echo "⚠️ 发现 $ERRORS 个问题，请检查"
else
    echo "✅ 全部检查通过"
fi
```

---

## 📝 更新规则

1. 新建目录/文件后，**立即更新 FILE-INDEX.md**
2. 路径变更后，**立即更新 FILE-INDEX.md**
3. 每月第一个心跳时，**执行 file-check.sh 验证**

---

## 版本历史

| 版本 | 日期       | 说明                   |
| ---- | ---------- | ---------------------- |
| v1.0 | 2026-04-18 | 初版建立，解决乌龙问题 |
