#!/usr/bin/env node

const puppeteer = require('puppeteer');

async function takeCompleteScreenshot(url, outputPath) {
  console.log(`📸 Taking complete screenshot of: ${url}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait for initial load
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // Scroll to bottom to trigger lazy loading
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));

    // Wait for everything to settle
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // Take full page screenshot
    await page.screenshot({
      path: outputPath,
      fullPage: true
    });

    console.log(`✅ Complete screenshot saved: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error:`, error.message);
  } finally {
    await browser.close();
  }
}

const [,, url, outputPath] = process.argv;

if (!url || !outputPath) {
  console.log('Usage: node screenshot-complete.cjs <url> <output-path>');
  process.exit(1);
}

takeCompleteScreenshot(url, outputPath).catch(console.error);
