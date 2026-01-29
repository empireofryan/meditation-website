const puppeteer = require('puppeteer');

async function debug() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Users/ryan/.cache/puppeteer/chrome/mac_arm-143.0.7499.169/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Listen for console messages
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to page...');
  await page.goto('http://localhost:5174/', {
    waitUntil: 'networkidle0',
    timeout: 60000
  });

  console.log('\nWaiting 10 seconds for React to render...');
  await new Promise(r => setTimeout(r, 10000));

  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('\nBody HTML length:', html.length);
  console.log('Body HTML preview:', html.substring(0, 500));

  await page.screenshot({ path: 'screenshots/debug.png' });
  console.log('\nScreenshot saved to screenshots/debug.png');

  await browser.close();
}

debug().catch(console.error);
