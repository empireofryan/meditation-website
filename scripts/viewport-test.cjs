const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'desktop-wide', width: 1440, height: 900 },
];

const screenshotsDir = path.join(__dirname, '../screenshots');

async function runTests() {
  // Ensure screenshots directory exists
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Users/ryan/.cache/puppeteer/chrome/mac_arm-143.0.7499.169/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  console.log('Starting viewport regression tests...\n');

  for (const viewport of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });

    console.log(`Testing ${viewport.name} (${viewport.width}x${viewport.height})...`);

    try {
      // Navigate to local dev server
      await page.goto('http://localhost:5174/', {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      // Wait for any React app to mount
      await page.waitForSelector('body', { timeout: 5000 });

      // Wait for content to render
      await new Promise(r => setTimeout(r, 5000));

      // Debug: check if page has content
      const bodyContent = await page.evaluate(() => document.body.innerHTML.length);
      console.log(`  - Page body content length: ${bodyContent} chars`);

      // Take screenshot of visible viewport
      await page.screenshot({
        path: path.join(screenshotsDir, `${viewport.name}-viewport.png`),
        type: 'png'
      });
      console.log(`  - Viewport screenshot saved`);

      // Scroll down to where schedule should be
      await page.evaluate(() => {
        window.scrollTo(0, 800);
      });
      await new Promise(r => setTimeout(r, 3000));

      await page.screenshot({
        path: path.join(screenshotsDir, `${viewport.name}-scrolled.png`),
        type: 'png'
      });
      console.log(`  - Scrolled screenshot saved`);

      // Scroll to bottom to see schedule
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await new Promise(r => setTimeout(r, 3000));

      await page.screenshot({
        path: path.join(screenshotsDir, `${viewport.name}-bottom.png`),
        type: 'png'
      });
      console.log(`  - Bottom screenshot saved`);

      // Check for layout issues
      const issues = await page.evaluate(() => {
        const problems = [];

        // Check for horizontal overflow
        if (document.body.scrollWidth > window.innerWidth + 10) {
          problems.push(`Horizontal scroll detected: ${document.body.scrollWidth}px > ${window.innerWidth}px`);
        }

        // Check all visible buttons
        const buttons = document.querySelectorAll('button');
        let cutOffButtons = 0;
        buttons.forEach(btn => {
          const rect = btn.getBoundingClientRect();
          if (rect.right > window.innerWidth && rect.width > 0) {
            cutOffButtons++;
          }
        });
        if (cutOffButtons > 0) {
          problems.push(`${cutOffButtons} button(s) extend beyond viewport`);
        }

        return problems;
      });

      if (issues.length > 0) {
        console.log(`  - Issues found:`);
        issues.forEach(issue => console.log(`    * ${issue}`));
      } else {
        console.log(`  - No overflow issues detected`);
      }

    } catch (err) {
      console.log(`  - Error: ${err.message}`);
    }

    await page.close();
  }

  await browser.close();
  console.log(`\nScreenshots saved to: ${screenshotsDir}`);
}

runTests().catch(console.error);
