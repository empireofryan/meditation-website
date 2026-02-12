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

**ALWAYS deploy to Netlify after ANY code changes** - no exceptions. Run this after every edit:

```bash
npm run build && netlify deploy --prod --dir=dist
```

### Live Site

- **Live site:** https://kmcwb.netlify.app
- **Netlify project:** kmcwb
- **Netlify account:** rjohnson2001@gmail.com (personal)

### Deployment Process

1. Build the app with `npm run build`
2. Deploy to Netlify with `netlify deploy --prod --dir=dist`
3. Verify deployment succeeded in the CLI output

Do NOT wait for user to ask - deploy immediately after changes are made.

### Legacy (GitHub Pages - NO LONGER USED)

The old GitHub Pages deployment (`npm run deploy` to empireofryan.github.io) is deprecated. Use Netlify instead.

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
