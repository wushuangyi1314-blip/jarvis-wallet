const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  // Test dark mode
  const darkCtx = await browser.newContext({ colorScheme: 'dark' });
  const darkPage = await darkCtx.newPage();
  await darkPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await darkPage.waitForTimeout(2000);
  
  const darkVars = await darkPage.evaluate(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    return {
      bg: styles.getPropertyValue('--bg').trim(),
      bgAlt: styles.getPropertyValue('--bg-alt').trim(),
    };
  });
  console.log('Dark mode CSS vars:', darkVars);
  
  // Check article page hero at 375px
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('https://aitoolreviewr.com/articles/ai-writing-tools-2026/', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(2000);
  
  const heroStyles = await mobilePage.evaluate(() => {
    const img = document.querySelector('.article-hero-img');
    if (!img) return 'NOT FOUND';
    const s = getComputedStyle(img);
    return {
      aspectRatio: s.aspectRatio,
      width: s.width,
      height: s.height,
      maxHeight: s.maxHeight,
    };
  });
  console.log('\nHero styles at 375px:', heroStyles);
  
  // Check homepage categories
  const pcCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pcPage = await pcCtx.newPage();
  await pcPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await pcPage.waitForTimeout(2000);
  
  const homeCats = await pcPage.evaluate(() => {
    const walls = document.querySelectorAll('.category-wall, .category-wall-wrapper, [class*="category-wall"]');
    const tags = document.querySelectorAll('.category-tag');
    return { 
      wallsFound: walls.length, 
      tagsFound: tags.length,
      wallClasses: Array.from(walls).map(el => el.className),
    };
  });
  console.log('\nHomepage categories:', homeCats);
  
  await browser.close();
})();
