const { chromium } = require('playwright');

const websites = {
  'social-media': [
    { name: 'x-twitter', url: 'https://x.com' },
    { name: 'bluesky', url: 'https://bsky.app' },
    { name: 'linkedin', url: 'https://www.linkedin.com' },
    { name: 'mastodon', url: 'https://mastodon.social' },
  ],
  'saas-tools': [
    { name: 'notion', url: 'https://www.notion.so' },
    { name: 'figma', url: 'https://www.figma.com' },
    { name: 'linear', url: 'https://linear.app' },
    { name: 'canva', url: 'https://www.canva.com' },
  ],
  'content-media': [
    { name: 'medium', url: 'https://medium.com' },
    { name: 'substack', url: 'https://substack.com' },
    { name: 'devto', url: 'https://dev.to' },
  ],
  'ecommerce': [
    { name: 'shopify-store', url: 'https://www.shopify.com' },
    { name: 'apple-store', url: 'https://www.apple.com/shop' },
    { name: 'etsy', url: 'https://www.etsy.com' },
  ],
  'ai-products': [
    { name: 'openai', url: 'https://openai.com' },
    { name: 'anthropic', url: 'https://www.anthropic.com' },
    { name: 'midjourney', url: 'https://www.midjourney.com' },
    { name: 'cursor', url: 'https://cursor.com' },
  ],
  'search-engines': [
    { name: 'google', url: 'https://www.google.com' },
    { name: 'perplexity', url: 'https://www.perplexity.ai' },
  ],
  'forums': [
    { name: 'reddit', url: 'https://www.reddit.com' },
    { name: 'hacker-news', url: 'https://news.ycombinator.com' },
  ]
};

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  for (const [category, sites] of Object.entries(websites)) {
    console.log(`\n=== ${category} ===`);
    for (const site of sites) {
      try {
        const page = await context.newPage();
        await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        // Wait a bit for dynamic content
        await page.waitForTimeout(3000);
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
  }
  
  await browser.close();
  console.log('\nDone!');
}

captureScreenshots();
