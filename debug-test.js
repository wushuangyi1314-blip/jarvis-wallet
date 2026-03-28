const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  // Test dark mode more carefully
  const darkCtx = await browser.newContext({ colorScheme: 'dark' });
  const darkPage = await darkCtx.newPage();
  await darkPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  
  // Check CSS variables
  const cssVars = await darkPage.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      bg: styles.getPropertyValue('--bg').trim(),
      bgAlt: styles.getPropertyValue('--bg-alt').trim(),
      text: styles.getPropertyValue('--text').trim(),
    };
  });
  console.log('CSS variables in dark mode:', cssVars);
  
  // Check prefers-color-scheme
  const prefersDark = await darkPage.evaluate(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  console.log('prefers-color-scheme: dark:', prefersDark);
  
  // Check body computed styles
  const bodyStyles = await darkPage.evaluate(() => {
    const body = document.body;
    const styles = getComputedStyle(body);
    return {
      backgroundColor: styles.backgroundColor,
      color: styles.color,
    };
  });
  console.log('Body styles:', bodyStyles);
  
  // Check if CSS file loaded with dark mode
  const darkModeStyles = await darkPage.evaluate(() => {
    const allStyles = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.media && rule.media.mediaText && rule.media.mediaText.includes('prefers-color-scheme')) {
            allStyles.push(rule.media.mediaText);
          }
        }
      } catch(e) {}
    }
    return allStyles;
  });
  console.log('Dark mode media queries found:', darkModeStyles.length);
  
  await darkCtx.close();
  
  // Test hero image
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('https://aitoolreviewr.com/articles/ai-writing-tools-2026/', { waitUntil: 'networkidle' });
  
  const heroInfo = await mobilePage.evaluate(() => {
    const img = document.querySelector('.article-hero-img');
    if (!img) return 'not found';
    const styles = getComputedStyle(img);
    return {
      width: styles.width,
      height: styles.height,
      aspectRatio: styles.aspectRatio,
      objectFit: styles.objectFit,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      boundingBox: img.getBoundingClientRect(),
    };
  });
  console.log('\nHero image info:', JSON.stringify(heroInfo, null, 2));
  
  await mobileCtx.close();
  
  // Test category wall
  const pcCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pcPage = await pcCtx.newPage();
  await pcPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  
  const catInfo = await pcPage.evaluate(() => {
    const wall = document.querySelector('.category-wall');
    if (!wall) return 'not found';
    const tags = Array.from(document.querySelectorAll('.category-tag'));
    const wallBox = wall.getBoundingClientRect();
    const tagPositions = tags.map(t => {
      const box = t.getBoundingClientRect();
      return { text: t.textContent.trim(), y: box.y, x: box.x, width: box.width };
    });
    return { wallBox, tagPositions };
  });
  console.log('\nCategory wall info:', JSON.stringify(catInfo, null, 2));
  
  await pcCtx.close();
  
  await browser.close();
})();
