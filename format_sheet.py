#!/usr/bin/env python3
import csv
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

# New column order for Weekly Classes
weekly_headers = ['Title', 'Day', 'Time', 'Duration (mins)', 'Teacher', 'Cost', 'Description', 'Registration Link', 'Format', 'Featured Image', 'Teacher Image']

# Read current data and reorder
def read_csv(filename):
    with open(filename, 'r') as f:
        reader = csv.DictReader(f)
        return list(reader)

# Weekly Classes - reordered
weekly_data = read_csv('/Users/ryan/Development/MeditationSite/meditation-website/Weekly_Classes.csv')
weekly_rows = [weekly_headers]
for row in weekly_data:
    weekly_rows.append([
        row.get('Title', ''),
        row.get('Day', ''),
        row.get('Time', ''),
        row.get('Duration (mins)', ''),
        row.get('Teacher', ''),
        row.get('Cost', ''),
        row.get('Description', ''),
        row.get('Registration Link', ''),
        row.get('Format', ''),
        row.get('Featured Image', ''),
        row.get('Teacher Image', '')
    ])

# Special Events - reordered
special_headers = ['Title', 'Date', 'Start Time', 'End Time', 'Break', 'Teacher', 'Cost', 'Description', 'Registration Link', 'Format', 'Featured Image', 'Teacher Image']
special_data = read_csv('/Users/ryan/Development/MeditationSite/meditation-website/Special_Events.csv')
special_rows = [special_headers]
for row in special_data:
    special_rows.append([
        row.get('Title', ''),
        row.get('Date', ''),
        row.get('Start Time', ''),
        row.get('End Time', ''),
        row.get('Break', ''),
        row.get('Teacher', ''),
        row.get('Cost', ''),
        row.get('Description', ''),
        row.get('Registration Link', ''),
        row.get('Format', ''),
        row.get('Featured Image', ''),
        row.get('Teacher Image', '')
    ])

# Past Events - same as special
past_data = read_csv('/Users/ryan/Development/MeditationSite/meditation-website/Past_Events.csv')
past_rows = [special_headers]
for row in past_data:
    past_rows.append([
        row.get('Title', ''),
        row.get('Date', ''),
        row.get('Start Time', ''),
        row.get('End Time', ''),
        row.get('Break', ''),
        row.get('Teacher', ''),
        row.get('Cost', ''),
        row.get('Description', ''),
        row.get('Registration Link', ''),
        row.get('Format', ''),
        row.get('Featured Image', ''),
        row.get('Teacher Image', '')
    ])

# Get sheet IDs
sheet_metadata = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
sheet_ids = {s['properties']['title']: s['properties']['sheetId'] for s in sheet_metadata['sheets']}

# Clear and update all sheets
service.spreadsheets().values().clear(spreadsheetId=SPREADSHEET_ID, range="'Weekly Classes'!A:Z").execute()
service.spreadsheets().values().clear(spreadsheetId=SPREADSHEET_ID, range="'Special Events'!A:Z").execute()
service.spreadsheets().values().clear(spreadsheetId=SPREADSHEET_ID, range="'Past Events'!A:Z").execute()

service.spreadsheets().values().update(spreadsheetId=SPREADSHEET_ID, range="'Weekly Classes'!A1", valueInputOption='RAW', body={'values': weekly_rows}).execute()
service.spreadsheets().values().update(spreadsheetId=SPREADSHEET_ID, range="'Special Events'!A1", valueInputOption='RAW', body={'values': special_rows}).execute()
service.spreadsheets().values().update(spreadsheetId=SPREADSHEET_ID, range="'Past Events'!A1", valueInputOption='RAW', body={'values': past_rows}).execute()

print("Data reordered!")

# Apply formatting
requests = []

# Colors
header_bg = {"red": 0.2, "green": 0.3, "blue": 0.4}  # Dark blue-gray
header_text = {"red": 1, "green": 1, "blue": 1}  # White
alt_row_bg = {"red": 0.95, "green": 0.96, "blue": 0.97}  # Light gray

for sheet_name, sheet_id in sheet_ids.items():
    if sheet_name == 'Cancellations':
        continue

    # Format header row - bold, white text, dark background
    requests.append({
        "repeatCell": {
            "range": {"sheetId": sheet_id, "startRowIndex": 0, "endRowIndex": 1},
            "cell": {
                "userEnteredFormat": {
                    "backgroundColor": header_bg,
                    "textFormat": {"bold": True, "foregroundColor": header_text, "fontSize": 11},
                    "horizontalAlignment": "CENTER",
                    "verticalAlignment": "MIDDLE",
                    "padding": {"top": 8, "bottom": 8, "left": 8, "right": 8}
                }
            },
            "fields": "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,padding)"
        }
    })

    # Freeze header row
    requests.append({
        "updateSheetProperties": {
            "properties": {"sheetId": sheet_id, "gridProperties": {"frozenRowCount": 1}},
            "fields": "gridProperties.frozenRowCount"
        }
    })

    # Set column widths
    col_widths = [200, 100, 80, 80, 120, 70, 300, 200, 120, 200, 200]
    for i, width in enumerate(col_widths):
        requests.append({
            "updateDimensionProperties": {
                "range": {"sheetId": sheet_id, "dimension": "COLUMNS", "startIndex": i, "endIndex": i + 1},
                "properties": {"pixelSize": width},
                "fields": "pixelSize"
            }
        })

    # Set row height for data rows
    requests.append({
        "updateDimensionProperties": {
            "range": {"sheetId": sheet_id, "dimension": "ROWS", "startIndex": 1, "endIndex": 20},
            "properties": {"pixelSize": 35},
            "fields": "pixelSize"
        }
    })

    # Alternating row colors
    requests.append({
        "addConditionalFormatRule": {
            "rule": {
                "ranges": [{"sheetId": sheet_id, "startRowIndex": 1}],
                "booleanRule": {
                    "condition": {"type": "CUSTOM_FORMULA", "values": [{"userEnteredValue": "=ISEVEN(ROW())"}]},
                    "format": {"backgroundColor": alt_row_bg}
                }
            },
            "index": 0
        }
    })

    # Text wrapping for description column
    requests.append({
        "repeatCell": {
            "range": {"sheetId": sheet_id, "startColumnIndex": 6, "endColumnIndex": 7},
            "cell": {"userEnteredFormat": {"wrapStrategy": "WRAP"}},
            "fields": "userEnteredFormat.wrapStrategy"
        }
    })

# Also format Cancellations header
cancel_id = sheet_ids.get('Cancellations')
if cancel_id:
    requests.append({
        "repeatCell": {
            "range": {"sheetId": cancel_id, "startRowIndex": 0, "endRowIndex": 1},
            "cell": {
                "userEnteredFormat": {
                    "backgroundColor": header_bg,
                    "textFormat": {"bold": True, "foregroundColor": header_text, "fontSize": 11},
                    "horizontalAlignment": "CENTER"
                }
            },
            "fields": "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)"
        }
    })
    requests.append({
        "updateSheetProperties": {
            "properties": {"sheetId": cancel_id, "gridProperties": {"frozenRowCount": 1}},
            "fields": "gridProperties.frozenRowCount"
        }
    })

# Execute all formatting
service.spreadsheets().batchUpdate(spreadsheetId=SPREADSHEET_ID, body={"requests": requests}).execute()

print("✓ Formatting applied!")
print(f"View: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
