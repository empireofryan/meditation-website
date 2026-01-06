#!/usr/bin/env node

/**
 * Visual regression testing script
 * Compares current screenshots against baseline images
 *
 * Usage:
 *   node visual-regression.js                 # Run comparison
 *   node visual-regression.js --update-baseline  # Update baseline images
 */

const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const { takeScreenshots } = require('./screenshot-meditation.cjs');

const BASELINE_DIR = path.join(__dirname, 'screenshots', 'baseline');
const CURRENT_DIR = path.join(__dirname, 'screenshots', 'current');
const DIFF_DIR = path.join(__dirname, 'screenshots', 'diff');

async function compareImages(baselinePath, currentPath, diffPath) {
  if (!fs.existsSync(baselinePath)) {
    return { error: 'No baseline image found' };
  }

  if (!fs.existsSync(currentPath)) {
    return { error: 'No current image found' };
  }

  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  const current = PNG.sync.read(fs.readFileSync(currentPath));

  const { width, height } = baseline;

  // Check if dimensions match
  if (current.width !== width || current.height !== height) {
    return {
      error: 'Image dimensions do not match',
      baselineDimensions: `${width}x${height}`,
      currentDimensions: `${current.width}x${current.height}`
    };
  }

  const diff = new PNG({ width, height });
  const numDiffPixels = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  // Save diff image
  if (!fs.existsSync(path.dirname(diffPath))) {
    fs.mkdirSync(path.dirname(diffPath), { recursive: true });
  }
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const diffPercentage = ((numDiffPixels / totalPixels) * 100).toFixed(2);

  return {
    numDiffPixels,
    totalPixels,
    diffPercentage,
    passed: diffPercentage < 1.0 // Pass if less than 1% different
  };
}

async function runVisualRegression(updateBaseline = false) {
  console.log('🧪 Starting visual regression testing...\n');

  if (updateBaseline) {
    console.log('📸 Taking new baseline screenshots...');
    await takeScreenshots('baseline');
    console.log('\n✅ Baseline images updated!\n');
    return;
  }

  // Take current screenshots
  console.log('📸 Taking current screenshots...');
  await takeScreenshots('current');
  console.log('');

  // Compare screenshots
  const baselineFiles = fs.readdirSync(BASELINE_DIR).filter(f => f.endsWith('.png'));

  if (baselineFiles.length === 0) {
    console.log('❌ No baseline images found. Run with --update-baseline first.');
    process.exit(1);
  }

  console.log('🔍 Comparing screenshots...\n');

  const results = [];

  for (const file of baselineFiles) {
    const baselinePath = path.join(BASELINE_DIR, file);
    const currentPath = path.join(CURRENT_DIR, file);
    const diffPath = path.join(DIFF_DIR, file);

    console.log(`  Comparing: ${file}`);

    const result = await compareImages(baselinePath, currentPath, diffPath);

    if (result.error) {
      console.log(`    ❌ ${result.error}`);
      results.push({ file, passed: false, error: result.error });
    } else {
      const icon = result.passed ? '✅' : '❌';
      console.log(`    ${icon} Diff: ${result.diffPercentage}% (${result.numDiffPixels} pixels)`);
      results.push({ file, ...result });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Visual Regression Test Results\n');

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  console.log(`  Passed: ${passed}`);
  console.log(`  Failed: ${failed}`);
  console.log('='.repeat(60) + '\n');

  if (failed > 0) {
    console.log('❌ Visual regression tests failed!');
    console.log(`   Check diff images in: ${DIFF_DIR}\n`);
    process.exit(1);
  } else {
    console.log('✅ All visual regression tests passed!\n');
  }
}

// CLI usage
if (require.main === module) {
  const updateBaseline = process.argv.includes('--update-baseline');
  runVisualRegression(updateBaseline).catch(console.error);
}

module.exports = { runVisualRegression, compareImages };
