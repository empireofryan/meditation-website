#!/usr/bin/env python3
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

credentials, project = default(scopes=[
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
])
credentials.refresh(Request())
service = build('sheets', 'v4', credentials=credentials)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# Get sheet IDs
sheet_metadata = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
sheet_ids = {s['properties']['title']: s['properties']['sheetId'] for s in sheet_metadata['sheets']}

requests = []

# Column counts for each sheet type
col_counts = {
    'Weekly Classes': 11,      # A-K
    'Special Events': 12,      # A-L
    'Past Events': 12,         # A-L
    'Cancellations': 4         # A-D
}

for sheet_name, sheet_id in sheet_ids.items():
    end_col = col_counts.get(sheet_name, 12)

    # Merge row 1 across all columns
    requests.append({
        "mergeCells": {
            "range": {
                "sheetId": sheet_id,
                "startRowIndex": 0,
                "endRowIndex": 1,
                "startColumnIndex": 0,
                "endColumnIndex": end_col
            },
            "mergeType": "MERGE_ALL"
        }
    })

service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={"requests": requests}).execute()

print("✓ Row 1 merged across all columns!")
print(f"View: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
