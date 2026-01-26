#!/usr/bin/env python3
"""
Add Announcements tab to the KMC Schedule spreadsheet.
Columns: Announcement, Start Date, End Date
"""
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# Get credentials
credentials, project = default(scopes=[
    'https://www.googleapis.com/auth/spreadsheets'
])
credentials.refresh(Request())

# Build the Sheets service
service = build('sheets', 'v4', credentials=credentials)

# First, add the new sheet
try:
    add_sheet_request = {
        "requests": [{
            "addSheet": {
                "properties": {
                    "title": "Announcements",
                    "index": 4  # Add after Cancellations
                }
            }
        }]
    }
    service.spreadsheets().batchUpdate(
        spreadsheetId=SPREADSHEET_ID,
        body=add_sheet_request
    ).execute()
    print("Created 'Announcements' sheet")
except Exception as e:
    if "already exists" in str(e):
        print("'Announcements' sheet already exists, continuing...")
    else:
        print(f"Error creating sheet: {e}")
        raise

# Add header row
headers = [['Announcement', 'Start Date', 'End Date']]
service.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID,
    range="'Announcements'!A1:C1",
    valueInputOption='RAW',
    body={'values': headers}
).execute()
print("Added headers: Announcement, Start Date, End Date")

# Format the header row (bold, background color)
# First get the sheet ID
spreadsheet = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
sheet_id = None
for sheet in spreadsheet['sheets']:
    if sheet['properties']['title'] == 'Announcements':
        sheet_id = sheet['properties']['sheetId']
        break

if sheet_id is not None:
    format_requests = {
        "requests": [
            # Bold header row
            {
                "repeatCell": {
                    "range": {
                        "sheetId": sheet_id,
                        "startRowIndex": 0,
                        "endRowIndex": 1,
                        "startColumnIndex": 0,
                        "endColumnIndex": 3
                    },
                    "cell": {
                        "userEnteredFormat": {
                            "textFormat": {"bold": True},
                            "backgroundColor": {"red": 0.9, "green": 0.9, "blue": 0.9}
                        }
                    },
                    "fields": "userEnteredFormat(textFormat,backgroundColor)"
                }
            },
            # Set column widths
            {
                "updateDimensionProperties": {
                    "range": {
                        "sheetId": sheet_id,
                        "dimension": "COLUMNS",
                        "startIndex": 0,
                        "endIndex": 1
                    },
                    "properties": {"pixelSize": 400},
                    "fields": "pixelSize"
                }
            },
            {
                "updateDimensionProperties": {
                    "range": {
                        "sheetId": sheet_id,
                        "dimension": "COLUMNS",
                        "startIndex": 1,
                        "endIndex": 3
                    },
                    "properties": {"pixelSize": 120},
                    "fields": "pixelSize"
                }
            }
        ]
    }
    service.spreadsheets().batchUpdate(
        spreadsheetId=SPREADSHEET_ID,
        body=format_requests
    ).execute()
    print("Applied formatting to header row")

print("\nAnnouncements tab created successfully!")
print(f"Edit at: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit#gid={sheet_id}")
print("\nTo add an announcement:")
print("  Column A: Announcement text")
print("  Column B: Start Date (e.g., 1/26/2026)")
print("  Column C: End Date (e.g., 2/1/2026)")
