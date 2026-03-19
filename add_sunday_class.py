#!/usr/bin/env python3
"""
Add Sunday class row to Weekly Classes sheet.
Only updates cell values — formatting is preserved.
"""
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

credentials, project = default(scopes=['https://www.googleapis.com/auth/spreadsheets'])
credentials.refresh(Request())
service = build('sheets', 'v4', credentials=credentials)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# Sunday class data from meditationinwilliamsburg.org (current as of March 2026)
SUNDAY_DESC = """Discover the timeless wisdom of Atisha, the great Indian Buddhist master and founder of the Kadampa tradition. In this new Sunday series we will explore Advice from Atisha's Heart, a deeply practical guide to living a life of inner peace, compassion, and wisdom. We will explore Atisha's essential teachings — short, powerful instructions that help us transform everyday challenges into opportunities for spiritual growth. Each week, Joseph will focus on specific pieces of his advice, uncovering their deeper meaning and learning how to integrate them into our own thoughts and experiences. These teachings offer immediate, personal relevance — helping us shift unhelpful habits, improve relationships, and respond skillfully to isolation, fear, and dissatisfaction. Through guided meditation and discussion, we'll bring these treasured teachings to life and discover how to live with more wisdom, purpose, and be of greater benefit to those around us. Everybody Welcome.

Followed by Coffee, Tea and Chat."""

SUNDAY_CLASS_INFO = """Please arrive 5-10 minutes before class begins. Doors are locked promptly once class begins.

Suitable for beginners and experienced practitioners. No special clothing is required. Chairs and cushions are provided. Everyone welcome!"""

# Row 13: Sunday class (A13 through L13)
sunday_row = [
    "Practical Advice for a Happy Life",           # A - Title
    "Sunday",                                        # B - Day
    "11:00 AM",                                      # C - Time
    "90",                                            # D - Duration (mins)
    "Joseph",                                        # E - Teacher
    "$15",                                           # F - Cost
    SUNDAY_DESC,                                     # G - Description
    "https://checkout.meditationinnewyork.org/sunday-gp-in-person-wb/",  # H - Registration Link
    "In-Person",                                     # I - Format
    "",                                              # J - Featured Image
    "https://meditationinwilliamsburg.org/wp-content/uploads/2023/12/Joseph_Teachers-Fotos-42101-EYES-OPEN-scaled.jpg",  # K - Teacher Image
    SUNDAY_CLASS_INFO,                               # L - Class Info
]

print("Adding Sunday class to Row 13 (values only, formatting preserved)...")
print("-" * 50)

try:
    service.spreadsheets().values().update(
        spreadsheetId=SPREADSHEET_ID,
        range="'Weekly Classes'!A13:L13",
        valueInputOption='RAW',
        body={'values': [sunday_row]}
    ).execute()
    print("  ✓ Row 13: Sunday - Practical Advice for a Happy Life")
except Exception as e:
    print(f"  ✗ Row 13: {e}")

print("-" * 50)
print("✓ Done!")
print(f"View: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
