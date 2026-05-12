# 浏览器使用规则

> 最后更新：2026-05-12 23:06 by 阿呆

---

## 核心原则

**OpenClaw browser 已降级为备用方案。**

主要使用：
- **agent-browser-clawdbot** — 日常浏览、截图、简单交互
- **playwright** — 复杂交互、PDF/视频、多步骤自动化

---

## 场景选择规则

### 快速判断流程

```
1. 是否需要复杂多步交互（多表单、复杂点击链）？
   → YES: playwright
   
2. 是否需要Session隔离、网络拦截Mock、批量任务？
   → YES: agent-browser
   
3. 默认: agent-browser
```

---

## 场景对照表

| 场景 | 推荐工具 | 原因 |
|------|---------|------|
| 快速查看网页 | agent-browser | 最稳定可靠 |
| 截图 | agent-browser | 更稳定 |
| 填表/点击（简单） | agent-browser | CLI直观 |
| 填表/点击（复杂多步） | playwright | API完整成熟 |
| Session隔离 | agent-browser | 原生支持隔离 |
| 网络拦截/Mock | agent-browser | 原生支持 |
| PDF生成 | playwright | 原生支持 |
| 视频录制 | playwright | 原生支持 |
| 移动端模拟 | playwright | 支持设备模拟 |
| 定时批量任务 | agent-browser | 支持批量 |
| Accessibility Tree | agent-browser | 原生优化 |

---

## 工具对比

| 功能 | agent-browser-clawdbot | playwright |
|------|----------------------|-----------|
| 打开网页 | ✅ | ✅ |
| 截图 | ✅ | ✅ |
| PDF生成 | ❌ | ✅ |
| 视频录制 | ❌ | ✅ |
| 填表/点击 | ✅ | ✅ |
| Session隔离 | ✅ | ⚠️ 需配置 |
| 网络拦截 | ✅ | ❌ |
| Tab管理 | ✅ | ❌ |
| 移动端模拟 | ❌ | ✅ |
| 批量任务 | ✅ | ⚠️ 需脚本 |
| Accessibility Tree | ✅ | ⚠️ |
| 安装状态 | ✅ 已安装 | ✅ 已安装 |

---

## OpenClaw browser（备用）

**状态：仅作为最后备选**

| 功能 | 状态 | 说明 |
|------|------|------|
| 打开网页 | ⚠️ 有时可用 | 不稳定 |
| 截图 | ⚠️ 超时 | 已降级 |
| act操作 | ❌ 不可用 | 持续超时 |

**何时使用：** agent-browser 和 playwright 都无法工作时。

---

## 反Bot能力

| 工具 | 基础伪装 | 说明 |
|------|---------|------|
| agent-browser | ✅ 有 | Session隔离 + 基础伪装 |
| playwright | ⚠️ 有限 | 需额外stealth配置 |

**注意：服务器网络可能无法访问某些网站（Google等），这是服务器环境限制，不是工具问题。**

---

## 故障排查

| 问题 | 解决 |
|------|------|
| agent-browser报错 | 检查命令是否正确，重启browser服务 |
| playwright脚本慢 | 复用browser实例，避免频繁launch/close |
| 网络超时 | 服务器无法访问外网，尝试其他目标 |

---

## 调用示例

### agent-browser-clawdbot

```bash
# 打开网页并获取快照
agent-browser open https://example.com
agent-browser snapshot -i --json

# 点击和输入
agent-browser click @e2
agent-browser fill @e3 "text"

# 截图
agent-browser screenshot output.png

# Session隔离
agent-browser --session mysession open https://example.com
```

### playwright

```javascript
const { chromium } = require('playwright');

// 基本浏览
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'page.png' });
  await browser.close();
})();

// 复杂交互
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://example.com');
  await page.fill('#username', 'user');
  await page.fill('#password', 'pass');
  await page.click('#submit');
  
  await page.waitForNavigation();
  console.log(await page.title());
  await browser.close();
})();
```

---

## 安装记录

| 工具 | 安装时间 | 状态 |
|------|---------|------|
| agent-browser-clawdbot | 2026-05-12 | ✅ 已安装 |
| playwright | 2026-05-12 | ✅ 已安装 |