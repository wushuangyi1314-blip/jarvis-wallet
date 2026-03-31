const { chromium } = require('/root/.nvm/versions/node/v22.22.1/lib/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Test 1: Dark mode - check CSS and computed styles more carefully
  const darkCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: 'dark'
  });
  const darkPage = await darkCtx.newPage();
  await darkPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  await darkPage.waitForTimeout(2000); // extra wait for JS
  
  // Check if site uses prefers-color-scheme or a class toggle
  const darkModeInfo = await darkPage.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const isDark = html.classList.contains('dark') || 
                   html.classList.contains('dark-mode') ||
                   html.classList.contains('night') ||
                   body.classList.contains('dark') ||
                   body.classList.contains('dark-mode');
    const bg = window.getComputedStyle(body).backgroundColor;
    const textColor = window.getComputedStyle(body).color;
    
    // Check for CSS media query support
    const hasDarkMedia = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check meta theme-color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    
    return {
      htmlClasses: html.className,
      bodyClasses: body.className,
      isDarkClass: isDark,
      bodyBg: bg,
      bodyTextColor: textColor,
      hasDarkMediaQuery: hasDarkMedia,
      metaThemeColor: metaTheme ? metaTheme.getAttribute('content') : null,
      // Check key element colors
      headerBg: window.getComputedStyle(document.querySelector('header') || document.body).backgroundColor,
    };
  });
  console.log('Dark mode info:', JSON.stringify(darkModeInfo, null, 2));
  await darkPage.screenshot({ path: '/root/.openclaw/workspace/test1a-dark-full.png', fullPage: true });
  
  // Test 2: Hero image - look specifically in hero section
  const mobilePage2 = await darkCtx.newPage();
  await mobilePage2.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  await mobilePage2.waitForTimeout(1000);
  await mobilePage2.screenshot({ path: '/root/.openclaw/workspace/test2a-mobile-hero-section.png', fullPage: false });
  
  const heroInfo = await mobilePage2.evaluate(() => {
    // Find hero section by common selectors
    const heroSelectors = [
      'section[class*="hero"]', 'div[class*="hero"]', 
      '[class*="Hero"]', 'header[class*="hero"]',
      '.hero-section', '#hero', '[data-section="hero"]'
    ];
    for (const sel of heroSelectors) {
      const el = document.querySelector(sel);
      if (el) {
        const img = el.querySelector('img');
        if (img && img.naturalWidth > 0) {
          return {
            selector: sel,
            imgSrc: img.src.substring(0, 80),
            width: img.naturalWidth,
            height: img.naturalHeight,
            ratio: img.naturalWidth / img.naturalHeight,
            ratioStr: `${img.naturalWidth}:${img.naturalHeight}`,
            containerW: el.offsetWidth,
            containerH: el.offsetHeight,
            containerRatio: el.offsetWidth / el.offsetHeight
          };
        }
      }
    }
    
    // Try finding first large image on page
    const imgs = document.querySelectorAll('img');
    const largeImgs = Array.from(imgs).filter(img => img.naturalWidth > 200 && img.offsetHeight > 0);
    if (largeImgs.length > 0) {
      const img = largeImgs[0];
      return {
        fallback: true,
        imgSrc: img.src.substring(0, 80),
        width: img.naturalWidth,
        height: img.naturalHeight,
        ratio: img.naturalWidth / img.naturalHeight,
        ratioStr: `${img.naturalWidth}:${img.naturalHeight}`,
        offsetTop: img.offsetTop
      };
    }
    return { found: false };
  });
  console.log('Hero image info:', JSON.stringify(heroInfo, null, 2));
  
  // Test 3: PC categories - scroll to them and check
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light'
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);
  
  // Scroll to find categories section
  await desktopPage.evaluate(() => window.scrollBy(0, 600));
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: '/root/.openclaw/workspace/test3a-pc-categories.png', fullPage: false });
  
  const catInfo = await desktopPage.evaluate(() => {
    // Find categories by common selectors
    const catSelectors = [
      '[class*="category"]', '[class*="Category"]',
      '[id*="category"]', '[data-section*="category"]'
    ];
    for (const sel of catSelectors) {
      const els = document.querySelectorAll(sel);
      for (const el of els) {
        if (el.offsetHeight > 50 && el.offsetWidth > 200) {
          const isGrid = window.getComputedStyle(el).display === 'grid';
          const isFlex = window.getComputedStyle(el).display === 'flex';
          const children = Array.from(el.children).filter(c => c.offsetHeight > 0);
          return {
            selector: sel,
            display: window.getComputedStyle(el).display,
            isGrid,
            childCount: children.length,
            gridCols: isGrid ? window.getComputedStyle(el).gridTemplateColumns : null,
            gridRows: isGrid ? window.getComputedStyle(el).gridTemplateRows : null,
            bounding: el.getBoundingClientRect()
          };
        }
      }
    }
    return { found: false };
  });
  console.log('Categories info:', JSON.stringify(catInfo, null, 2));
  
  // Test 4: TOC highlighting - scroll through article and check active state
  const articlePage = await desktopCtx.newPage();
  await articlePage.goto('https://aitoolreviewr.com/articles/ai-writing-tools-2026/', { waitUntil: 'networkidle' });
  await articlePage.waitForTimeout(1000);
  
  // First scroll to top and check TOC
  await articlePage.evaluate(() => window.scrollTo(0, 0));
  await articlePage.waitForTimeout(500);
  
  const tocBefore = await articlePage.evaluate(() => {
    const toc = document.querySelector('[class*="toc"], [class*="TOC"], aside[class*="content"]');
    if (!toc) return { found: false };
    const links = toc.querySelectorAll('a');
    return {
      found: true,
      totalLinks: links.length,
      activeLinks: Array.from(links).filter(l => 
        l.className.includes('active') || l.className.includes('current')
      ).length,
      classes: Array.from(links).map(l => l.className)
    };
  });
  console.log('TOC before scroll:', JSON.stringify(tocBefore));
  
  // Scroll through article step by step
  const scrollPositions = [500, 1000, 2000, 3000, 4000];
  for (const pos of scrollPositions) {
    await articlePage.evaluate((y) => window.scrollTo(0, y), pos);
    await articlePage.waitForTimeout(800);
    
    const tocState = await articlePage.evaluate(() => {
      const toc = document.querySelector('[class*="toc"], [class*="TOC"], aside[class*="content"]');
      if (!toc) return null;
      const links = Array.from(toc.querySelectorAll('a'));
      const activeLinks = links.filter(l => 
        l.className.includes('active') || l.className.includes('current') || l.style.color !== ''
      );
      return {
        scrollY: window.scrollY,
        activeCount: activeLinks.length,
        activeTexts: activeLinks.map(l => l.textContent.trim().substring(0, 40)),
        linkClasses: links.map(l => l.className),
        linkStyles: links.map(l => l.style.color)
      };
    });
    console.log(`TOC at scroll ${pos}:`, JSON.stringify(tocState));
  }
  
  await articlePage.screenshot({ path: '/root/.openclaw/workspace/test4a-article-scroll-end.png', fullPage: false });
  
  await browser.close();
  console.log('\nAll tests completed!');
})();
