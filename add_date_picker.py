#!/usr/bin/env python3
"""Add date picker (calendar) to the Date column in Special Events and Past Events tabs."""
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

# Special Events - Date is column B (index 1)
requests.append({
    "setDataValidation": {
        "range": {
            "sheetId": sheet_ids['Special Events'],
            "startRowIndex": 3,  # Row 4 onward (skip instruction, example, header)
            "endRowIndex": 100,
            "startColumnIndex": 1,  # Column B
            "endColumnIndex": 2
        },
        "rule": {
            "condition": {
                "type": "DATE_IS_VALID"
            },
            "showCustomUi": True,
            "strict": False
        }
    }
})

# Past Events - Date is column B (index 1)
requests.append({
    "setDataValidation": {
        "range": {
            "sheetId": sheet_ids['Past Events'],
            "startRowIndex": 3,
            "endRowIndex": 100,
            "startColumnIndex": 1,
            "endColumnIndex": 2
        },
        "rule": {
            "condition": {
                "type": "DATE_IS_VALID"
            },
            "showCustomUi": True,
            "strict": False
        }
    }
})

# Cancellations - Date is column A (index 0)
requests.append({
    "setDataValidation": {
        "range": {
            "sheetId": sheet_ids['Cancellations'],
            "startRowIndex": 2,  # After header rows
            "endRowIndex": 100,
            "startColumnIndex": 0,  # Column A
            "endColumnIndex": 1
        },
        "rule": {
            "condition": {
                "type": "DATE_IS_VALID"
            },
            "showCustomUi": True,
            "strict": False
        }
    }
})

service.spreadsheets().batchUpdate(
    spreadsheetId=SPREADSHEET_ID,
    body={"requests": requests}
).execute()

print("Done! Date picker added to:")
print("  - Special Events column B (rows 4+)")
print("  - Past Events column B (rows 4+)")
print("  - Cancellations column A (rows 3+)")
