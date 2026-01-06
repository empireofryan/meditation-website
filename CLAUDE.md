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

This builds and publishes to https://empireofryan.github.io/meditation-website/

Do NOT wait for user to ask - deploy immediately after changes are made.

## Routes

- `/` - HomePage
- `/sunset` - SunsetPage (Meridian-style theme)
