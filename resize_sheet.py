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

for sheet_name, sheet_id in sheet_ids.items():
    if sheet_name == 'Cancellations':
        col_widths = [150, 120, 100, 300]
    else:
        # Wider columns: Title, Day/Date, Time, Duration/EndTime, Break/Teacher, Teacher/Cost, Cost/Desc, Description, RegLink, Format, FeatImg, TeacherImg
        col_widths = [250, 100, 90, 90, 150, 150, 80, 400, 250, 140, 250, 250]

    for i, width in enumerate(col_widths):
        requests.append({
            "updateDimensionProperties": {
                "range": {"sheetId": sheet_id, "dimension": "COLUMNS", "startIndex": i, "endIndex": i + 1},
                "properties": {"pixelSize": width},
                "fields": "pixelSize"
            }
        })

    # Taller rows for data (row 4 onwards) to show wrapped text
    requests.append({
        "updateDimensionProperties": {
            "range": {"sheetId": sheet_id, "dimension": "ROWS", "startIndex": 3, "endIndex": 50},
            "properties": {"pixelSize": 80},
            "fields": "pixelSize"
        }
    })

    # Enable text wrap for all cells
    requests.append({
        "repeatCell": {
            "range": {"sheetId": sheet_id},
            "cell": {"userEnteredFormat": {"wrapStrategy": "WRAP", "verticalAlignment": "TOP"}},
            "fields": "userEnteredFormat(wrapStrategy,verticalAlignment)"
        }
    })

service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={"requests": requests}).execute()

print("✓ Columns widened and text wrapping enabled!")
print(f"View: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
