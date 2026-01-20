#!/usr/bin/env python3
"""
Add dropdown to Cancellations sheet Title column (B)
that pulls class names from Weekly Classes sheet.
ONLY adds data validation - does NOT modify any existing content.
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

print(f"Found sheets: {list(sheet_ids.keys())}")

# First, fetch the class titles from Weekly Classes to use as dropdown options
result = service.spreadsheets().values().get(
    spreadsheetId=SPREADSHEET_ID,
    range="'Weekly Classes'!A4:A20"
).execute()

values = result.get('values', [])
# Get unique titles while preserving order
seen = set()
class_titles = []
for row in values:
    if row and row[0] and not row[0].lower().startswith('example'):
        title = row[0]
        if title not in seen:
            seen.add(title)
            class_titles.append(title)

print(f"Class titles for dropdown: {class_titles}")

# Create the data validation request for Cancellations Title column (B)
requests = [{
    "setDataValidation": {
        "range": {
            "sheetId": sheet_ids['Cancellations'],
            "startRowIndex": 3,  # Start at row 4 (after header)
            "endRowIndex": 100,
            "startColumnIndex": 1,  # Column B (index 1)
            "endColumnIndex": 2
        },
        "rule": {
            "condition": {
                "type": "ONE_OF_LIST",
                "values": [{"userEnteredValue": title} for title in class_titles]
            },
            "showCustomUi": True,
            "strict": False  # Allow other values too in case of special cases
        }
    }
}]

service.spreadsheets().batchUpdate(
    spreadsheetId=SPREADSHEET_ID,
    body={"requests": requests}
).execute()

print("✓ Dropdown added to Cancellations Title column (B)!")
print(f"Options: {', '.join(class_titles)}")
