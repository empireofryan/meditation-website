# Project Rules

## Dev Server (CRITICAL)

**ALWAYS run the dev server on port 5174** at the start of every session:

```bash
cd /Users/ryan/Development/MeditationSite/meditation-website && npm run dev -- --port 5174
```

The dev server should be running at: http://localhost:5174/

Do NOT forget to start this server. Run it in the background.

## Console Error Checking (CRITICAL)

**After EVERY code change:**
1. Check the dev server output for any errors
2. If user reports console errors or the site crashes, FIX IMMEDIATELY before doing anything else
3. Common errors to watch for:
   - React hook errors (circular dependencies, ordering issues)
   - TypeScript errors
   - Import/export errors
   - Runtime exceptions

**NEVER leave the site in a broken state.** Fix errors before moving on.

## Deployment (CRITICAL)

**ALWAYS deploy after ANY code changes** - no exceptions. Run this after every edit:

```bash
npm run deploy
```

### How Deployment Works

- **Live site:** https://empireofryan.github.io/
- **Source repo:** `empireofryan/meditation-website` (this repo)
- **Deploy target:** `empireofryan/empireofryan.github.io` repo, `master` branch

The deploy script:
1. Builds the app with Vite (`vite build`)
2. Uses `gh-pages` to push the `dist/` folder to the `master` branch of `empireofryan.github.io`
3. GitHub Pages serves that repo at the root URL

### Troubleshooting

If deploys aren't showing up:
1. Verify the deploy pushes to `master` branch (not `main`) - check package.json
2. Wait 1-2 minutes for GitHub Pages CDN to update
3. Hard refresh the browser (Cmd+Shift+R)
4. Check https://github.com/empireofryan/empireofryan.github.io to verify the commit landed

Do NOT wait for user to ask - deploy immediately after changes are made.

## Routes

- `/` - HomePage
- `/about` - AboutPage
- `/membership` - MembershipPage
- `/sunset` - SunsetPage (Meridian-style theme)

## Google Sheets Updates (CRITICAL)

**NEVER replace or clear entire sheets.** The spreadsheet has carefully designed formatting.

When updating the KMC Schedule spreadsheet (`1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs`):

1. **ONLY update individual cells** using `values().update()` method
2. **NEVER use** `values().clear()` or batch operations that replace ranges
3. **NEVER run** `format_sheet.py` - it overwrites formatting
4. **USE** `update_cells.py` pattern - updates values only, preserves formatting

Example of correct approach:
```python
service.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID,
    range="'Weekly Classes'!G11",  # Single cell
    valueInputOption='RAW',
    body={'values': [["New description text"]]}
).execute()
```

**Before any sheet update:** Confirm with user that only cell values will change, not formatting.
