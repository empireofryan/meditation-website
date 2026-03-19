#!/usr/bin/env python3
"""
Add 'Class Info' column (L) to Weekly Classes sheet.
Updates individual cells only - preserves all formatting.
"""
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

credentials, project = default(scopes=['https://www.googleapis.com/auth/spreadsheets'])
credentials.refresh(Request())
service = build('sheets', 'v4', credentials=credentials)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# Boilerplate for General Program + 30-min classes
GP_CLASS_INFO = """Please arrive 5-10 minutes before class begins. Doors are locked promptly once class begins.

Suitable for beginners and experienced practitioners. No special clothing is required. Chairs and cushions are provided. Everyone welcome!"""

# Boilerplate for Foundation Program (commitment-based, slightly different)
FP_CLASS_INFO = """Please arrive 5-10 minutes before class begins. Doors are locked promptly once class begins.

This is a commitment-based study program. No special clothing is required. Chairs and cushions are provided."""

# ============================================================
# CELL UPDATES - Column L
# ============================================================

updates = [
    # Row 3: Header
    {"range": "'Weekly Classes'!L3", "values": [["Class Info"]]},
    # Row 4: Mon 30-min
    {"range": "'Weekly Classes'!L4", "values": [[GP_CLASS_INFO]]},
    # Row 5: Mon GP
    {"range": "'Weekly Classes'!L5", "values": [[GP_CLASS_INFO]]},
    # Row 6: Tue 30-min
    {"range": "'Weekly Classes'!L6", "values": [[GP_CLASS_INFO]]},
    # Row 7: Tue GP - Intro to Buddhism
    {"range": "'Weekly Classes'!L7", "values": [[GP_CLASS_INFO]]},
    # Row 8: Wed 30-min
    {"range": "'Weekly Classes'!L8", "values": [[GP_CLASS_INFO]]},
    # Row 9: Wed Foundation Program
    {"range": "'Weekly Classes'!L9", "values": [[FP_CLASS_INFO]]},
    # Row 10: Thu 30-min
    {"range": "'Weekly Classes'!L10", "values": [[GP_CLASS_INFO]]},
    # Row 11: Thu GP - Patient Acceptance
    {"range": "'Weekly Classes'!L11", "values": [[GP_CLASS_INFO]]},
    # Row 12: Fri 30-min
    {"range": "'Weekly Classes'!L12", "values": [[GP_CLASS_INFO]]},
    # Row 13: Sunday Morning
    {"range": "'Weekly Classes'!L13", "values": [[GP_CLASS_INFO]]},
]

print(f"Adding 'Class Info' column (L) - {len(updates)} cells...")
print("-" * 50)

for update in updates:
    try:
        service.spreadsheets().values().update(
            spreadsheetId=SPREADSHEET_ID,
            range=update['range'],
            valueInputOption='RAW',
            body={'values': update['values']}
        ).execute()
        print(f"  ✓ {update['range']}")
    except Exception as e:
        print(f"  ✗ {update['range']}: {e}")

# ============================================================
# SPECIAL EVENTS TAB - Column M
# ============================================================

SE_CLASS_INFO = """Please arrive 5-10 minutes before class begins. Doors are locked promptly once class begins.

Suitable for beginners and experienced practitioners. No special clothing is required. Chairs and cushions are provided. Everyone welcome!"""

se_updates = [
    # Row 3: Header
    {"range": "'Special Events'!M3", "values": [["Class Info"]]},
    # Row 4: 3 Go-to Meditations
    {"range": "'Special Events'!M4", "values": [[SE_CLASS_INFO]]},
    # Row 5: Fundamentals of Meditation
    {"range": "'Special Events'!M5", "values": [[SE_CLASS_INFO]]},
    # Row 6: Joy of Meditation
    {"range": "'Special Events'!M6", "values": [[SE_CLASS_INFO]]},
    # Row 7: Love and Happiness
    {"range": "'Special Events'!M7", "values": [[SE_CLASS_INFO]]},
    # Row 8: How to Unplug
    {"range": "'Special Events'!M8", "values": [[SE_CLASS_INFO]]},
    # Row 9: The Yoga of Eating
    {"range": "'Special Events'!M9", "values": [[SE_CLASS_INFO]]},
]

print(f"\nAdding 'Class Info' to Special Events (M) - {len(se_updates)} cells...")
print("-" * 50)

for update in se_updates:
    try:
        service.spreadsheets().values().update(
            spreadsheetId=SPREADSHEET_ID,
            range=update['range'],
            valueInputOption='RAW',
            body={'values': update['values']}
        ).execute()
        print(f"  ✓ {update['range']}")
    except Exception as e:
        print(f"  ✗ {update['range']}: {e}")

print("-" * 50)
print("✓ Done! 'Class Info' column added to both tabs.")
print(f"View: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
