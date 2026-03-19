#!/usr/bin/env python3
"""
Update the Cancellations Title dropdown (column B) to match current Weekly Classes titles.
Reads class titles from Weekly Classes tab and sets them as the dropdown options.
"""
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

# Read Weekly Classes titles from column A (rows 4+, skipping instruction/example/header)
result = service.spreadsheets().values().get(
    spreadsheetId=SPREADSHEET_ID,
    range="'Weekly Classes'!A4:A50"
).execute()
rows = result.get('values', [])

# Get unique titles, preserving order
seen = set()
titles = []
for row in rows:
    if row and row[0].strip():
        title = row[0].strip()
        if title not in seen:
            seen.add(title)
            titles.append(title)

print(f"Found {len(titles)} unique class titles:")
for t in titles:
    print(f"  - {t}")

# Update the Cancellations Title dropdown (column B, rows 4+)
request = {
    "setDataValidation": {
        "range": {
            "sheetId": sheet_ids['Cancellations'],
            "startRowIndex": 3,  # Row 4 onward
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
            "strict": False  # Allow manual entry too (in case of special events)
        }
    }
}

service.spreadsheets().batchUpdate(
    spreadsheetId=SPREADSHEET_ID,
    body={"requests": [request]}
).execute()

print("\nDone! Cancellations Title dropdown updated.")
