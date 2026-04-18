# 垃圾站索引 (.trash/)

> 记录已删除但可恢复的文件
> 实际 .trash/ 目录在 .gitignore 中，不推送到 GitHub
> 本索引文件同步到 GitHub，供查阅历史删除记录

---

## 目录结构

```
.trash/
├── INDEX.md              ← 索引文件（.trash/ 内）
├── 2026-04-12/           ← 2026年4月12日删除
├── 2026-04-17/           ← 2026年4月17日删除
└── 2026-04-18/           ← 2026年4月18日删除
```

---

## 2026-04-18 删除

| 原路径 | 内容 | 删除原因 |
|--------|------|----------|
| `Makefile` | CF Pages 构建文件 | CF Pages 不支持 make |
| `scripts/deploy-hugo.sh` | Hugo 隔离部署脚本 | 隔离方案失败 |
| `projects/aitoolreviewr/cloudflare-pages.toml` | CF Pages 配置 | CF Pages 不读取此文件 |
| `projects/aitoolreviewr/` | Hugo 隔离尝试残留 | 含 public/~5MB、resources/、hugo_stats.json |

**详情：**
- `projects/aitoolreviewr/public/` - 旧版网站构建产物（18篇文章）
- `projects/aitoolreviewr/resources/` - Hugo 资源目录
- `projects/aitoolreviewr/hugo_stats.json` - Hugo 构建统计

---

## 2026-04-17 删除

| 原路径 | 内容 | 删除原因 |
|--------|------|----------|
| `ui-aesthetic-standards/` | UI 美学标准参考 | 隔离尝试废弃 |
| `ui-design-standards/` | UI 设计标准文件 | 隔离尝试废弃 |
| `state/` | 状态文件（空） | 清理废弃目录 |
| `static/` | 静态资源旧版 | 被新版替代 |
| `articles/` | 旧文章 HTML 文件 | Hugo 源码迁移后残留 |

---

## 2026-04-12 删除

| 原路径 | 内容 | 删除原因 |
|--------|------|----------|
| `ui-design-standards/` | UI 设计标准早期版本 | 已重建新版本 |

---

## 恢复方法

```bash
# 从垃圾站恢复文件
cp -r .trash/2026-04-18/projects-aitoolreviewr/hugo_stats.json ./
```

---

*最后更新：2026-04-18*
