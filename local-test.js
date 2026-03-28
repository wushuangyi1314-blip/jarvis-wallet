const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const results = [];

  // ============================================================
  // Test 1: Dark Mode on LOCAL server (with local CSS)
  // ============================================================
  console.log('=== Test 1: Dark Mode (Local Build) ===');
  const darkCtx = await browser.newContext({ colorScheme: 'dark' });
  const darkPage = await darkCtx.newPage();
  
  // Intercept CSS requests to use local files
  await darkPage.route('**/style.css*', route => {
    const url = route.request().url();
    if (url.includes('aitoolreviewr.com')) {
      route.fulfill({
        path: '/root/.openclaw/workspace/public/assets/css/style.css',
        headers: { 'content-type': 'text/css' }
      });
    } else {
      route.continue();
    }
  });
  
  await darkPage.goto('http://localhost:8081/index_local.html', { waitUntil: 'networkidle', timeout: 30000 });
  await darkPage.waitForTimeout(1000);
  
  const darkBg = await darkPage.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
  const darkVars = await darkPage.evaluate(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    return {
      bg: styles.getPropertyValue('--bg').trim(),
      text: styles.getPropertyValue('--text').trim(),
    };
  });
  console.log('Dark mode body bg:', darkBg);
  console.log('Dark mode CSS vars:', darkVars);
  const isDark = darkVars.bg === '#0f1117' || darkVars.bg === '#1a1d27' || darkBg.includes('15, 17') || darkBg.includes('0, 0, 0');
  console.log('Dark mode PASS:', isDark);
  results.push({ test: 'Dark Mode', pass: isDark, detail: `bg=${darkBg}, var(--bg)=${darkVars.bg}` });
  await darkCtx.close();

  // ============================================================
  // Test 2: Hero Image 16:9 at mobile 375px (local build)
  // ============================================================
  console.log('\n=== Test 2: Hero Image 16:9 at 375px (Local Build) ===');
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileCtx.newPage();
  
  await mobilePage.route('**/style.css*', route => {
    route.fulfill({
      path: '/root/.openclaw/workspace/public/assets/css/style.css',
      headers: { 'content-type': 'text/css' }
    });
  });
  
  await mobilePage.goto('http://localhost:8081/articles/ai-writing-tools-2026/index.html', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(1000);
  
  const heroImg = await mobilePage.$('.article-hero-img');
  let heroBox = null;
  if (heroImg) {
    heroBox = await heroImg.boundingBox();
  }
  console.log('Hero image bounding box:', heroBox);
  let heroRatio = 'not found';
  if (heroBox && heroBox.width > 0 && heroBox.height > 0) {
    heroRatio = heroBox.width / heroBox.height;
    console.log('Hero ratio:', heroRatio.toFixed(3), '(expected ~1.778)');
  }
  const is16to9 = heroRatio !== 'not found' && Math.abs(heroRatio - 16/9) < 0.15;
  console.log('Hero 16:9 PASS:', is16to9);
  results.push({ test: 'Hero 16:9 at 375px', pass: is16to9, detail: `ratio=${typeof heroRatio === 'number' ? heroRatio.toFixed(3) : heroRatio}` });
  await mobileCtx.close();

  // ============================================================
  // Test 3: Categories 2 rows at 1440px (local build)
  // ============================================================
  console.log('\n=== Test 3: Categories 2 rows at 1440px (Local Build) ===');
  const pcCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pcPage = await pcCtx.newPage();
  
  await pcPage.route('**/style.css*', route => {
    route.fulfill({
      path: '/root/.openclaw/workspace/public/assets/css/style.css',
      headers: { 'content-type': 'text/css' }
    });
  });
  
  await pcPage.goto('http://localhost:8081/index_local.html', { waitUntil: 'networkidle', timeout: 30000 });
  await pcPage.waitForTimeout(1000);
  
  // Check for category wall
  const catWall = await pcPage.$('.category-wall');
  const catTags = await pcPage.$$('.category-tag');
  console.log('Category wall found:', !!catWall);
  console.log('Category tags found:', catTags.length);
  
  let rowCount = 'unknown';
  if (catTags.length > 0 && catWall) {
    const positions = [];
    for (let i = 0; i < catTags.length; i++) {
      const box = await catTags[i].boundingBox();
      positions.push({ text: (await catTags[i].textContent()).trim(), y: Math.round(box?.y || 0) });
    }
    const uniqueYs = [...new Set(positions.map(p => p.y))];
    rowCount = uniqueYs.length;
    console.log('Category positions:', positions.map(p => `(${p.text}: y=${p.y})`).join(', '));
    console.log('Row count:', rowCount);
  }
  const is2Rows = rowCount === 2;
  console.log('Categories 2 rows PASS:', is2Rows);
  results.push({ test: 'Categories 2 rows at 1440px', pass: is2Rows, detail: `rows=${rowCount}, tags=${catTags.length}` });
  await pcCtx.close();

  // ============================================================
  // Test 4: TOC Scroll Highlighting (local build)
  // ============================================================
  console.log('\n=== Test 4: TOC Scroll Highlighting (Local Build) ===');
  const tocPage = await browser.newPage();
  await tocPage.setViewportSize({ width: 1280, height: 800 });
  
  await tocPage.route('**/style.css*', route => {
    route.fulfill({
      path: '/root/.openclaw/workspace/public/assets/css/style.css',
      headers: { 'content-type': 'text/css' }
    });
  });
  
  await tocPage.goto('http://localhost:8081/articles/ai-writing-tools-2026/index.html', { waitUntil: 'networkidle', timeout: 30000 });
  await tocPage.waitForTimeout(1000);
  
  const tocLinks = await tocPage.$$('.toc-list a');
  console.log('TOC links found:', tocLinks.length);
  
  let tocHighlightWorking = false;
  const scrollPositions = [500, 1000, 2000, 3000, 4000];
  for (const scrollY of scrollPositions) {
    await tocPage.evaluate((y) => window.scrollTo(0, y), scrollY);
    await tocPage.waitForTimeout(400);
    const activeLink = await tocPage.$('.toc-list a.active');
    const activeText = activeLink ? (await activeLink.textContent()).trim() : 'none';
    console.log(`Scroll ${scrollY}: active="${activeText}"`);
    if (activeLink) tocHighlightWorking = true;
  }
  console.log('TOC scroll highlighting PASS:', tocHighlightWorking);
  results.push({ test: 'TOC Scroll Highlighting', pass: tocHighlightWorking, detail: `links=${tocLinks.length}, highlighted=${tocHighlightWorking}` });

  // ============================================================
  // Summary
  // ============================================================
  console.log('\n=== FINAL ACCEPTANCE RESULTS (Local Build with Fixed CSS) ===');
  results.forEach(r => {
    console.log(`${r.pass ? '✅ PASS' : '❌ FAIL'} | ${r.test} | ${r.detail}`);
  });
  
  const allPass = results.every(r => r.pass);
  console.log(`\nOverall: ${allPass ? '✅ ALL PASS' : '❌ SOME FAILED'}`);
  console.log(`Result: ${allPass ? 'PASS' : 'FAIL'}`);

  await browser.close();
  process.exit(allPass ? 0 : 1);
})();
