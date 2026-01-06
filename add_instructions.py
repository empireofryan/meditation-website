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

# Add instruction content - update existing rows 1-2
weekly_instructions = [
    ["WEEKLY CLASSES - Recurring classes that happen every week. Duration is in minutes. Format: 'In-Person' or 'In-Person + Streaming'"],
    ["Example →", "Meditation 101", "Monday", "7:00 PM", "60", "Jane Smith", "$15", "A beginner-friendly introduction.", "https://checkout.example.com", "In-Person", "https://example.com/img.jpg"]
]

special_instructions = [
    ["SPECIAL EVENTS - One-time workshops. For breaks: '12:00-1:00 PM Lunch' or '12-1 Lunch, 3-3:15 Tea' for multiple"],
    ["Example →", "Weekend Retreat", "Jan 15 2026", "10:00 AM", "4:00 PM", "12-1 PM Lunch", "Jane Smith", "$45", "A full day retreat.", "https://checkout.example.com", "In-Person", "https://example.com/img.jpg"]
]

past_instructions = [
    ["PAST EVENTS - Events automatically move here after their date passes. Keep for reference."],
    [""]
]

cancel_instructions = [
    ["CANCELLATIONS - Add dates when weekly classes won't happen. Website shows 'No Class' with your reason."],
    ["Example →", "January 20 2026", "Monday", "MLK Day - Center Closed"]
]

# Update rows 1-2 of each sheet
service.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID, range="'Weekly Classes'!A1:K2",
    valueInputOption='RAW', body={'values': weekly_instructions}
).execute()

service.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID, range="'Special Events'!A1:L2",
    valueInputOption='RAW', body={'values': special_instructions}
).execute()

service.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID, range="'Past Events'!A1:L2",
    valueInputOption='RAW', body={'values': past_instructions}
).execute()

service.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID, range="'Cancellations'!A1:D2",
    valueInputOption='RAW', body={'values': cancel_instructions}
).execute()

print("Added instructions")

# Format instruction rows
requests = []
instruction_bg = {"red": 1, "green": 0.98, "blue": 0.9}  # Light yellow
example_bg = {"red": 0.95, "green": 0.98, "blue": 0.95}  # Light green

for sheet_name, sheet_id in sheet_ids.items():
    # Row 1 - Instructions (yellow, italic)
    requests.append({
        "repeatCell": {
            "range": {"sheetId": sheet_id, "startRowIndex": 0, "endRowIndex": 1},
            "cell": {
                "userEnteredFormat": {
                    "backgroundColor": instruction_bg,
                    "textFormat": {"italic": True, "fontSize": 10},
                    "wrapStrategy": "WRAP"
                }
            },
            "fields": "userEnteredFormat(backgroundColor,textFormat,wrapStrategy)"
        }
    })

    # Row 2 - Example (green, italic, muted text)
    requests.append({
        "repeatCell": {
            "range": {"sheetId": sheet_id, "startRowIndex": 1, "endRowIndex": 2},
            "cell": {
                "userEnteredFormat": {
                    "backgroundColor": example_bg,
                    "textFormat": {"italic": True, "fontSize": 10, "foregroundColor": {"red": 0.4, "green": 0.5, "blue": 0.4}}
                }
            },
            "fields": "userEnteredFormat(backgroundColor,textFormat)"
        }
    })

service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={"requests": requests}).execute()

print("✓ Instructions and examples added!")
print(f"View: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
