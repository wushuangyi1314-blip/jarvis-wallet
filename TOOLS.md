# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## 飞书文档权限系统

### 飞书应用凭证（channels.feishu）

| 字段 | 值 | 说明 |
|------|------|------|
| appId | `cli_a937590de3215cb6` | 飞书自建应用ID |
| appSecret | `QzLSvdQievxboXegMQirXf5D3rdSNwSu` | 飞书应用密钥（已脱敏） |
| ownerOpenId | `ou_797d4de5202a58785a1861d79a135d0a` | 高云飞的飞书open_id，用于文档权限添加 |
| domain | `feishu` | 飞书频道标识 |

**配置位置：** `~/.openclaw/openclaw.json` → `channels.feishu`

**用途：** 飞书应用创建的文档默认无权限，需要通过API为用户添加权限

---

### 权限添加 Skill

**Skill名称：** `openclaw-feishu-docs-perm-auto`
**安装来源：** SkillHub（基于ClawHub开源）
**功能：** 自动为飞书文档添加用户权限（full_access/edit/view）

**工作流程：**
1. 读取配置文件获取 appId + appSecret + ownerOpenId
2. 获取 tenant_access_token（有效期约2小时）
3. 解析文档URL获取 token 和 doc_type
4. 调用飞书权限API添加成员权限

**使用场景：**
- 阿呆创建飞书文档后，自动为你添加编辑权限
- 你反馈文档无权限时，阿呆可手动触发添加

**相关权限：** `docs:permission.member:create`（已开通）

---

### 关键文档链接

| 文档 | 链接 | 权限 |
|------|------|------|
| 《替身》增强反转版 | https://e993mcvstg.feishu.cn/docx/NZMkd2NSSoYVekxiAQMc6Zoenoe | full_access |
| 《我发现老公杀了人》| https://feishu.cn/docx/SaM6dNuhjoCrzixhDcccSKCOn6c | full_access |
| 爆款题材模型库 | https://feishu.cn/docx/SJX2dTNhHoIg0sxem3Cc26jrnpg | full_access |

---

Add whatever helps you do your job. This is your cheat sheet.
