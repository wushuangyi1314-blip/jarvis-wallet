const { chromium } = require('/root/.nvm/versions/node/v22.22.1/lib/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Test 1: Dark mode - Homepage (mobile viewport, dark color scheme)
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: 'dark'
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: '/root/.openclaw/workspace/test1-dark-mobile-homepage.png', fullPage: false });
  console.log('Test 1: Dark mode mobile homepage screenshot saved');
  
  const bgColor = await mobilePage.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
  console.log('Body background color (dark mode):', bgColor);
  
  // Test 2: Mobile hero image 16:9
  const mobilePage2 = await mobileCtx.newPage();
  await mobilePage2.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  await mobilePage2.screenshot({ path: '/root/.openclaw/workspace/test2-mobile-hero.png', fullPage: false });
  
  const heroImg = await mobilePage2.evaluate(() => {
    // Find hero section
    const heroSections = document.querySelectorAll('section, div[class*="hero"], div[class*="Hero"]');
    for (const section of heroSections) {
      const imgs = section.querySelectorAll('img');
      for (const img of imgs) {
        if (img.naturalWidth > 100 && img.naturalHeight > 100) {
          return {
            width: img.naturalWidth,
            height: img.naturalHeight,
            ratio: img.naturalWidth / img.naturalHeight,
            ratioStr: `${img.naturalWidth}:${img.naturalHeight}`
          };
        }
      }
    }
    // Fallback: find any large image
    const imgs = document.querySelectorAll('img');
    for (const img of imgs) {
      if (img.naturalWidth > 300) {
        return {
          width: img.naturalWidth,
          height: img.naturalHeight,
          ratio: img.naturalWidth / img.naturalHeight,
          ratioStr: `${img.naturalWidth}:${img.naturalHeight}`
        };
      }
    }
    return null;
  });
  console.log('Test 2: Hero image aspect ratio:', JSON.stringify(heroImg));
  
  // Test 3: PC category 2 rows (desktop viewport)
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light'
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  await desktopPage.screenshot({ path: '/root/.openclaw/workspace/test3-pc-homepage.png', fullPage: false });
  
  const categoryLayout = await desktopPage.evaluate(() => {
    // Find category grid sections
    const grids = document.querySelectorAll('[class*="grid"]');
    for (const grid of grids) {
      const style = window.getComputedStyle(grid);
      if (style.display === 'grid') {
        const children = Array.from(grid.children).filter(c => c.offsetHeight > 0);
        return {
          display: style.display,
          gridTemplateColumns: style.gridTemplateColumns,
          gridTemplateRows: style.gridTemplateRows,
          childCount: children.length,
          columnsCount: style.gridTemplateColumns.split(' ').length
        };
      }
    }
    return null;
  });
  console.log('Test 3: Category grid layout:', JSON.stringify(categoryLayout));
  
  // Test 4: TOC scroll highlighting on article page
  const articlePage = await desktopCtx.newPage();
  await articlePage.goto('https://aitoolreviewr.com/articles/ai-writing-tools-2026/', { waitUntil: 'networkidle' });
  await articlePage.screenshot({ path: '/root/.openclaw/workspace/test4-article-desktop.png', fullPage: false });
  
  const tocInitial = await articlePage.evaluate(() => {
    const toc = document.querySelector('[class*="toc"], [class*="TOC"], [class*="table-of-contents"], nav[class*="content"]');
    if (!toc) return { found: false };
    const links = toc.querySelectorAll('a');
    return {
      found: true,
      totalLinks: links.length,
      linksInfo: Array.from(links).slice(0, 10).map(l => ({
        text: l.textContent.trim().substring(0, 40),
        classes: l.className,
        href: l.getAttribute('href')
      }))
    };
  });
  console.log('Test 4: TOC initial state:', JSON.stringify(tocInitial, null, 2));
  
  // Scroll to middle of article and check for TOC highlight
  await articlePage.evaluate(() => {
    window.scrollBy(0, window.innerHeight * 2);
  });
  await articlePage.waitForTimeout(1000);
  await articlePage.screenshot({ path: '/root/.openclaw/workspace/test4-article-scrolled.png', fullPage: false });
  
  const tocHighlight = await articlePage.evaluate(() => {
    const toc = document.querySelector('[class*="toc"], [class*="TOC"], [class*="table-of-contents"]');
    if (!toc) return null;
    const links = toc.querySelectorAll('a');
    const activeLinks = Array.from(links).filter(l => 
      l.className.includes('active') || 
      l.className.includes('current') ||
      l.style.color !== ''
    );
    return {
      totalLinks: links.length,
      activeLinks: activeLinks.length,
      linksInfo: Array.from(links).slice(0, 10).map(l => ({
        text: l.textContent.trim().substring(0, 40),
        classes: l.className,
        color: l.style.color
      }))
    };
  });
  console.log('Test 4: TOC after scroll:', JSON.stringify(tocHighlight, null, 2));
  
  await browser.close();
  console.log('\nAll tests completed!');
})();
