/**
 * Google Apps Script for KMC Williamsburg Schedule
 * Triggers GitHub Actions rebuild 1 minute after spreadsheet changes
 *
 * SETUP:
 * 1. In the spreadsheet, go to Extensions > Apps Script
 * 2. Paste this code
 * 3. Run setupTrigger() once to create the edit trigger
 * 4. Set your GitHub token: Run setGitHubToken() and enter your token when prompted
 */

// Configuration
const GITHUB_REPO = 'empireofryan/meditation-website';
const DEBOUNCE_MINUTES = 1;

/**
 * Run this once to set up the edit trigger
 */
function setupTrigger() {
  // Remove existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));

  // Create new edit trigger
  ScriptApp.newTrigger('onSpreadsheetEdit')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onEdit()
    .create();

  Logger.log('Edit trigger created successfully!');
}

/**
 * Run this to set your GitHub Personal Access Token
 */
function setGitHubToken() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'GitHub Token Setup',
    'Enter your GitHub Personal Access Token (needs repo scope):',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() === ui.Button.OK) {
    PropertiesService.getScriptProperties().setProperty('GITHUB_TOKEN', response.getResponseText());
    ui.alert('Token saved successfully!');
  }
}

/**
 * Called on every edit - debounces and schedules rebuild
 */
function onSpreadsheetEdit(e) {
  // Skip if editing instruction/example rows (rows 1-2)
  if (e.range.getRow() <= 2) return;

  // Clear any pending rebuild triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'triggerGitHubBuild') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Schedule new rebuild in 1 minute
  ScriptApp.newTrigger('triggerGitHubBuild')
    .timeBased()
    .after(DEBOUNCE_MINUTES * 60 * 1000)
    .create();

  Logger.log('Rebuild scheduled for ' + DEBOUNCE_MINUTES + ' minute(s) from now');
}

/**
 * Triggers GitHub Actions workflow via repository dispatch
 */
function triggerGitHubBuild() {
  const token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');

  if (!token) {
    Logger.log('ERROR: GitHub token not set. Run setGitHubToken() first.');
    return;
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/dispatches`;

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify({
      event_type: 'spreadsheet-update',
      client_payload: {
        timestamp: new Date().toISOString()
      }
    }),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const code = response.getResponseCode();

    if (code === 204) {
      Logger.log('GitHub Actions workflow triggered successfully!');
    } else {
      Logger.log('GitHub API error: ' + code + ' - ' + response.getContentText());
    }
  } catch (error) {
    Logger.log('Error triggering GitHub: ' + error.toString());
  }

  // Clean up the trigger
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'triggerGitHubBuild') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

/**
 * Manual test function
 */
function testGitHubTrigger() {
  triggerGitHubBuild();
}
