#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const VIEWPORTS = {
  mobile: { width: 393, height: 852, deviceScaleFactor: 2, isMobile: true, hasTouch: true, name: 'mobile' },
  tablet: { width: 768, height: 1024, deviceScaleFactor: 2, isMobile: true, hasTouch: true, name: 'tablet' },
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false, name: 'desktop' }
};

async function takeScrollScreenshots(url, viewportName = 'mobile') {
  const viewport = VIEWPORTS[viewportName] || VIEWPORTS.mobile;
  console.log(`📸 Taking ${viewport.name} scroll screenshots of: ${url}`);

  const outputDir = path.join(__dirname, 'screenshots', `${viewport.name}-qa`);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor,
    isMobile: viewport.isMobile,
    hasTouch: viewport.hasTouch
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // Get page height
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = viewport.height;
    const scrollStep = viewportHeight - 100; // Overlap for context

    let scrollPosition = 0;
    let screenshotIndex = 1;

    console.log(`📏 Page height: ${pageHeight}px, Viewport: ${viewportHeight}px`);

    // Take screenshots as we scroll
    while (scrollPosition < pageHeight) {
      await page.evaluate((pos) => window.scrollTo(0, pos), scrollPosition);
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));

      const filename = path.join(outputDir, `${viewport.name}-${String(screenshotIndex).padStart(2, '0')}-scroll-${scrollPosition}px.png`);
      await page.screenshot({ path: filename });
      console.log(`✅ Screenshot ${screenshotIndex}: ${filename}`);

      scrollPosition += scrollStep;
      screenshotIndex++;
    }

    // Take one final full-page screenshot
    const fullPagePath = path.join(outputDir, `${viewport.name}-fullpage.png`);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
    await page.screenshot({ path: fullPagePath, fullPage: true });
    console.log(`✅ Full page: ${fullPagePath}`);

    console.log(`\n📁 Screenshots saved to: ${outputDir}`);

  } catch (error) {
    console.error(`❌ Error:`, error.message);
  } finally {
    await browser.close();
  }
}

const url = process.argv[2] || 'http://localhost:5174/';
const viewportArg = process.argv[3] || 'mobile';
takeScrollScreenshots(url, viewportArg).catch(console.error);
