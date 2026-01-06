#!/usr/bin/env node

/**
 * Reusable screenshot utility
 * Usage: node screenshot-util.js <url> <viewport> [output-path]
 *
 * Examples:
 *   node screenshot-util.js https://example.com mobile
 *   node screenshot-util.js https://example.com 1920x1080 ./output.png
 *   node screenshot-util.js https://example.com desktop ./screenshots/test.png
 */

const puppeteer = require('puppeteer');
const path = require('path');

const PRESETS = {
  mobile: { width: 375, height: 812 },
  'iphone-13': { width: 375, height: 812 },
  'iphone-13-pro-max': { width: 428, height: 926 },
  tablet: { width: 768, height: 1024 },
  ipad: { width: 768, height: 1024 },
  'ipad-pro': { width: 1024, height: 1366 },
  desktop: { width: 1920, height: 1080 },
  '4k': { width: 3840, height: 2160 }
};

function parseViewport(input) {
  // Check if it's a preset
  if (PRESETS[input]) {
    return PRESETS[input];
  }

  // Check if it's width x height format
  const match = input.match(/^(\d+)x(\d+)$/);
  if (match) {
    return {
      width: parseInt(match[1]),
      height: parseInt(match[2])
    };
  }

  throw new Error(`Invalid viewport: ${input}. Use a preset (mobile, tablet, desktop) or WIDTHxHEIGHT format (e.g., 1920x1080)`);
}

async function takeScreenshot(url, viewport, outputPath = null, options = {}) {
  const {
    fullPage = true,
    waitUntil = 'networkidle2',
    timeout = 30000
  } = options;

  console.log(`🚀 Taking screenshot of: ${url}`);
  console.log(`📐 Viewport: ${viewport.width}x${viewport.height}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport(viewport);

  try {
    await page.goto(url, { waitUntil, timeout });

    // Wait for images to load
    await page.waitForSelector('img', { timeout: 5000 }).catch(() => {});

    // Generate output path if not provided
    if (!outputPath) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const urlSlug = new URL(url).hostname.replace(/\./g, '-');
      outputPath = path.join(process.cwd(), `screenshot-${urlSlug}-${viewport.width}x${viewport.height}-${timestamp}.png`);
    }

    await page.screenshot({ path: outputPath, fullPage });

    console.log(`✅ Screenshot saved: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`❌ Error taking screenshot:`, error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// CLI usage
if (require.main === module) {
  const [,, url, viewportInput, outputPath] = process.argv;

  if (!url || !viewportInput) {
    console.log(`
Usage: node screenshot-util.js <url> <viewport> [output-path]

Viewport can be:
  - Preset: mobile, iphone-13, iphone-13-pro-max, tablet, ipad, ipad-pro, desktop, 4k
  - Custom: WIDTHxHEIGHT (e.g., 1920x1080)

Examples:
  node screenshot-util.js https://example.com mobile
  node screenshot-util.js https://example.com 1920x1080 ./output.png
  node screenshot-util.js https://example.com desktop ./screenshots/test.png
`);
    process.exit(1);
  }

  try {
    const viewport = parseViewport(viewportInput);
    takeScreenshot(url, viewport, outputPath).catch(console.error);
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  }
}

module.exports = { takeScreenshot, parseViewport, PRESETS };
