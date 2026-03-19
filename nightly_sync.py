#!/usr/bin/env python3
"""
Nightly sync for KMC Williamsburg Schedule Google Sheet.

1. Moves past Special Events to the Past Events tab
2. Updates the Cancellations Title dropdown from current Weekly Classes
"""
import sys
import logging
from datetime import datetime, date

from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('/Users/ryan/Development/MeditationSite/meditation-website/nightly_sync.log')
    ]
)
log = logging.getLogger(__name__)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'
NUM_COLS = 13  # Columns A through M

def get_service():
    credentials, _ = default(scopes=[
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive'
    ])
    credentials.refresh(Request())
    return build('sheets', 'v4', credentials=credentials)

def parse_event_date(date_str: str) -> date | None:
    for fmt in ['%m/%d/%Y', '%B %d %Y', '%B %d, %Y', '%b %d %Y', '%b %d, %Y', '%m/%d/%y']:
        try:
            return datetime.strptime(date_str.strip(), fmt).date()
        except ValueError:
            continue
    return None

def move_past_events(service):
    """Move past special events from Special Events to Past Events tab."""
    log.info("--- Moving past Special Events ---")
    sheets = service.spreadsheets()
    today = date.today()

    # Read Special Events (rows 4+, all columns A-M)
    result = sheets.values().get(
        spreadsheetId=SPREADSHEET_ID,
        range="'Special Events'!A4:M100"
    ).execute()
    rows = result.get('values', [])

    past_events = []
    for i, row in enumerate(rows):
        if not row or not row[0].strip():
            continue
        title = row[0]
        date_str = row[1] if len(row) > 1 else ''
        event_date = parse_event_date(date_str)

        if event_date and event_date < today:
            past_events.append((i + 4, row))  # i+4 = actual sheet row
            log.info(f"  Past: {title} ({date_str})")

    if not past_events:
        log.info("  No past events to move.")
        return

    # Find next empty row in Past Events
    past_result = sheets.values().get(
        spreadsheetId=SPREADSHEET_ID,
        range="'Past Events'!A1:A100"
    ).execute()
    next_row = len(past_result.get('values', [])) + 1

    # Copy to Past Events, then clear from Special Events
    for sheet_row, row_data in past_events:
        padded = row_data + [''] * (NUM_COLS - len(row_data))
        sheets.values().update(
            spreadsheetId=SPREADSHEET_ID,
            range=f"'Past Events'!A{next_row}",
            valueInputOption='RAW',
            body={'values': [padded]}
        ).execute()
        log.info(f"  Copied row {sheet_row} -> Past Events row {next_row}")
        next_row += 1

    for sheet_row, _ in past_events:
        sheets.values().update(
            spreadsheetId=SPREADSHEET_ID,
            range=f"'Special Events'!A{sheet_row}:M{sheet_row}",
            valueInputOption='RAW',
            body={'values': [[''] * NUM_COLS]}
        ).execute()
        log.info(f"  Cleared Special Events row {sheet_row}")

    log.info(f"  Moved {len(past_events)} event(s).")

def sync_cancellation_dropdown(service):
    """Update Cancellations Title dropdown from current Weekly Classes."""
    log.info("--- Syncing Cancellations dropdown ---")
    sheets = service.spreadsheets()

    # Get sheet IDs
    meta = sheets.get(spreadsheetId=SPREADSHEET_ID).execute()
    sheet_ids = {s['properties']['title']: s['properties']['sheetId'] for s in meta['sheets']}

    # Read Weekly Classes titles (column A, rows 4+)
    result = sheets.values().get(
        spreadsheetId=SPREADSHEET_ID,
        range="'Weekly Classes'!A4:A50"
    ).execute()
    rows = result.get('values', [])

    seen = set()
    titles = []
    for row in rows:
        if row and row[0].strip():
            title = row[0].strip()
            if title not in seen:
                seen.add(title)
                titles.append(title)

    log.info(f"  Found {len(titles)} unique titles: {titles}")

    if not titles:
        log.warning("  No titles found — skipping dropdown update.")
        return

    request = {
        "setDataValidation": {
            "range": {
                "sheetId": sheet_ids['Cancellations'],
                "startRowIndex": 3,
                "endRowIndex": 100,
                "startColumnIndex": 1,  # Column B
                "endColumnIndex": 2
            },
            "rule": {
                "condition": {
                    "type": "ONE_OF_LIST",
                    "values": [{"userEnteredValue": t} for t in titles]
                },
                "showCustomUi": True,
                "strict": False
            }
        }
    }

    sheets.batchUpdate(
        spreadsheetId=SPREADSHEET_ID,
        body={"requests": [request]}
    ).execute()
    log.info("  Dropdown updated.")

def main():
    log.info("=== Nightly sync started ===")
    try:
        service = get_service()
        move_past_events(service)
        sync_cancellation_dropdown(service)
        log.info("=== Nightly sync complete ===\n")
    except Exception as e:
        log.error(f"Sync failed: {e}", exc_info=True)
        sys.exit(1)

if __name__ == '__main__':
    main()
