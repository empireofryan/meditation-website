const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'mobile-landscape', width: 812, height: 375 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'desktop-wide', width: 1920, height: 1080 },
];

const screenshotsDir = path.join(__dirname, '../screenshots');

async function runTests() {
  // Ensure screenshots directory exists
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });

  console.log('Starting viewport regression tests...\n');

  for (const viewport of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: viewport.width, height: viewport.height });

    console.log(`Testing ${viewport.name} (${viewport.width}x${viewport.height})...`);

    try {
      // Navigate to local dev server
      await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0', timeout: 30000 });

      // Wait for schedule to load
      await page.waitForSelector('[class*="classCard"]', { timeout: 10000 }).catch(() => {
        console.log(`  - No class cards found on homepage`);
      });

      // Take full page screenshot
      await page.screenshot({
        path: path.join(screenshotsDir, `${viewport.name}-homepage.png`),
        fullPage: true
      });
      console.log(`  - Homepage screenshot saved`);

      // Scroll to schedule section if on homepage
      await page.evaluate(() => {
        const schedule = document.querySelector('[class*="scheduleContainer"]');
        if (schedule) schedule.scrollIntoView();
      });

      // Wait a moment for any animations
      await new Promise(r => setTimeout(r, 500));

      // Take schedule section screenshot
      const scheduleElement = await page.$('[class*="scheduleContainer"]');
      if (scheduleElement) {
        await scheduleElement.screenshot({
          path: path.join(screenshotsDir, `${viewport.name}-schedule.png`)
        });
        console.log(`  - Schedule screenshot saved`);
      }

      // Check for layout issues
      const issues = await page.evaluate(() => {
        const problems = [];

        // Check for horizontal overflow
        if (document.body.scrollWidth > window.innerWidth) {
          problems.push(`Horizontal overflow detected: body ${document.body.scrollWidth}px > viewport ${window.innerWidth}px`);
        }

        // Check class cards for overflow
        const cards = document.querySelectorAll('[class*="classCard"]');
        cards.forEach((card, i) => {
          if (card.scrollWidth > card.clientWidth) {
            problems.push(`Class card ${i + 1} has horizontal overflow`);
          }

          // Check for cut-off text
          const elements = card.querySelectorAll('[class*="className"], [class*="instructorName"], [class*="cost"], [class*="membershipLink"]');
          elements.forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.overflow === 'hidden' && el.scrollWidth > el.clientWidth) {
              problems.push(`Text possibly cut off in ${el.className}: "${el.textContent?.substring(0, 30)}..."`);
            }
          });
        });

        // Check book buttons
        const buttons = document.querySelectorAll('[class*="bookSection"] button');
        buttons.forEach((btn, i) => {
          const rect = btn.getBoundingClientRect();
          if (rect.right > window.innerWidth) {
            problems.push(`Book button ${i + 1} extends beyond viewport`);
          }
        });

        return problems;
      });

      if (issues.length > 0) {
        console.log(`  - Issues found:`);
        issues.forEach(issue => console.log(`    * ${issue}`));
      } else {
        console.log(`  - No layout issues detected`);
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
