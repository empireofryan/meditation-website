#!/usr/bin/env python3
"""
Update specific cells in Google Sheet WITHOUT touching formatting.
"""
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

credentials, project = default(scopes=['https://www.googleapis.com/auth/spreadsheets'])
credentials.refresh(Request())
service = build('sheets', 'v4', credentials=credentials)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# ============================================================
# DESCRIPTIONS WITH SERIES TOPICS
# ============================================================

# Monday General Program - Row 5
MONDAY_GP_DESC = """Meditation is about much more than just achieving temporary relaxation or calm. When applied correctly, meditation enables us to let go of old angers and hurts, find freedom from anxiety, and cultivate a positive and meaningful view of ourselves and our lives. It can help heal broken relationships and ultimately support us in actualizing our highest potential. These life-changing results depend on applying meditation correctly. In this series, we will explore the Preparatory Practices — a traditional sequence of mental exercises designed to help us maximize the power of meditation. These practices focus on creating the right motivations and developing special ways of thinking that add strong positive energy to our meditation. In doing so, we create an internal environment that allows our meditation to go deeper and become more effective in bringing about real change.

Series Topics:
• January 5: The Deeper Purpose of Meditation
• January 12: The Transformative Power of Blessings
• January 19: Igniting Your Potential Blessings
• January 26: Creating Inner Power
• February 2: Creating Joy
• February 9: Purification – The Freedom to Let Go
• February 16: Conversing with the Buddhas
• February 23: NO CLASS
• March 2: How to Deeply Enjoy Meditation"""

# Patient Acceptance (Thursday) - Row 11
PATIENT_ACCEPTANCE_DESC = """So often in our interactions with others we find ourselves experiencing feelings of hurt, rejection, and not being heard that can lead to developing anger and rage towards others. Buddha gave exceedingly practical teachings on patient acceptance – by applying these practical methods as well as Buddha's extraordinary insight into 'no self' we free ourselves from taking things so personally.

Series Topics:
• Jan 8: Why Anger Doesn't Work
• Jan 15: The Wisdom of Patient Acceptance
• Jan 22: Who is the Me who takes Things Personally?
• Jan 29: The Joy of No Self
• Feb 5: Patient Acceptance Through Understanding Karma
• Feb 12: The Wisdom Path to Liberation
• Feb 19: Wisdom, Love and Compassion
• Feb 26: The Wisdom Dance of Patient Acceptance
• Mar 5: Saying Yes to Life and Enlightenment"""

# Sunday Practical Advice - Row 12
SUNDAY_DESC = """This series explores teachings from Atisha, the Indian Buddhist master who founded the Kadampa tradition. The program focuses on "Advice from Atisha's Heart," presented as practical guidance for cultivating inner peace, compassion, and wisdom. Each week examines specific instructions designed to transform daily challenges into spiritual growth opportunities."""

# Tuesday Introduction to Buddhism - Row 7
TUESDAY_DESC = """Curious about Buddhism? This weekly class presents basic teachings from Geshe Kelsang Gyatso's book How To Transform Your Life that you can use to enhance work, relationships, inner peace, and daily enjoyment. Each session includes meditation, teaching, and discussion."""

# ============================================================
# CELL UPDATES
# ============================================================

updates = [
    {"range": "'Weekly Classes'!G5", "values": [[MONDAY_GP_DESC]]},
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
