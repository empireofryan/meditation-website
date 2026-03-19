#!/usr/bin/env python3
"""
Update Weekly Classes sheet with current March 2026 series.
Only updates cell values — formatting is preserved.
"""
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

credentials, project = default(scopes=['https://www.googleapis.com/auth/spreadsheets'])
credentials.refresh(Request())
service = build('sheets', 'v4', credentials=credentials)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# ============================================================
# NEW MARCH 2026 SERIES DESCRIPTIONS
# ============================================================

# Monday General Program - Row 5 (Title: col A, Description: col G)
MONDAY_TITLE = "Transforming Painful Emotions: A Buddhist Approach"
MONDAY_DESC = """In Buddhism, painful emotions are known as delusions. They are called this precisely because they are distorted ways of seeing the world that cloud our perceptions. Delusions such as anger, desirous attachment, jealousy, insecurity, and pride are unreliable states of mind that inevitably create suffering for ourselves and others. Buddha taught clear, practical methods — rooted in wisdom and compassion — that enable us to recognize and overcome these delusions. In this series, we will learn how to identify our painful emotions, understand their causes, and apply Buddha's transformative methods to free ourselves from their grip. Through guided meditation and practical teachings, we will discover how to replace destructive mental habits with positive states of mind that lead to lasting inner peace and happiness."""

# Thursday General Program - Row 11 (Title: col A, Description: col G)
THURSDAY_TITLE = "The Wisdom to Transform Adverse Conditions"
THURSDAY_DESC = """During this series, we will investigate how we can use special insights to transform our problems into the means for increasing our good qualities. This special ability, known as transforming adverse conditions into the path, enables us to integrate all of our experiences into our spiritual training. Living skillfully and creatively in this way makes every moment of our life meaningful and ensures that even the most challenging circumstances become fuel for our spiritual growth."""

# ============================================================
# CELL UPDATES (values only, formatting preserved)
# ============================================================

updates = [
    # Monday GP - update title and description
    {"range": "'Weekly Classes'!A5", "values": [[MONDAY_TITLE]]},
    {"range": "'Weekly Classes'!G5", "values": [[MONDAY_DESC]]},
    # Thursday GP - update title and description
    {"range": "'Weekly Classes'!A11", "values": [[THURSDAY_TITLE]]},
    {"range": "'Weekly Classes'!G11", "values": [[THURSDAY_DESC]]},
]

print(f"Updating {len(updates)} cells (values only, formatting preserved)...")
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

print("-" * 50)
print("✓ Done!")
print(f"View: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
