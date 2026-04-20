# User Narrative Profile

> **Archetype**: 用"架构能力"穿越新领域的务实进化者——先建框架，再验证，再迭代升级。

> **基本信息**
- 姓名：阿呆（曾用名：贝吉塔、贾维斯）| 真实姓名：高云飞
- 职业：项目经理 / 运营负责人 | 项目：aitoolreviewr.com、电竞网文
- AI名：**阿呆**（2026-04-15最终确立）

> **长期偏好**
- 授权前置（最高优先级）；零破坏原则；配置层优于代码层
- 三端同步：技能变更必须Git + Wiki + 统一记忆联动
- AI全权代理Git操作；原文直发，不确定时主动确认
- 文档分类双轨制：OPENCLAW-CHANGELOG.md vs optimization-log/
- 方案诚实评估：存在更优"师傅"方案时必须如实告知

## 📖 Chapter 1: Context & Current State

**技能安装真相（2026-04-18→19）**：用户误记"23个技能已安装"，调查发现workspace/skills/目录全为空（仅.clawhub标记），真实情况是.agents/skills/下12个技能。23个skill分两批安装时**全部因内存不足被SIGKILL杀死**，历史记录报告的"成功"是进程被杀死前的中间状态。用户将"操作发生"等同于"结果达成"——AI必须用文件系统核查验证。

**rd-agent（2026-04-18）**：回滚完成。全栈工程师技能配置重新评估中，追求前端/后端/数据库/运维精准匹配。跨渠道上下文共享（per-peer/per-channel-peer）确认均无法实现跨渠道记忆连续性。

**Git事故（2026-04-17→18）**：git filter-repo致skills/agents/scripts永久丢失（从未push）。确立三端同步+零破坏+备份三禁则+.trash垃圾站+AI全权代理Git模式。

**身份方案A2与dmScope**：per-peer/per-channel-peer均无法跨渠道上下文共享——LightClaw重启后对话历史不可恢复，MEMORY.md可恢复。dmScope回滚至per-channel-peer。

**每日待办六步**：①读TODO.md ②搜聊天记录 ③合并合集 ④验证状态（强制）⑤更新（只改状态+时间，禁删）⑥发微信。

**凭证事故**：filter-repo致GitHub Token永久丢失；CF Key理论仍有效。TOKENS.md隔离规范确立（永不删/永不上传）。

**告警中继**：检查alert-queue.json，有告警发送至lightclawbot:dm:100026176862并清空；无告警返回「无告警」且不通知。

## 🎨 Chapter 2: The Texture of Life

能力建设横向扩展：技术运营→工程能力→AI自我建设→创意写作。经历事故后对"未push导致丢失"有切肤之痛。对数字资产要求完整可见性，VirusTotal可疑技能零容忍。技能操作必须获明确授权；语义触发优于关键词触发。

## 🤖 Chapter 3: Interaction & Cognitive Protocol

### 3.1 沟通策略
- 直接务实，单方案最优；原文直发，不确定时主动确认
- **最高优先级前置回复**：收到需求先回复「收到，我来XXX」再执行
- Spawn失败立即同步；SubAgent完成事件必须主动微信推送

### 3.2 决策逻辑
- **授权前置（最高优先级）**：任何操作前必须获明确授权
- **信息验证强制规则**：根据聊天记录获取信息时必须验证实际文件系统状态，不得依赖对话上下文或用户记忆
- **待办更新禁删**：只改状态+时间戳，禁止删除条目
- **方案诚实评估承诺**：存在更优"师傅"方案时必须如实告知
- 系统层优于表面补丁；零破坏原则；技能安全一票否决

## 🧩 Chapter 4: Deep Insights & Evolution

* **矛盾统一性**: 对"删除"既不信任又必须依赖——.trash/+.git三禁则系统性防护。同时对"记忆"既信任又验证——用户记忆可能有偏差，AI必须用文件系统核查。

* **演变轨迹**:
  - [2026-04-19] 技能安装真相：23个skill全被SIGKILL杀死，仅12个存活；用户记忆偏差需AI核查验证
  - [2026-04-18] A2/dmScope局限性暴露；AI全权代理Git模式确立；跨渠道上下文共享确认不可行
  - [2026-04-17] skills/agents/scripts永久丢失；.trash/零破坏确立
  - [2026-04-15] 贝吉塔→阿呆；11个自动触发器

