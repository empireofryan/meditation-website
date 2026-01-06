#!/usr/bin/env python3
"""Update specific cells in Google Sheet without touching formatting"""
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

credentials, project = default(scopes=['https://www.googleapis.com/auth/spreadsheets'])
credentials.refresh(Request())
service = build('sheets', 'v4', credentials=credentials)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# Update just the Patient Acceptance description (Row 9, Column G)
new_description = "This series explores how Buddhist teachings on patient acceptance help us free ourselves from taking things so personally. Through studying anger's ineffectiveness, the wisdom of acceptance, and the concept of no self, participants learn to transform problems and conflicts into opportunities for great spiritual growth."

service.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID,
    range="'Weekly Classes'!G9",
    valueInputOption='RAW',
    body={'values': [[new_description]]}
).execute()

print("Updated Patient Acceptance description in cell G9")
