#!/bin/bash

# Auto-deploy script for meditation-website
# This script runs after any file change to commit and deploy to GitHub Pages

PROJECT_DIR="/Users/ryan/Development/MeditationSite/meditation-website"
LOCK_FILE="/tmp/meditation-deploy.lock"
cd "$PROJECT_DIR" || exit 1

# Prevent concurrent deploys - skip if another deploy is running
if [ -f "$LOCK_FILE" ]; then
  LOCK_AGE=$(($(date +%s) - $(stat -f %m "$LOCK_FILE")))
  if [ $LOCK_AGE -lt 60 ]; then
    echo "⏳ Deploy already in progress, skipping..."
    exit 0
  fi
fi

# Check if there are any changes to commit
if [[ -z $(git status -s) ]]; then
  echo "No changes to commit"
  exit 0
fi

# Create lock file
touch "$LOCK_FILE"

# Add all changes
git add .

# Create commit with timestamp
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "Auto-deploy: Changes made at $TIMESTAMP

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

# Deploy to GitHub Pages
npm run deploy

# Wait for GitHub Pages deployment to complete
echo "⏳ Waiting for GitHub Pages deployment..."
sleep 10

# Check deployment status (retry up to 6 times, 10 seconds apart)
for i in {1..6}; do
  STATUS=$(gh api repos/empireofryan/empireofryan.github.io/actions/runs --jq '.workflow_runs[0] | .status')
  CONCLUSION=$(gh api repos/empireofryan/empireofryan.github.io/actions/runs --jq '.workflow_runs[0] | .conclusion')

  if [ "$STATUS" = "completed" ]; then
    if [ "$CONCLUSION" = "success" ]; then
      echo "✅ GitHub Pages deployment successful!"
      rm -f "$LOCK_FILE"
      exit 0
    else
      echo "❌ GitHub Pages deployment failed: $CONCLUSION"
      rm -f "$LOCK_FILE"
      exit 1
    fi
  fi

  echo "   Status: $STATUS (attempt $i/6)..."
  sleep 10
done

echo "⚠️ Deployment status check timed out (may still be running)"
rm -f "$LOCK_FILE"
