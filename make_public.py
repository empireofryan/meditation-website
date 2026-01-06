#!/usr/bin/env python3
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

credentials, project = default(scopes=[
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
])
credentials.refresh(Request())

# Use Drive API to update sharing permissions
drive_service = build('drive', 'v3', credentials=credentials)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# Make the spreadsheet readable by anyone with the link
permission = {
    'type': 'anyone',
    'role': 'reader'
}

drive_service.permissions().create(
    fileId=SPREADSHEET_ID,
    body=permission,
    fields='id'
).execute()

print("✓ Spreadsheet is now publicly readable!")
print(f"Anyone can view: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
