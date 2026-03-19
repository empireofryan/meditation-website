#!/usr/bin/env python3
"""Read current sheet structure to confirm column layout."""
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

credentials, project = default(scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
credentials.refresh(Request())
service = build('sheets', 'v4', credentials=credentials)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# Read header row and first few data rows
result = service.spreadsheets().values().get(
    spreadsheetId=SPREADSHEET_ID,
    range="'Weekly Classes'!A1:Z12"
).execute()

rows = result.get('values', [])
for i, row in enumerate(rows):
    print(f"Row {i+1} ({len(row)} cols): {row[:15]}")  # Show first 15 cols
