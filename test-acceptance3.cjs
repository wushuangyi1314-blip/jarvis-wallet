const { chromium } = require('/root/.nvm/versions/node/v22.22.1/lib/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Mobile test - hero image specifically
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: 'dark'
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);
  
  // Look at the page structure
  const pageStructure = await mobilePage.evaluate(() => {
    // Get the first 3 sections
    const sections = document.querySelectorAll('section, header, main > div');
    const result = [];
    for (let i = 0; i < Math.min(5, sections.length); i++) {
      const s = sections[i];
      const imgs = s.querySelectorAll('img');
      const bg = window.getComputedStyle(s).backgroundImage;
      result.push({
        index: i,
        tag: s.tagName,
        className: s.className.substring(0, 60),
        offsetTop: s.offsetTop,
        offsetHeight: s.offsetHeight,
        bgImage: bg !== 'none' ? bg.substring(0, 80) : null,
        imgs: Array.from(imgs).slice(0, 3).map(img => ({
          src: img.src.substring(0, 80),
          w: img.naturalWidth,
          h: img.naturalHeight,
          ratio: img.naturalWidth + ':' + img.naturalHeight,
          visible: img.offsetWidth > 0 && img.offsetHeight > 0,
          wPx: img.offsetWidth,
          hPx: img.offsetHeight
        }))
      });
    }
    return result;
  });
  console.log('Page structure (mobile dark):', JSON.stringify(pageStructure, null, 2));
  
  // Check dark mode CSS
  const darkCSS = await mobilePage.evaluate(() => {
    // Check if the CSS has prefers-color-scheme media queries
    const sheets = document.styleSheets;
    let hasDarkMedia = false;
    let darkBgColor = null;
    for (const sheet of sheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.type === CSSRule.MEDIA_RULE) {
            if (rule.conditionText && rule.conditionText.includes('dark')) {
              hasDarkMedia = true;
              for (const innerRule of rule.cssRules) {
                if (innerRule.style && innerRule.style.backgroundColor) {
                  darkBgColor = innerRule.style.backgroundColor;
                }
              }
            }
          }
        }
      } catch (e) {}
    }
    return { hasDarkMedia, darkBgColor };
  });
  console.log('Dark CSS:', JSON.stringify(darkCSS));
  
  // PC dark mode test
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark'
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2000);
  await desktopPage.screenshot({ path: '/root/.openclaw/workspace/test-pc-dark.png', fullPage: true });
  
  const pcDarkInfo = await desktopPage.evaluate(() => {
    return {
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      htmlClass: document.documentElement.className,
      bodyClass: document.body.className
    };
  });
  console.log('PC dark mode info:', JSON.stringify(pcDarkInfo));
  
  // Article TOC - check if Intersection Observer is used
  const articlePage = await desktopCtx.newPage();
  await articlePage.goto('https://aitoolreviewr.com/articles/ai-writing-tools-2026/', { waitUntil: 'networkidle' });
  await articlePage.waitForTimeout(2000);
  
  // Check what script is running for TOC
  const tocScriptInfo = await articlePage.evaluate(() => {
    // Check if there are any IntersectionObserver instances
    const toc = document.querySelector('[class*="toc"], aside');
    if (!toc) return { found: false };
    
    // Get all headings
    const headings = document.querySelectorAll('h1, h2, h3');
    const headingInfo = Array.from(headings).slice(0, 10).map(h => ({
      id: h.id,
      text: h.textContent.trim().substring(0, 40),
      offsetTop: h.offsetTop
    }));
    
    // Check TOC links hrefs
    const tocLinks = Array.from(toc.querySelectorAll('a')).map(a => ({
      href: a.getAttribute('href'),
      text: a.textContent.trim().substring(0, 40)
    }));
    
    return {
      tocFound: true,
      headingCount: headings.length,
      headings: headingInfo,
      tocLinks
    };
  });
  console.log('TOC script info:', JSON.stringify(tocScriptInfo, null, 2));
  
  // Scroll to a heading and check if TOC updates
  await articlePage.evaluate(() => {
    const heading = document.querySelector('#top-tools, [id="top-tools"], h2[id]');
    if (heading) {
      heading.scrollIntoView();
    } else {
      window.scrollTo(0, 1000);
    }
  });
  await articlePage.waitForTimeout(1500);
  
  const tocAfterScroll = await articlePage.evaluate(() => {
    const toc = document.querySelector('[class*="toc"], aside');
    if (!toc) return null;
    const links = Array.from(toc.querySelectorAll('a'));
    const active = links.filter(l => l.className.includes('active') || l.style.color !== '');
    return {
      activeLinks: active.length,
      allClasses: links.map(l => l.className),
      allColors: links.map(l => l.style.color || 'default'),
      scrollY: window.scrollY
    };
  });
  console.log('TOC after scroll to heading:', JSON.stringify(tocAfterScroll));
  await desktopPage.screenshot({ path: '/root/.openclaw/workspace/test-article-scroll2k.png', fullPage: false });
  
  await browser.close();
  console.log('Done');
})();
