#!/usr/bin/env python3
import csv
import json
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# Get credentials
credentials, project = default(scopes=[
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
])
credentials.refresh(Request())

# Build the Sheets service
service = build('sheets', 'v4', credentials=credentials)

# Create a new spreadsheet
spreadsheet = {
    "properties": {"title": "KMC Williamsburg Schedule"},
    "sheets": [
        {"properties": {"title": "Weekly Classes"}},
        {"properties": {"title": "Special Events"}},
        {"properties": {"title": "Past Events"}},
        {"properties": {"title": "Cancellations"}}
    ]
}

result = service.spreadsheets().create(body=spreadsheet).execute()
spreadsheet_id = result['spreadsheetId']
print(f"Created spreadsheet: https://docs.google.com/spreadsheets/d/{spreadsheet_id}/edit")

# Read CSV files
def read_csv(filename):
    with open(filename, 'r') as f:
        reader = csv.reader(f)
        return list(reader)

csv_files = {
    'Weekly Classes': '/Users/ryan/Development/MeditationSite/meditation-website/Weekly_Classes.csv',
    'Special Events': '/Users/ryan/Development/MeditationSite/meditation-website/Special_Events.csv',
    'Past Events': '/Users/ryan/Development/MeditationSite/meditation-website/Past_Events.csv',
    'Cancellations': '/Users/ryan/Development/MeditationSite/meditation-website/Cancellations.csv'
}

# Update each sheet with data
for sheet_name, csv_file in csv_files.items():
    try:
        data = read_csv(csv_file)
        if data:
            range_name = f"'{sheet_name}'!A1"
            body = {'values': data}
            service.spreadsheets().values().update(
                spreadsheetId=spreadsheet_id,
                range=range_name,
                valueInputOption='RAW',
                body=body
            ).execute()
            print(f"Populated {sheet_name} with {len(data)} rows")
    except Exception as e:
        print(f"Error with {sheet_name}: {e}")

print(f"\n✓ Spreadsheet ready!")
print(f"ID: {spreadsheet_id}")
print(f"URL: https://docs.google.com/spreadsheets/d/{spreadsheet_id}/edit")
