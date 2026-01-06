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

# Weekly Classes column widths: Title, Day, Time, Duration, Teacher, Cost, Description, RegLink, Format, FeatImg, TeacherImg
weekly_widths = [220, 100, 80, 80, 150, 70, 300, 280, 150, 200, 200]

# Special/Past Events column widths: Title, Date, StartTime, EndTime, Break, Teacher, Cost, Description, RegLink, Format, FeatImg, TeacherImg
events_widths = [220, 110, 90, 90, 130, 150, 70, 300, 280, 150, 200, 200]

# Cancellations column widths: Date, Day, Class, Reason
cancel_widths = [120, 100, 200, 300]

for sheet_name, sheet_id in sheet_ids.items():
    # Choose widths based on sheet
    if sheet_name == 'Weekly Classes':
        widths = weekly_widths
    elif sheet_name == 'Cancellations':
        widths = cancel_widths
    else:
        widths = events_widths

    # Set column widths
    for i, width in enumerate(widths):
        requests.append({
            "updateDimensionProperties": {
                "range": {"sheetId": sheet_id, "dimension": "COLUMNS", "startIndex": i, "endIndex": i + 1},
                "properties": {"pixelSize": width},
                "fields": "pixelSize"
            }
        })

    # Row 1 (instructions) - shorter height
    requests.append({
        "updateDimensionProperties": {
            "range": {"sheetId": sheet_id, "dimension": "ROWS", "startIndex": 0, "endIndex": 1},
            "properties": {"pixelSize": 30},
            "fields": "pixelSize"
        }
    })

    # Row 2 (example) - moderate height
    requests.append({
        "updateDimensionProperties": {
            "range": {"sheetId": sheet_id, "dimension": "ROWS", "startIndex": 1, "endIndex": 2},
            "properties": {"pixelSize": 50},
            "fields": "pixelSize"
        }
    })

    # Row 3 (header) - standard height
    requests.append({
        "updateDimensionProperties": {
            "range": {"sheetId": sheet_id, "dimension": "ROWS", "startIndex": 2, "endIndex": 3},
            "properties": {"pixelSize": 40},
            "fields": "pixelSize"
        }
    })

    # Data rows (4+) - taller for wrapped text
    requests.append({
        "updateDimensionProperties": {
            "range": {"sheetId": sheet_id, "dimension": "ROWS", "startIndex": 3, "endIndex": 50},
            "properties": {"pixelSize": 70},
            "fields": "pixelSize"
        }
    })

    # Left-align all data cells
    requests.append({
        "repeatCell": {
            "range": {"sheetId": sheet_id, "startRowIndex": 1},
            "cell": {
                "userEnteredFormat": {
                    "horizontalAlignment": "LEFT",
                    "verticalAlignment": "TOP",
                    "wrapStrategy": "WRAP"
                }
            },
            "fields": "userEnteredFormat(horizontalAlignment,verticalAlignment,wrapStrategy)"
        }
    })

    # Keep header row centered
    requests.append({
        "repeatCell": {
            "range": {"sheetId": sheet_id, "startRowIndex": 2, "endRowIndex": 3},
            "cell": {
                "userEnteredFormat": {
                    "horizontalAlignment": "CENTER",
                    "verticalAlignment": "MIDDLE"
                }
            },
            "fields": "userEnteredFormat(horizontalAlignment,verticalAlignment)"
        }
    })

service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={"requests": requests}).execute()

print("✓ Formatting improved!")
print(f"View: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