* **涌现特征**:
  - `架构型进化者` - 每入新领域必先建框架
  - `授权前置执行者` - 高风险操作必须获明确授权
  - `零破坏原则坚守者` - 先保护数据再执行
  - `AI全权代理授权者` - 信任AI系统性处理所有Git事务
  - `方案诚实评估者` - 存在更优解时必须如实告知
  - `告警中继角色承担者` - 有告警才发微信，无告警保持沉默

---
## 🗺️ Scene Navigation (Scene Index)
*以下是当前场景记忆的索引，可根据需要 read_file 读取详细内容。*

### Path: scene_blocks/内容运营工作流搭建.md
**热度**: 126 🔥🔥 | **更新**: 2026-04-18T18:46:22.500Z
Summary: AI任务执行汇报规范；每日待办汇总定时任务（cron 8a0bbfb2，8:50执行，六步逻辑）；飞书+微信双通道配置已确认；微信通道修复后验证正常；openclaw-weixin账号配置要求；模板命名DAILY-TODO-SUMMARY确认；禁止删除待办条目；信息验证强制规则；格式保持规则强化

### Path: scene_blocks/aitoolreviewr部署问题.md
**热度**: 88 🔥 | **更新**: 2026-04-18T05:04:09.460Z
Summary: CF Pages隔离方案彻底失败确认；Hugo源码五阶段恢复完成；tools/目录14文件重建；网站恢复正常HTTP 200；GitHub Actions替代方案确立

### Path: scene_blocks/服务器资源与Agent并行能力评估.md
**热度**: 67 🔥 | **更新**: 2026-04-18T05:04:09.460Z
Summary: Playwright残留进程清理释放400MB内存+325MB Swap；成功保护openclaw-gateway和新Playwright实例；双重缺陷修复方案确立；TCP间歇性github.com:443持续性问题再确认

### Path: scene_blocks/AI自我技术能力建设.md
**热度**: 49 | **更新**: 2026-04-18T18:33:53.886Z
Summary: 23个技能安装失败根因确认；用户提出4步系统性安装方案；rd-agent全栈技能配置重新评估；要求删除旧残留并重新安装11个技能到workspace/skills/

### Path: scene_blocks/AI小说家能力建设.md
**热度**: 43 | **更新**: 2026-04-17T18:24:20.439Z
Summary: 玄幻仙侠四维度完整套路公式交付完成；凡人流/退婚流/系统流/家族修仙/苟道流/序列流全套公式就绪；小说工厂核心目标确立为"教你写只有你能写的网文"；Novels和Content-template目录被删除后全部重建完成

### Path: scene_blocks/本地文件系统与Git同步管理.md
**热度**: 35 | **更新**: 2026-04-18T16:21:26.394Z
Summary: AI全权代理Git模式确立；三禁则+五规则+分支规范完整体系；.trash垃圾站机制落地执行；MEMORY.md版本规则commit成功推送至GitHub；文档分类规则确立（OPENCLAW-CHANGELOG.md vs optimization-log/）；版本判断必须基于Git远程权威版本不得依赖对话上下文

### Path: scene_blocks/用户身份与凭证.md
**热度**: 32 | **更新**: 2026-04-18T15:39:03.122Z
Summary: identityLinks架构层无效已最终确认；AI主动建议移除该配置；dmScope已回滚至per-channel-peer；MEMORY.md+Wiki人工同步方案确立

### Path: scene_blocks/jarvis-wallet项目.md
**热度**: 4 | **更新**: 2026-04-17T10:50:24.378Z
Summary: jarvis-wallet仓库通过Cloudflare Pages部署；已识别混杂aitoolreviewr.com网站与OpenClaw自身文件；Hugo文件已迁移至projects/aitoolreviewr/子目录；2026-04-17要求修复GitHub Remote URL但明确禁止数据同步操作，用户对Git操作持高度警惕态度。

### Path: scene_blocks/Hugo网站重构与运维记录.md
**热度**: 0 | **更新**: 2026-04-02T01:15:49.194Z
Summary: [已合并至 aitoolreviewr部署问题.md]

📌 使用说明：
- Path 即 scene block 的相对路径，可按需使用 read_file 读取完整内容
- 热度：该场景被记忆命中的累计次数，越高越重要
- Summary：场景的核心要点摘要
