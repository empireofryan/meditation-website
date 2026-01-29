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
      await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait for page to be ready
      await new Promise(r => setTimeout(r, 2000));

      // Take initial screenshot
      await page.screenshot({
        path: path.join(screenshotsDir, `${viewport.name}-full.png`),
        fullPage: true
      });
      console.log(`  - Full page screenshot saved`);

      // Find schedule section by looking for the toggle buttons or date headers
      const hasSchedule = await page.evaluate(() => {
        // Look for text content that indicates schedule
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.some(b => b.textContent.includes('Schedule') || b.textContent.includes('Calendar'));
      });

      if (hasSchedule) {
        // Scroll to schedule area
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const scheduleBtn = buttons.find(b => b.textContent.includes('Schedule'));
          if (scheduleBtn) {
            const container = scheduleBtn.closest('div');
            if (container) {
              // Go up to find the main schedule container
              let parent = container;
              for (let i = 0; i < 5; i++) {
                if (parent.parentElement) parent = parent.parentElement;
              }
              parent.scrollIntoView({ block: 'start' });
            }
          }
        });

        // Wait for data to potentially load
        await new Promise(r => setTimeout(r, 3000));

        // Take another screenshot focused on schedule area
        await page.screenshot({
          path: path.join(screenshotsDir, `${viewport.name}-schedule-area.png`),
          fullPage: true
        });
        console.log(`  - Schedule area screenshot saved`);
      }

      // Check for layout issues
      const issues = await page.evaluate(() => {
        const problems = [];

        // Check for horizontal overflow on body
        if (document.body.scrollWidth > window.innerWidth + 10) {
          problems.push(`Page has horizontal scroll: body ${document.body.scrollWidth}px > viewport ${window.innerWidth}px`);
        }

        // Find all elements that might be class cards (look for common patterns)
        const allDivs = document.querySelectorAll('div');
        let potentialCards = [];

        allDivs.forEach(div => {
          const className = div.className || '';
          if (className.includes('Card') || className.includes('card')) {
            potentialCards.push(div);
          }
        });

        // Check each potential card for overflow
        let overflowingCards = 0;
        potentialCards.forEach(card => {
          if (card.scrollWidth > card.clientWidth + 5) {
            overflowingCards++;
          }
          // Check if any child extends beyond
          const rect = card.getBoundingClientRect();
          const children = card.querySelectorAll('*');
          children.forEach(child => {
            const childRect = child.getBoundingClientRect();
            if (childRect.right > rect.right + 10 && childRect.width > 0) {
              overflowingCards++;
            }
          });
        });

        if (overflowingCards > 0) {
          problems.push(`${overflowingCards} potential card element(s) have overflow issues`);
        }

        // Check all buttons aren't cut off
        const buttons = document.querySelectorAll('button');
        let cutOffButtons = 0;
        buttons.forEach(btn => {
          const rect = btn.getBoundingClientRect();
          if (rect.right > window.innerWidth) {
            cutOffButtons++;
          }
        });

        if (cutOffButtons > 0) {
          problems.push(`${cutOffButtons} button(s) extend beyond viewport`);
        }

        // Check for elements with display:grid or flex that might have alignment issues
        const gridElements = document.querySelectorAll('[style*="grid"], [style*="flex"]');

        return problems;
      });

      if (issues.length > 0) {
        console.log(`  - Issues found:`);
        issues.forEach(issue => console.log(`    * ${issue}`));
      } else {
        console.log(`  - No major layout issues detected`);
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
