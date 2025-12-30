#!/bin/bash

# Auto-deploy script for meditation-website
# This script runs after any file change to commit and deploy to GitHub Pages

PROJECT_DIR="/Users/ryan/Development/MeditationSite/meditation-website"
cd "$PROJECT_DIR" || exit 1

# Check if there are any changes to commit
if [[ -z $(git status -s) ]]; then
  echo "No changes to commit"
  exit 0
fi

# Add all changes
git add .

# Create commit with timestamp
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "Auto-deploy: Changes made at $TIMESTAMP

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Deploy to GitHub Pages
npm run deploy

echo "✅ Auto-deployed to GitHub Pages"
