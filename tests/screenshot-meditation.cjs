#!/usr/bin/env node

/**
 * Screenshot test script for meditation website
 * Takes screenshots at mobile, tablet, and desktop sizes
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'http://localhost:5174';

const viewports = {
  mobile: { width: 375, height: 812, name: 'mobile' },
  'tablet-portrait': { width: 820, height: 1180, name: 'tablet-portrait' },
  'tablet-landscape': { width: 1180, height: 820, name: 'tablet-landscape' },
  desktop: { width: 1440, height: 900, name: 'desktop' },
  'desktop-large': { width: 1920, height: 1080, name: 'desktop-large' }
};

const PAGES = ['/', '/about', '/membership', '/classes'];

async function takeScreenshots(outputDir = 'current') {
  console.log('🚀 Starting screenshot capture...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
  });

  const outputPath = path.join(__dirname, 'screenshots', outputDir);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  for (const [type, viewport] of Object.entries(viewports)) {
    console.log(`📸 Capturing ${type} (${viewport.width}x${viewport.height})...`);

    const page = await browser.newPage();
    await page.setViewport(viewport);

    try {
      await page.goto(SITE_URL, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Wait for images to load
      await page.waitForSelector('img', { timeout: 5000 }).catch(() => {});

      // Take full page screenshot
      const screenshotPath = path.join(outputPath, `${viewport.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      console.log(`   ✓ Saved: ${screenshotPath}`);
    } catch (error) {
      console.error(`   ✗ Error capturing ${type}:`, error.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n✅ Screenshot capture complete!');
}

// Run if called directly
if (require.main === module) {
  const outputDir = process.argv[2] || 'current';
  takeScreenshots(outputDir).catch(console.error);
}

module.exports = { takeScreenshots, viewports };
