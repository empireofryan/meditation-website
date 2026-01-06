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

# Fix example rows with correct column alignment
# Weekly Classes: Title, Day, Time, Duration, Teacher, Cost, Description, RegLink, Format, FeaturedImg, TeacherImg
weekly_example = [[
    "Example →",           # A - will show in Title column but that's ok
    "Monday",              # B - Day
    "7:00 PM",             # C - Time
    "60",                  # D - Duration
    "Jane Smith",          # E - Teacher
    "$15",                 # F - Cost
    "A beginner-friendly intro to meditation.",  # G - Description
    "https://example.com/register",              # H - Registration Link
    "In-Person",           # I - Format
    "https://example.com/class.jpg",             # J - Featured Image
    "https://example.com/teacher.jpg"            # K - Teacher Image
]]

# Special Events: Title, Date, StartTime, EndTime, Break, Teacher, Cost, Description, RegLink, Format, FeaturedImg, TeacherImg
special_example = [[
    "Example →",
    "Jan 15 2026",
    "10:00 AM",
    "4:00 PM",
    "12-1 PM Lunch",
    "Jane Smith",
    "$45",
    "A full day retreat.",
    "https://example.com/register",
    "In-Person + Streaming",
    "https://example.com/event.jpg",
    "https://example.com/teacher.jpg"
]]

# Clear and rewrite row 2
service.spreadsheets().values().clear(spreadsheetId=SPREADSHEET_ID, range="'Weekly Classes'!A2:K2").execute()
service.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID, range="'Weekly Classes'!A2:K2",
    valueInputOption='RAW', body={'values': weekly_example}
).execute()

service.spreadsheets().values().clear(spreadsheetId=SPREADSHEET_ID, range="'Special Events'!A2:L2").execute()
service.spreadsheets().values().update(
    spreadsheetId=SPREADSHEET_ID, range="'Special Events'!A2:L2",
    valueInputOption='RAW', body={'values': special_example}
).execute()

print("✓ Example rows fixed!")
