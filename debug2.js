const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  // Test dark mode with longer wait
  const darkCtx = await browser.newContext({ colorScheme: 'dark' });
  const darkPage = await darkCtx.newPage();
  
  // Listen for console errors
  darkPage.on('console', msg => {
    if (msg.type() === 'error') console.log('Console error:', msg.text());
  });
  
  await darkPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await darkPage.waitForTimeout(2000);
  
  // Check if stylesheet loaded
  const stylesLoaded = await darkPage.evaluate(() => {
    return Array.from(document.styleSheets).map(s => ({
      href: s.href,
      rulesCount: s.cssRules ? s.cssRules.length : 'blocked'
    }));
  });
  console.log('Stylesheets:', stylesLoaded.length, stylesLoaded.slice(0, 3));
  
  // Check computed style for article-hero-img at mobile
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('https://aitoolreviewr.com/articles/ai-writing-tools-2026/', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(2000);
  
  const heroComputed = await mobilePage.evaluate(() => {
    const img = document.querySelector('.article-hero-img');
    if (!img) return 'NOT FOUND';
    const styles = getComputedStyle(img);
    return {
      aspectRatio: styles.aspectRatio,
      width: styles.width,
      height: styles.height,
      cssText: styles.cssText,
    };
  });
  console.log('\nHero computed style:', heroComputed);
  
  // Check for category wall class
  const catCheck = await mobilePage.evaluate(() => {
    // Check homepage source for category wall
    const walls = document.querySelectorAll('[class*="category"]');
    return Array.from(walls).map(el => el.className);
  });
  console.log('\nCategory elements on article page:', catCheck.slice(0, 10));
  
  await mobileCtx.close();
  await darkCtx.close();
  await browser.close();
})();
