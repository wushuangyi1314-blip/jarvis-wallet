const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const results = [];

  // ============================================================
  // Test 1: Dark Mode on DEPLOYED site
  // ============================================================
  console.log('=== Test 1: Dark Mode ===');
  const darkCtx = await browser.newContext({ colorScheme: 'dark' });
  const darkPage = await darkCtx.newPage();
  await darkPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle', timeout: 30000 });
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
  const isDark = darkBg.includes('15') || darkBg.includes('0, 0') || darkBg.includes('0,0,0') || darkVars.bg === '#0f1117' || darkVars.bg === '#1a1d27';
  console.log('Dark mode PASS:', isDark);
  results.push({ test: 'Dark Mode', pass: isDark, detail: `bg=${darkBg}` });
  await darkCtx.close();

  // ============================================================
  // Test 2: Hero Image 16:9 at mobile 375px (deployed site)
  // ============================================================
  console.log('\n=== Test 2: Hero Image 16:9 at 375px ===');
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('https://aitoolreviewr.com/articles/ai-writing-tools-2026/', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(1000);
  
  // Find article hero image
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
  // Test 3: Categories 2 rows at 1440px (deployed site)
  // ============================================================
  console.log('\n=== Test 3: Categories 2 rows at 1440px ===');
  const pcCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pcPage = await pcCtx.newPage();
  await pcPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await pcPage.waitForTimeout(1000);
  
  // Check for category filter tabs
  const catTabs = await pcPage.$$('.category-tab');
  const catFilter = await pcPage.$('.category-filter');
  let catInfo = { tabs: 0, filterFound: false };
  if (catFilter) {
    catInfo.filterFound = true;
    const filterBox = await catFilter.boundingBox();
    console.log('Category filter box:', filterBox);
  }
  if (catTabs.length > 0) {
    catInfo.tabs = catTabs.length;
    const positions = [];
    for (let i = 0; i < catTabs.length; i++) {
      const box = await catTabs[i].boundingBox();
      positions.push({ text: await catTabs[i].textContent(), y: box?.y });
    }
    console.log('Category tabs:', positions.map(p => p.text.trim()).join(', '));
    
    // Count unique Y positions (rows)
    const uniqueYs = [...new Set(positions.map(p => Math.round(p.y)))];
    const rowCount = uniqueYs.length;
    console.log('Row count:', rowCount);
    catInfo.rowCount = rowCount;
  }
  const is2Rows = catInfo.rowCount === 2;
  console.log('Categories 2 rows PASS:', is2Rows);
  results.push({ test: 'Categories 2 rows at 1440px', pass: is2Rows, detail: `rows=${catInfo.rowCount || 'unknown'}, tabs=${catInfo.tabs}` });
  await pcCtx.close();

  // ============================================================
  // Test 4: TOC Scroll Highlighting (deployed site)
  // ============================================================
  console.log('\n=== Test 4: TOC Scroll Highlighting ===');
  const tocPage = await browser.newPage();
  await tocPage.setViewportSize({ width: 1280, height: 800 });
  await tocPage.goto('https://aitoolreviewr.com/articles/ai-writing-tools-2026/', { waitUntil: 'networkidle', timeout: 30000 });
  await tocPage.waitForTimeout(1000);
  
  const tocLinks = await tocPage.$$('.toc-list a');
  console.log('TOC links found:', tocLinks.length);
  
  // Check initial active state
  const initialActive = await tocPage.$('.toc-list a.active');
  const initialText = initialActive ? await initialActive.textContent() : 'none';
  console.log('Initial active TOC:', initialText.trim());
  
  // Scroll to different positions and check active state
  const scrollTests = [500, 1000, 2000, 3000, 4000];
  let tocHighlightWorking = false;
  for (const scrollY of scrollTests) {
    await tocPage.evaluate((y) => window.scrollTo(0, y), scrollY);
    await tocPage.waitForTimeout(300);
    const activeLink = await tocPage.$('.toc-list a.active');
    const activeText = activeLink ? await activeLink.textContent() : 'none';
    console.log(`After scroll to ${scrollY}: active = "${activeText.trim()}"`);
    if (activeLink) {
      tocHighlightWorking = true;
    }
  }
  console.log('TOC scroll highlighting PASS:', tocHighlightWorking);
  results.push({ test: 'TOC Scroll Highlighting', pass: tocHighlightWorking, detail: `links=${tocLinks.length}, highlighted=${tocHighlightWorking}` });

  // ============================================================
  // Summary
  // ============================================================
  console.log('\n=== FINAL ACCEPTANCE RESULTS ===');
  results.forEach(r => {
    console.log(`${r.pass ? '✅ PASS' : '❌ FAIL'} | ${r.test} | ${r.detail}`);
  });
  
  const allPass = results.every(r => r.pass);
  console.log(`\nOverall: ${allPass ? '✅ ALL PASS' : '❌ SOME FAILED'}`);
  console.log(`Result: ${allPass ? 'PASS' : 'FAIL'}`);

  await browser.close();
  process.exit(allPass ? 0 : 1);
})();
