#!/usr/bin/env node

/**
 * Comprehensive regression screenshot test
 * Takes screenshots of all pages at multiple viewport sizes
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Use local dev server or live site
const BASE_URL = process.env.USE_LIVE ? 'https://empireofryan.github.io' : 'http://localhost:5174';

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'membership', path: '/membership' },
  { name: 'classes', path: '/classes' },
];

const VIEWPORTS = {
  'mobile-portrait': { width: 375, height: 812 },
  'mobile-landscape': { width: 812, height: 375 },
  'tablet-portrait': { width: 820, height: 1180 },    // iPad Air
  'tablet-landscape': { width: 1180, height: 820 },   // iPad Air landscape
  'desktop': { width: 1440, height: 900 },
  'desktop-large': { width: 1920, height: 1080 },
};

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeScreenshots() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outputDir = path.join(__dirname, 'screenshots', `regression-${timestamp}`);

  console.log('='.repeat(60));
  console.log('REGRESSION SCREENSHOT TEST');
  console.log('='.repeat(60));
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output: ${outputDir}`);
  console.log('='.repeat(60) + '\n');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = {
    passed: [],
    failed: [],
    errors: []
  };

  for (const pageInfo of PAGES) {
    console.log(`\n📄 PAGE: ${pageInfo.name.toUpperCase()}`);
    console.log('-'.repeat(40));

    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      const page = await browser.newPage();

      try {
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
          deviceScaleFactor: 1,
        });

        const url = `${BASE_URL}${pageInfo.path}`;
        console.log(`  📸 ${viewportName} (${viewport.width}x${viewport.height})...`);

        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 30000,
        });

        // Wait for content to settle
        await delay(1000);

        // Wait for images
        await page.evaluate(() => {
          return Promise.all(
            Array.from(document.images)
              .filter(img => !img.complete)
              .map(img => new Promise(resolve => {
                img.onload = img.onerror = resolve;
              }))
          );
        });

        // Check for console errors
        const consoleErrors = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        // Take full page screenshot
        const filename = `${pageInfo.name}-${viewportName}.png`;
        const screenshotPath = path.join(outputDir, filename);

        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
        });

        // Check for visual issues
        const issues = await page.evaluate(() => {
          const problems = [];

          // Check for horizontal overflow
          if (document.documentElement.scrollWidth > window.innerWidth) {
            problems.push(`Horizontal overflow: ${document.documentElement.scrollWidth}px > ${window.innerWidth}px`);
          }

          // Check for elements cut off on right
          const allElements = document.querySelectorAll('*');
          for (const el of allElements) {
            const rect = el.getBoundingClientRect();
            if (rect.right > window.innerWidth + 10 && rect.width > 0) {
              const tagName = el.tagName.toLowerCase();
              const className = el.className ? `.${el.className.split(' ')[0]}` : '';
              if (!problems.some(p => p.includes(tagName + className))) {
                problems.push(`Element overflows right: ${tagName}${className}`);
              }
            }
          }

          return problems.slice(0, 5); // Limit to 5 issues
        });

        if (issues.length > 0 || consoleErrors.length > 0) {
          console.log(`     ⚠️  Issues found:`);
          issues.forEach(issue => console.log(`        - ${issue}`));
          consoleErrors.forEach(err => console.log(`        - Console: ${err}`));
          results.failed.push({ page: pageInfo.name, viewport: viewportName, issues, consoleErrors });
        } else {
          console.log(`     ✅ OK`);
          results.passed.push({ page: pageInfo.name, viewport: viewportName });
        }

      } catch (error) {
        console.log(`     ❌ ERROR: ${error.message}`);
        results.errors.push({ page: pageInfo.name, viewport: viewportName, error: error.message });
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`⚠️  With Issues: ${results.failed.length}`);
  console.log(`❌ Errors: ${results.errors.length}`);
  console.log(`\nScreenshots saved to: ${outputDir}`);

  if (results.failed.length > 0) {
    console.log('\n⚠️  ISSUES FOUND:');
    results.failed.forEach(f => {
      console.log(`  - ${f.page} @ ${f.viewport}:`);
      f.issues.forEach(i => console.log(`      ${i}`));
    });
  }

  if (results.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    results.errors.forEach(e => {
      console.log(`  - ${e.page} @ ${e.viewport}: ${e.error}`);
    });
  }

  // Write results to JSON
  const resultsPath = path.join(outputDir, 'results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${resultsPath}`);

  return results;
}

// Run
takeScreenshots()
  .then(results => {
    process.exit(results.errors.length > 0 ? 1 : 0);
  })
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
