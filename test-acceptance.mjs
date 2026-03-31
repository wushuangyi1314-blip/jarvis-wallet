import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();

// Test 1: Dark mode - Homepage (mobile viewport, dark color scheme)
const mobileCtx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  colorScheme: 'dark'
});
const mobilePage = await mobileCtx.newPage();
await mobilePage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
await mobilePage.screenshot({ path: '/root/.openclaw/workspace/test1-dark-mobile-homepage.png', fullPage: false });
console.log('Test 1: Dark mode mobile homepage screenshot saved');

// Check if page is dark
const bgColor = await mobilePage.evaluate(() => {
  return window.getComputedStyle(document.body).backgroundColor;
});
console.log('Body background color (dark mode):', bgColor);

// Test 2: Mobile hero image 16:9
const mobilePage2 = await mobileCtx.newPage();
await mobilePage2.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
await mobilePage2.screenshot({ path: '/root/.openclaw/workspace/test2-mobile-hero.png', fullPage: false });

const heroImg = await mobilePage2.evaluate(() => {
  const hero = document.querySelector('[class*="hero"] img, [class*="Hero"] img, section:first-of-type img');
  if (hero) {
    return {
      width: hero.naturalWidth,
      height: hero.naturalHeight,
      ratio: hero.naturalWidth / hero.naturalHeight,
      ratioStr: `${hero.naturalWidth}:${hero.naturalHeight}`
    };
  }
  // Try to find any large image in the top section
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
console.log('Test 2: Hero image aspect ratio:', heroImg);

// Test 3: PC category 2 rows (desktop viewport)
const desktopCtx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: 'light'
});
const desktopPage = await desktopCtx.newPage();
await desktopPage.goto('https://aitoolreviewr.com/', { waitUntil: 'networkidle' });
await desktopPage.screenshot({ path: '/root/.openclaw/workspace/test3-pc-homepage.png', fullPage: false });

// Check categories layout
const categoryLayout = await desktopPage.evaluate(() => {
  const categorySection = document.querySelector('[class*="category"] [class*="grid"], [class*="Category"] [class*="grid"], [class*="categories"]');
  if (categorySection) {
    const items = categorySection.querySelectorAll(':scope > *');
    const computedStyle = window.getComputedStyle(categorySection);
    return {
      display: computedStyle.display,
      gridTemplateColumns: computedStyle.gridTemplateColumns,
      childCount: items.length,
      items: Array.from(items).slice(0, 4).map((item, i) => ({
        index: i,
        visible: item.offsetHeight > 0,
        bounding: item.getBoundingClientRect()
      }))
    };
  }
  // Try broader search
  const grids = document.querySelectorAll('[class*="grid"]');
  for (const grid of grids) {
    const style = window.getComputedStyle(grid);
    if (style.display === 'grid') {
      return {
        display: style.display,
        gridTemplateColumns: style.gridTemplateColumns,
        childCount: grid.children.length
      };
    }
  }
  return null;
});
console.log('Test 3: Category layout:', JSON.stringify(categoryLayout, null, 2));

// Test 4: TOC scroll highlighting on article page
const articlePage = await desktopCtx.newPage();
await articlePage.goto('https://aitoolreviewr.com/articles/ai-writing-tools-2026/', { waitUntil: 'networkidle' });
await articlePage.screenshot({ path: '/root/.openclaw/workspace/test4-article-desktop.png', fullPage: false });

// Check TOC exists
const tocExists = await articlePage.evaluate(() => {
  const toc = document.querySelector('[class*="toc"], [class*="TOC"], [class*="table-of-contents"], nav[class*="content"]');
  return toc ? {
    found: true,
    links: toc.querySelectorAll('a').length,
    html: toc.innerHTML.substring(0, 300)
  } : { found: false };
});
console.log('Test 4: TOC exists:', JSON.stringify(tocExists, null, 2));

// Scroll and check TOC highlighting
await articlePage.evaluate(() => {
  window.scrollBy(0, 500);
});
await articlePage.waitForTimeout(500);
await articlePage.screenshot({ path: '/root/.openclaw/workspace/test4-article-scrolled.png', fullPage: false });

const tocHighlight = await articlePage.evaluate(() => {
  const toc = document.querySelector('[class*="toc"], [class*="TOC"], [class*="table-of-contents"]');
  if (!toc) return null;
  const activeLink = toc.querySelector('[class*="active"], [class*="current"], [style*="color"], a[style*="color"]');
  const links = toc.querySelectorAll('a');
  return {
    activeFound: !!activeLink,
    totalLinks: links.length,
    linksInfo: Array.from(links).slice(0, 6).map(l => ({
      text: l.textContent.trim().substring(0, 30),
      classes: l.className,
      styles: l.getAttribute('style')
    }))
  };
});
console.log('Test 4: TOC highlighting after scroll:', JSON.stringify(tocHighlight, null, 2));

await browser.close();
console.log('\nAll tests completed!');
