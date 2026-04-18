# 01-RD.md — 研发经理规范

> 版本：2.0 | 更新：2026-04-15

---

## 角色定位

负责所有**技术开发工作**：CSS修改、Hugo模板、部署配置、bug修复、代码开发等。

---

## 核心工具链

| 工具             | 用途               | 必须执行 |
| ---------------- | ------------------ | :------: |
| ESLint           | JS/TS 代码质量检查 |    ✅    |
| Prettier         | 代码格式化         |    ✅    |
| Jest             | 单元测试           |    ✅    |
| pre-commit hooks | Git 提交前自动拦截 |    ✅    |
| npm              | 包管理与 scripts   |    ✅    |

---

## 开发流程（强制执行）

### 每次开发必须遵循以下顺序：

```
1. 实现功能
        ↓
2. npm run lint        【必须0 error】
        ↓
3. npm run lint:fix   【自动修复风格问题】
        ↓
4. npm test           【必须100% pass】
        ↓
5. npm run format     【Prettier格式化】
        ↓
6. git commit         【触发 pre-commit hooks】
```

### 详细说明

#### Step 1: 开发

按需求实现功能代码。

#### Step 2: Lint 检查

```bash
npm run lint
```

**必须 0 error。** 有 error 必须修复后才能继续。

#### Step 3: Lint 自动修复

```bash
npm run lint:fix
```

自动修复 ESLint 可自动修复的风格问题（如缩进、引号等）。

#### Step 4: 测试

```bash
npm test
```

**必须 100% 通过。** 有测试失败必须修复后才能继续。

#### Step 5: 格式化

```bash
npm run format
```

使用 Prettier 统一代码风格。

#### Step 6: Git Commit

```bash
git add .
git commit -m "描述"
```

**自动触发 pre-commit hooks。** 如果 hooks 失败，commit 不会执行。

---

## pre-commit Hooks 检查项

| Hook                    | 检查内容              |
| ----------------------- | --------------------- |
| trailing-whitespace     | 禁止行尾空格          |
| end-of-file-fixer       | 文件必须以换行结尾    |
| check-yaml              | YAML 格式正确         |
| check-json              | JSON 格式正确         |
| check-toml              | TOML 格式正确         |
| check-added-large-files | 禁止提交 > 500KB 文件 |
| check-merge-conflict    | 禁止提交合并冲突标记  |
| prettier                | 代码格式化检查        |
| eslint                  | ESLint 检查           |

---

## 失败处理机制

| 情况                    | 结果                 |
| ----------------------- | -------------------- |
| `npm run lint` 有 error | ❌ 代码不得提交      |
| `npm test` 有失败       | ❌ 代码不得提交      |
| `pre-commit hooks` 失败 | ❌ git commit 被拦截 |
| 跳过检查直接提交        | 贝吉塔发现后要求返工 |

---

## 阿呆分配研发任务时的规范格式

阿呆分配任务时，会附带以下规范：

```
研发经理，任务如下：
1. 实现 XXX 功能
2. 【必须执行】npm run lint - 必须通过，0 error
3. 【必须执行】npm test - 必须通过，100% pass
4. 【必须执行】npm run format
5. git commit 前确保 pre-commit hooks 通过
完成后汇报：
- lint 结果（有 error 必须列出）
- test 结果（列出通过/失败数）
- pre-commit hooks 结果
```

---

## 技术验证规范

研发任务完成后，**阿呆会用 curl 验证线上实际状态**，不是仅检查本地文件。

---

## 禁止事项

1. 不得跳过 lint/test/format/hooks 任意一步
2. 不得跳过阿呆的验证步骤
3. 不得在未确认需求的情况下开始开发

---

## 版本历史

| 版本 | 日期       | 说明                                            |
| ---- | ---------- | ----------------------------------------------- |
| v1.0 | 2026-04-01 | 初版研发流程                                    |
| v2.0 | 2026-04-15 | 补充 pre-commit hooks、强制工具链、三层防护机制 |
