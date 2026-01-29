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

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Users/ryan/.cache/puppeteer/chrome/mac_arm-143.0.7499.169/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
  });

  console.log('Starting viewport regression tests...\n');

  for (const viewport of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: viewport.width, height: viewport.height });

    console.log(`Testing ${viewport.name} (${viewport.width}x${viewport.height})...`);

    try {
      // Navigate to local dev server
      await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0', timeout: 30000 });

      // Scroll to schedule section
      await page.evaluate(() => {
        const schedule = document.querySelector('[class*="scheduleContainer"]');
        if (schedule) {
          schedule.scrollIntoView({ block: 'start' });
        }
      });

      // Wait for schedule data to load (wait for loading spinner to disappear and class cards to appear)
      await page.waitForFunction(() => {
        const spinner = document.querySelector('[class*="spinner"]');
        const cards = document.querySelectorAll('[class*="classCard"]');
        return !spinner && cards.length > 0;
      }, { timeout: 15000 }).catch(() => {
        console.log(`  - Warning: Schedule may not have loaded completely`);
      });

      // Extra wait for rendering
      await new Promise(r => setTimeout(r, 1000));

      // Take schedule section screenshot
      const scheduleElement = await page.$('[class*="scheduleContainer"]');
      if (scheduleElement) {
        await scheduleElement.screenshot({
          path: path.join(screenshotsDir, `${viewport.name}-schedule.png`)
        });
        console.log(`  - Schedule screenshot saved`);
      } else {
        console.log(`  - Schedule container not found`);
      }

      // Check for layout issues
      const issues = await page.evaluate(() => {
        const problems = [];

        // Check for horizontal overflow on body
        if (document.body.scrollWidth > window.innerWidth + 5) {
          problems.push(`Page has horizontal scroll: ${document.body.scrollWidth}px > ${window.innerWidth}px`);
        }

        // Check schedule container for overflow
        const schedule = document.querySelector('[class*="scheduleContainer"]');
        if (schedule && schedule.scrollWidth > schedule.clientWidth + 5) {
          problems.push(`Schedule container has horizontal overflow`);
        }

        // Check class cards
        const cards = document.querySelectorAll('[class*="classCard"]');
        let cardIssues = 0;
        cards.forEach((card, i) => {
          // Check if card content overflows
          const mainRow = card.querySelector('[class*="mainRow"]');
          if (mainRow && mainRow.scrollWidth > mainRow.clientWidth + 5) {
            cardIssues++;
          }

          // Check buttons visibility
          const buttons = card.querySelectorAll('button');
          buttons.forEach(btn => {
            const rect = btn.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            if (rect.right > cardRect.right + 5) {
              problems.push(`Button in card ${i + 1} extends beyond card boundary`);
            }
          });
        });

        if (cardIssues > 0) {
          problems.push(`${cardIssues} class card(s) have content overflow`);
        }

        // Check for text truncation in important elements
        const checkTruncation = (selector, label) => {
          const elements = document.querySelectorAll(selector);
          let truncated = 0;
          elements.forEach(el => {
            if (el.scrollWidth > el.clientWidth + 2) {
              truncated++;
            }
          });
          if (truncated > 0) {
            problems.push(`${truncated} ${label} element(s) may have truncated text`);
          }
        };

        checkTruncation('[class*="className"]', 'className');
        checkTruncation('[class*="instructorName"]', 'instructorName');
        checkTruncation('[class*="membershipLink"]', 'membershipLink');

        // Check if instructor photos are aligned (compare positions)
        const instructorElements = document.querySelectorAll('[class*="instructorName"]');
        if (instructorElements.length >= 2) {
          const positions = [];
          instructorElements.forEach(el => {
            positions.push(el.getBoundingClientRect().left);
          });
          const uniquePositions = [...new Set(positions.map(p => Math.round(p)))];
          if (uniquePositions.length > 2) {
            problems.push(`Instructor columns not aligned: ${uniquePositions.length} different x-positions found`);
          }
        }

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
  console.log('Review screenshots to verify layout at each viewport.');
}

runTests().catch(console.error);
