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

/**
 * Archive past Special Events to the Past Events tab.
 * Moves rows where the date is before today, preserving data.
 * Run setupArchiveTrigger() once to schedule this daily.
 */
function archivePastEvents() {
  const ss = SpreadsheetApp.getActive();
  const seSheet = ss.getSheetByName('Special Events');
  const peSheet = ss.getSheetByName('Past Events');
  if (!seSheet || !peSheet) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Read all data rows (skip rows 1-3: instruction, example, header)
  const lastRow = seSheet.getLastRow();
  if (lastRow < 4) return;

  const dataRange = seSheet.getRange(4, 1, lastRow - 3, seSheet.getLastColumn());
  const data = dataRange.getValues();

  const rowsToArchive = [];

  for (let i = data.length - 1; i >= 0; i--) {
    const title = data[i][0];
    const dateStr = data[i][1];
    if (!title || !dateStr) continue;

    const eventDate = new Date(dateStr);
    if (isNaN(eventDate.getTime())) continue;

    if (eventDate < today) {
      rowsToArchive.push({ rowIndex: i + 4, data: data[i] }); // i+4 = actual row
    }
  }

  if (rowsToArchive.length === 0) {
    Logger.log('No past events to archive.');
    return;
  }

  // Append to Past Events
  for (const row of rowsToArchive) {
    peSheet.appendRow(row.data);
    Logger.log('Archived: ' + row.data[0] + ' (' + row.data[1] + ')');
  }

  // Clear archived rows from Special Events (bottom-up to avoid index shift)
  rowsToArchive.sort((a, b) => b.rowIndex - a.rowIndex);
  for (const row of rowsToArchive) {
    seSheet.getRange(row.rowIndex, 1, 1, seSheet.getLastColumn()).clearContent();
  }

  Logger.log('Archived ' + rowsToArchive.length + ' past event(s).');
}

/**
 * Run once to schedule daily auto-archive at 1am ET
 */
function setupArchiveTrigger() {
  // Remove existing archive triggers
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'archivePastEvents') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('archivePastEvents')
    .timeBased()
    .everyDays(1)
    .atHour(1)
    .create();

  Logger.log('Daily archive trigger created (runs at ~1am).');
}
