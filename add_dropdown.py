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

# Weekly Classes - Format is column I (index 8)
requests.append({
    "setDataValidation": {
        "range": {
            "sheetId": sheet_ids['Weekly Classes'],
            "startRowIndex": 3,  # Start after header (row 4)
            "endRowIndex": 100,
            "startColumnIndex": 8,  # Column I
            "endColumnIndex": 9
        },
        "rule": {
            "condition": {
                "type": "ONE_OF_LIST",
                "values": [
                    {"userEnteredValue": "In-Person"},
                    {"userEnteredValue": "In-Person + Streaming"}
                ]
            },
            "showCustomUi": True,
            "strict": True
        }
    }
})

# Special Events - Format is column J (index 9)
requests.append({
    "setDataValidation": {
        "range": {
            "sheetId": sheet_ids['Special Events'],
            "startRowIndex": 3,
            "endRowIndex": 100,
            "startColumnIndex": 9,  # Column J
            "endColumnIndex": 10
        },
        "rule": {
            "condition": {
                "type": "ONE_OF_LIST",
                "values": [
                    {"userEnteredValue": "In-Person"},
                    {"userEnteredValue": "In-Person + Streaming"}
                ]
            },
            "showCustomUi": True,
            "strict": True
        }
    }
})

# Past Events - Format is column J (index 9)
requests.append({
    "setDataValidation": {
        "range": {
            "sheetId": sheet_ids['Past Events'],
            "startRowIndex": 3,
            "endRowIndex": 100,
            "startColumnIndex": 9,
            "endColumnIndex": 10
        },
        "rule": {
            "condition": {
                "type": "ONE_OF_LIST",
                "values": [
                    {"userEnteredValue": "In-Person"},
                    {"userEnteredValue": "In-Person + Streaming"}
                ]
            },
            "showCustomUi": True,
            "strict": True
        }
    }
})

service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={"requests": requests}).execute()

print("✓ Dropdown added to Format column!")
print("Options: 'In-Person' or 'In-Person + Streaming'")
