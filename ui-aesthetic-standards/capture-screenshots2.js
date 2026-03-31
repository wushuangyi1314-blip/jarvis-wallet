const { chromium } = require('playwright');

const remaining = [
  { name: 'medium', url: 'https://medium.com' },
  { name: 'substack', url: 'https://substack.com' },
  { name: 'perplexity', url: 'https://www.perplexity.ai' },
  { name: 'reddit', url: 'https://www.reddit.com' },
  { name: 'hacker-news', url: 'https://news.ycombinator.com' },
  { name: 'google', url: 'https://www.google.com' },
];

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  for (const site of remaining) {
    try {
      const page = await context.newPage();
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ 
        path: `/root/.openclaw/workspace/ui-aesthetic-standards/screenshots/${site.name}.png`,
        fullPage: false 
      });
      console.log(`✓ Captured: ${site.name}`);
      await page.close();
    } catch (e) {
      console.log(`✗ Failed: ${site.name} - ${e.message.split('\n')[0]}`);
    }
  }
  
  await browser.close();
  console.log('Done!');
}

capture();
