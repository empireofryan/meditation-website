#!/usr/bin/env python3
"""
Add February 2026 Saturday special events to the Special Events sheet.
Only adds new rows — does NOT touch existing rows or formatting.
"""
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

credentials, project = default(scopes=['https://www.googleapis.com/auth/spreadsheets'])
credentials.refresh(Request())
service = build('sheets', 'v4', credentials=credentials)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# February Saturday special events to add
# Columns: Title, Date, Start Time, End Time, Break, Teacher, Cost, Description, Registration Link, Format, Featured Image, Teacher Image
events = [
    {
        "row": 6,
        "data": [
            "Joy of Meditation",
            "February 7 2026",
            "11:00 AM",
            "12:30 PM",
            "",
            "",
            "$15",
            "At our heart is a doorway to deep peace, joy, and lightness. In this course, we explore what holds us back from meditating and how to gently overcome those barriers. Discover how meditation transforms Buddhist teachings into practical experience, deepens joy, and brings clarity to daily life.",
            "https://meditationinwilliamsburg.org/event/joy-of-meditation/",
            "In-Person",
            "",
            ""
        ]
    },
    {
        "row": 7,
        "data": [
            "Love and Happiness",
            "February 14 2026",
            "11:00 AM",
            "12:30 PM",
            "",
            "",
            "$15",
            "A Radical Valentine's Day Meditation. Pure love leads to happiness and fulfilling relationships. This course introduces the meditation practice of exchanging self with others as taught by Buddhist master Shantideva to cultivate empathy and reduce suffering.",
            "https://meditationinwilliamsburg.org/event/love-and-happiness/",
            "In-Person",
            "",
            ""
        ]
    },
    {
        "row": 8,
        "data": [
            "How to Unplug",
            "February 21 2026",
            "11:00 AM",
            "1:30 PM",
            "",
            "Tom Lauricella",
            "$25",
            "Meditations for Conquering the Itchy Hand. This two-part course explores what drives the urge to constantly check devices and teaches how to transform this habit into a springboard for meditating on the peaceful nature of our mind. Part two covers a foundational Buddhist meditation to establish healthier relationships with technology.",
            "https://checkout.meditationinnewyork.org/how-to-unplug-in-person-wb/",
            "In-Person",
            "",
            "https://meditationinwilliamsburg.org/wp-content/uploads/2024/10/tom-lauricella-kmc-kadampa-meditation-teacher-nyc-600x416-1.jpeg"
        ]
    },
    {
        "row": 9,
        "data": [
            "The Yoga of Eating",
            "February 28 2026",
            "11:00 AM",
            "1:30 PM",
            "",
            "Joseph Giacona",
            "$15",
            "The Buddhist Practice of Transforming Enjoyment. Learn how to transform everyday activities into profound spiritual paths, with specific focus on eating and drinking practices. When we combine ordinary activities with wisdom, they become powerful practices that steadily guide us toward greater happiness.",
            "https://checkout.meditationinnewyork.org/the-yoga-of-eating-in-person-wb/",
            "In-Person",
            "",
            ""
        ]
    },
]

# Column letters A through L
columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

print(f"Adding {len(events)} February special events (cell-by-cell, preserving formatting)...")
print("-" * 50)

for event in events:
    row = event["row"]
    title = event["data"][0]
    print(f"\n  Adding: {title} (row {row})")

    for i, value in enumerate(event["data"]):
        if not value:  # Skip empty cells
            continue
        cell = f"'Special Events'!{columns[i]}{row}"
        try:
            service.spreadsheets().values().update(
                spreadsheetId=SPREADSHEET_ID,
                range=cell,
                valueInputOption='RAW',
                body={'values': [[value]]}
            ).execute()
            print(f"    ✓ {columns[i]}{row}: {value[:50]}{'...' if len(value) > 50 else ''}")
        except Exception as e:
            print(f"    ✗ {columns[i]}{row}: {e}")

print("\n" + "-" * 50)
print("✓ Done!")
print(f"View: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit?gid=1082221098#gid=1082221098")
