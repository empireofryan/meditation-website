const puppeteer = require('puppeteer');

async function findOverflow() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Users/ryan/.cache/puppeteer/chrome/mac_arm-143.0.7499.169/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to page...');
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 5000));

  // Find elements around the overflow boundary
  const overflowDetails = await page.evaluate(() => {
    const viewportWidth = window.innerWidth; // 1280
    const bodyScrollWidth = document.body.scrollWidth; // 1300
    const overflow = bodyScrollWidth - viewportWidth; // 20

    // Find first-level children that are wider than viewport
    const wideElements = [];
    document.body.querySelectorAll('*').forEach(el => {
      const rect = el.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(el);

      // Look for elements whose right edge is around 1280-1320
      if (rect.right > 1280 && rect.right <= 1320 && rect.width > 100) {
        wideElements.push({
          tag: el.tagName,
          class: el.className.substring(0, 60),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          marginRight: computedStyle.marginRight,
          paddingRight: computedStyle.paddingRight,
          overflow: computedStyle.overflow,
          overflowX: computedStyle.overflowX
        });
      }
    });

    // Check main containers
    const mainContainers = [];
    ['body', 'html', '#root'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        mainContainers.push({
          selector: sel,
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          overflow: window.getComputedStyle(el).overflow
        });
      }
    });

    return { viewportWidth, bodyScrollWidth, overflow, wideElements, mainContainers };
  });

  console.log('\n=== Overflow Analysis ===');
  console.log(`Viewport: ${overflowDetails.viewportWidth}px`);
  console.log(`Body scroll width: ${overflowDetails.bodyScrollWidth}px`);
  console.log(`Overflow: ${overflowDetails.overflow}px`);

  console.log('\n=== Main Containers ===');
  overflowDetails.mainContainers.forEach(c => {
    console.log(`${c.selector}: scrollWidth=${c.scrollWidth}, clientWidth=${c.clientWidth}, overflow=${c.overflow}`);
  });

  console.log('\n=== Elements near overflow boundary (1280-1320px) ===');
  overflowDetails.wideElements.forEach(el => {
    console.log(`<${el.tag}> right=${el.right}px, class="${el.class}"`);
    console.log(`   marginRight: ${el.marginRight}, overflowX: ${el.overflowX}`);
  });

  await browser.close();
}

findOverflow().catch(console.error);
