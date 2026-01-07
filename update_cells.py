#!/usr/bin/env python3
"""
Update specific cells in Google Sheet WITHOUT touching formatting.
Uses values().update() which only modifies cell values.
"""
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

credentials, project = default(scopes=['https://www.googleapis.com/auth/spreadsheets'])
credentials.refresh(Request())
service = build('sheets', 'v4', credentials=credentials)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# Cell updates - only updating values, not formatting
# Based on scraped data from meditationinwilliamsburg.org

updates = []

# ============ WEEKLY CLASSES TAB ============

# Patient Acceptance - Row 11 (Thursday 7pm class)
# Update Description (Column G)
updates.append({
    'range': "'Weekly Classes'!G11",
    'values': [["This series explores how Buddhist teachings on patient acceptance help us free ourselves from taking things so personally. Through studying anger's ineffectiveness, the wisdom of acceptance, and the concept of no self, participants learn to transform problems and conflicts into opportunities for great spiritual growth."]]
})

# Update Format to "In-Person + Streaming" (Column I based on screenshot showing Form column)
updates.append({
    'range': "'Weekly Classes'!I11",
    'values': [["In-Person + Streaming"]]
})

# Update Teacher Image URL (Column K - last column for teacher image)
updates.append({
    'range': "'Weekly Classes'!K11",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2025/03/Joseph-600x400.jpg"]]
})

# ============ Add Teacher Images for other rows ============

# Row 4 - Monday 30-min meditation (Deanna)
updates.append({
    'range': "'Weekly Classes'!K4",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2023/12/Deana_Teachers-Fotos-42262-EYES-OPEN-scaled.jpg"]]
})

# Row 5 - Monday General Program (Teri)
updates.append({
    'range': "'Weekly Classes'!K5",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2023/12/Teri_Teachers-Portraits-4_5A1999-EYES-OPEN-scaled.jpg"]]
})

# Row 7 - Tuesday Introduction to Buddhism (group photo)
updates.append({
    'range': "'Weekly Classes'!K7",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2024/11/tuesday-general-program-teachers-wb-600x395.jpg"]]
})

# Row 8 - Wednesday 30-min (Ben)
updates.append({
    'range': "'Weekly Classes'!K8",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2022/03/Ben_-Teachers-Fotos-42278-scaled.jpg"]]
})

# Row 9 - Foundation Program (Joseph Giacona)
updates.append({
    'range': "'Weekly Classes'!K9",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2023/12/Joseph_Teachers-Fotos-42101-EYES-OPEN-scaled.jpg"]]
})

# Row 10 - Thursday 30-min (Debbie)
updates.append({
    'range': "'Weekly Classes'!K10",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2023/12/Debby_Teachers-Fotos-42322-EYES-OPEN-BIG-SMILE-scaled.jpg"]]
})

# Row 12 - Sunday Practical Advice (Joseph Giacona)
updates.append({
    'range': "'Weekly Classes'!K12",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2023/12/Joseph_Teachers-Fotos-42101-EYES-OPEN-600x400.jpg"]]
})

# ============ SPECIAL EVENTS TAB ============

# Row 4 - 3 Go-to Meditations (Tom Lauricella) - Teacher Image
updates.append({
    'range': "'Special Events'!L4",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2024/10/tom-lauricella-kmc-kadampa-meditation-teacher-nyc-600x416-1.jpeg"]]
})

# Row 5 - Fundamentals of Meditation (Tom Lauricella) - Teacher Image
updates.append({
    'range': "'Special Events'!L5",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2024/10/tom-lauricella-kmc-kadampa-meditation-teacher-nyc-600x416-1.jpeg"]]
})

# Execute all updates
print(f"Updating {len(updates)} cells...")

for update in updates:
    try:
        service.spreadsheets().values().update(
            spreadsheetId=SPREADSHEET_ID,
            range=update['range'],
            valueInputOption='RAW',
            body={'values': update['values']}
        ).execute()
        print(f"  ✓ Updated {update['range']}")
    except Exception as e:
        print(f"  ✗ Error updating {update['range']}: {e}")

print("\n✓ Done! Formatting preserved.")
print(f"View: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
