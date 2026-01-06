# Screenshot & Visual Regression Testing

Automated UI/UX testing tools for the meditation website using headless Chrome.

## 📸 Available Scripts

### 1. Screenshot Testing
Take screenshots of the meditation website at different viewport sizes:

```bash
npm run screenshot                    # Take screenshots of current site
npm run screenshot:baseline           # Save as baseline images
```

### 2. Reusable Screenshot Utility
Screenshot any URL at any viewport size:

```bash
npm run screenshot:util <url> <viewport> [output-path]

# Examples:
node tests/screenshot-util.cjs https://example.com mobile
node tests/screenshot-util.cjs https://example.com 1920x1080 ./output.png
node tests/screenshot-util.cjs https://example.com ipad-pro ./screenshots/test.png
```

**Available presets:**
- `mobile` (375x812)
- `iphone-13` (375x812)
- `iphone-13-pro-max` (428x926)
- `tablet` (768x1024)
- `ipad` (768x1024)
- `ipad-pro` (1024x1366)
- `desktop` (1920x1080)
- `4k` (3840x2160)

Or use custom format: `WIDTHxHEIGHT` (e.g., `1440x900`)

### 3. Visual Regression Testing
Compare screenshots to detect visual changes:

```bash
npm run test:visual:update            # Update baseline images
npm run test:visual                   # Run visual comparison
```

**How it works:**
1. Takes screenshots of the current site
2. Compares them pixel-by-pixel with baseline images
3. Generates diff images showing differences
4. Fails if changes exceed 1% threshold

## 📂 Directory Structure

```
tests/
├── screenshots/
│   ├── baseline/          # Reference images (git committed)
│   ├── current/           # Latest screenshots
│   └── diff/              # Visual difference images
├── screenshot-meditation.cjs   # Main screenshot script
├── screenshot-util.cjs         # Reusable utility
└── visual-regression.cjs       # Comparison script
```

## 🚀 Typical Workflow

### When making UI changes:

1. **Before changes** - Create baseline:
   ```bash
   npm run test:visual:update
   ```

2. **Make your CSS/HTML changes**

3. **After changes** - Run visual regression:
   ```bash
   npm run test:visual
   ```

4. **Review differences** - Check `tests/screenshots/diff/` for changes

5. **If changes look good** - Update baseline:
   ```bash
   npm run test:visual:update
   ```

### Quick mobile check:
```bash
npm run screenshot
# Check tests/screenshots/current/ folder
```

## 🔧 Environment Setup

The scripts automatically use the Puppeteer-bundled Chrome. If you encounter issues, set:

```bash
export PUPPETEER_EXECUTABLE_PATH="/path/to/chrome"
```

## 📊 Example Output

```
🧪 Starting visual regression testing...

📸 Taking current screenshots...
🚀 Starting screenshot capture...

📸 Capturing mobile (375x812)...
   ✓ Saved: .../iphone-13.png
📸 Capturing tablet (768x1024)...
   ✓ Saved: .../ipad.png
📸 Capturing desktop (1920x1080)...
   ✓ Saved: .../desktop.png

🔍 Comparing screenshots...

  Comparing: iphone-13.png
    ✅ Diff: 0.03% (142 pixels)
  Comparing: ipad.png
    ✅ Diff: 0.01% (78 pixels)
  Comparing: desktop.png
    ✅ Diff: 0.00% (12 pixels)

===========================================================
📊 Visual Regression Test Results

  Passed: 3
  Failed: 0
===========================================================

✅ All visual regression tests passed!
```
