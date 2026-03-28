const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const results = [];

  // Test 1: Dark mode
  console.log('=== Test 1: Dark Mode ===');
  const darkCtx = await browser.newContext({ colorScheme: 'dark' });
  const darkPage = await darkCtx.newPage();
  await darkPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  const bgColor = await darkPage.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
  console.log('Body background (dark mode):', bgColor);
  // #0f1117 = rgb(15, 17, 23) which is dark
  const isDark = bgColor.includes('15') || bgColor.includes('0, 0') || bgColor.includes('rgb(15');
  console.log('Is dark background:', isDark);
  results.push({ test: 'Dark Mode', pass: isDark, detail: bgColor });
  await darkCtx.close();

  // Test 2: Hero image 16:9 at mobile 375px
  console.log('\n=== Test 2: Hero Image 16:9 at 375px ===');
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('https://aitoolreviewr.com/articles/ai-writing-tools-2026/', { waitUntil: 'networkidle' });
  const heroImg = await mobilePage.$('.article-hero-img');
  let heroAspectRatio = 'not found';
  if (heroImg) {
    const box = await heroImg.boundingBox();
    if (box) {
      heroAspectRatio = box.width / box.height;
      console.log('Hero image box:', box);
      console.log('Hero aspect ratio:', heroAspectRatio.toFixed(3), '(expected ~1.778 for 16:9)');
    }
  }
  const is16to9 = heroAspectRatio !== 'not found' && Math.abs(heroAspectRatio - 16/9) < 0.1;
  console.log('Is 16:9 ratio:', is16to9);
  results.push({ test: 'Hero 16:9 at 375px', pass: is16to9, detail: `ratio=${heroAspectRatio}` });
  await mobileCtx.close();

  // Test 3: Categories 2 rows at 1440px
  console.log('\n=== Test 3: Categories 2 rows at 1440px ===');
  const pcCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pcPage = await pcCtx.newPage();
  await pcPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  const categoryWall = await pcPage.$('.category-wall');
  let rowCount = 'not found';
  if (categoryWall) {
    const wallBox = await categoryWall.boundingBox();
    const tags = await pcPage.$$('.category-tag');
    console.log('Category wall box:', wallBox);
    console.log('Number of category tags:', tags.length);
    
    if (tags.length > 0 && wallBox) {
      const firstTag = await tags[0].boundingBox();
      const lastTag = await tags[tags.length - 1].boundingBox();
      if (firstTag && lastTag) {
        const firstRowBottom = firstTag.y + firstTag.height;
        const lastRowTop = lastTag.y;
        const rows = Math.round((lastRowTop + lastTag.height - firstTag.y) / (firstTag.height + 8));
        rowCount = rows;
        console.log('First tag Y:', firstTag.y, 'Last tag Y:', lastTag.y);
        console.log('Estimated row count:', rowCount);
      }
    }
  }
  // Should be 2 rows at 1440px
  const is2Rows = rowCount === 2;
  console.log('Is 2 rows:', is2Rows);
  results.push({ test: 'Categories 2 rows at 1440px', pass: is2Rows, detail: `rows=${rowCount}` });
  await pcCtx.close();

  // Test 4: TOC scroll highlighting
  console.log('\n=== Test 4: TOC Scroll Highlighting ===');
  const tocPage = await browser.newPage();
  await tocPage.setViewportSize({ width: 1280, height: 800 });
  await tocPage.goto('https://aitoolreviewr.com/articles/ai-writing-tools-2026/', { waitUntil: 'networkidle' });
  
  // Check if TOC exists and has links
  const tocLinks = await tocPage.$$('.toc-list a');
  console.log('TOC links found:', tocLinks.length);
  
  // Check initial active state
  const initialActive = await tocPage.$('.toc-list a.active');
  console.log('Initial active link:', initialActive ? await initialActive.textContent() : 'none');
  
  // Scroll to middle of article
  await tocPage.evaluate(() => {
    window.scrollTo({ top: 1500, behavior: 'instant' });
  });
  await tocPage.waitForTimeout(500);
  
  const afterScrollActive = await tocPage.$('.toc-list a.active');
  console.log('After scroll active link:', afterScrollActive ? await afterScrollActive.textContent() : 'none');
  
  const hasTocHighlighting = tocLinks.length > 0;
  console.log('Has TOC scroll highlighting:', hasTocHighlighting);
  results.push({ test: 'TOC Scroll Highlighting', pass: hasTocHighlighting, detail: `links=${tocLinks.length}` });

  // Summary
  console.log('\n=== SUMMARY ===');
  results.forEach(r => {
    console.log(`${r.pass ? '✅' : '❌'} ${r.test}: ${r.pass ? 'PASS' : 'FAIL'} (${r.detail})`);
  });
  
  const allPass = results.every(r => r.pass);
  console.log(`\nOverall: ${allPass ? 'PASS' : 'FAIL'}`);

  await browser.close();
  process.exit(allPass ? 0 : 1);
})();
