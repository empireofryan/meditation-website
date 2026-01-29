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

  // Find elements causing horizontal overflow
  const overflowElements = await page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const results = [];

    const checkElement = (el, depth = 0) => {
      const rect = el.getBoundingClientRect();
      if (rect.right > viewportWidth && rect.width > 0) {
        const tag = el.tagName.toLowerCase();
        const classes = el.className ? (typeof el.className === 'string' ? el.className : '') : '';
        const classPreview = classes.substring(0, 50);
        results.push({
          tag,
          class: classPreview,
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          overflow: Math.round(rect.right - viewportWidth),
          depth
        });
      }
    };

    // Check all elements
    document.querySelectorAll('*').forEach(el => checkElement(el));

    // Sort by overflow amount (largest first)
    results.sort((a, b) => b.overflow - a.overflow);

    return results.slice(0, 20);
  });

  console.log(`\nViewport width: 1280px`);
  console.log(`Body scroll width: ${await page.evaluate(() => document.body.scrollWidth)}px`);
  console.log(`\nElements causing overflow:`);

  overflowElements.forEach((el, i) => {
    console.log(`${i + 1}. <${el.tag}> class="${el.class}"`);
    console.log(`   right: ${el.right}px, overflow: ${el.overflow}px`);
  });

  await browser.close();
}

findOverflow().catch(console.error);
