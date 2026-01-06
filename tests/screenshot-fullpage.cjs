#!/usr/bin/env node

const puppeteer = require('puppeteer');

async function takeFullPageScreenshot(url, outputPath) {
  console.log(`📸 Taking full-page screenshot of: ${url}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait for images to load
    await page.waitForSelector('img', { timeout: 5000 }).catch(() => {});
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // Take full page screenshot
    await page.screenshot({
      path: outputPath,
      fullPage: true
    });

    console.log(`✅ Full-page screenshot saved: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error:`, error.message);
  } finally {
    await browser.close();
  }
}

const [,, url, outputPath] = process.argv;

if (!url || !outputPath) {
  console.log('Usage: node screenshot-fullpage.cjs <url> <output-path>');
  process.exit(1);
}

takeFullPageScreenshot(url, outputPath).catch(console.error);
