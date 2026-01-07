#!/usr/bin/env python3
"""
Update specific cells in Google Sheet WITHOUT touching formatting.
Uses values().update() which only modifies cell values.

IMPORTANT: This script ONLY updates individual cells. It does NOT clear
or replace entire ranges. Formatting is preserved.
"""
from google.auth import default
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

credentials, project = default(scopes=['https://www.googleapis.com/auth/spreadsheets'])
credentials.refresh(Request())
service = build('sheets', 'v4', credentials=credentials)

SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs'

# ============================================================
# DESCRIPTIONS FROM meditationinwilliamsburg.org (Jan 2026)
# ============================================================

# Monday General Program - Row 5
MONDAY_GP_DESC = """The program explores how meditation extends far beyond temporary relaxation. When properly applied, it enables practitioners to release old emotional wounds, overcome anxiety, and develop a constructive self-perception. The series focuses on Preparatory Practices—traditional mental exercises designed to enhance meditation's effectiveness by establishing appropriate intentions and cultivating beneficial mental patterns that deepen practice and facilitate genuine transformation."""

# Tuesday Introduction to Buddhism - Row 7
TUESDAY_DESC = """Curious about Buddhism? This weekly class presents basic teachings from Geshe Kelsang Gyatso's book How To Transform Your Life that you can use to enhance work, relationships, inner peace, and daily enjoyment. Each session includes meditation, teaching, and discussion."""

# Patient Acceptance (Thursday) - Row 11
PATIENT_ACCEPTANCE_DESC = """So often in our interactions with others we find ourselves experiencing feelings of hurt, rejection, and not being heard that can lead to developing anger and rage towards others. Buddha gave exceedingly practical teachings on patient acceptance – by applying these practical methods as well as Buddha's extraordinary insight into 'no self' we free ourselves from taking things so personally."""

# Sunday Practical Advice - Row 12
SUNDAY_DESC = """This series explores teachings from Atisha, the Indian Buddhist master who founded the Kadampa tradition. The program focuses on "Advice from Atisha's Heart," presented as practical guidance for cultivating inner peace, compassion, and wisdom. Each week examines specific instructions designed to transform daily challenges into spiritual growth opportunities."""

# ============================================================
# CELL UPDATES - Only values, formatting preserved
# ============================================================

updates = []

# Row 5 - Monday General Program - Description (Column G)
updates.append({
    'range': "'Weekly Classes'!G5",
    'values': [[MONDAY_GP_DESC]]
})

# Row 7 - Tuesday Introduction to Buddhism - Description (Column G)
updates.append({
    'range': "'Weekly Classes'!G7",
    'values': [[TUESDAY_DESC]]
})

# Row 11 - Patient Acceptance - Description (Column G)
updates.append({
    'range': "'Weekly Classes'!G11",
    'values': [[PATIENT_ACCEPTANCE_DESC]]
})

# Row 11 - Patient Acceptance - Format (Column I) - In-Person + Streaming
updates.append({
    'range': "'Weekly Classes'!I11",
    'values': [["In-Person + Streaming"]]
})

# Row 12 - Sunday Practical Advice - Description (Column G)
updates.append({
    'range': "'Weekly Classes'!G12",
    'values': [[SUNDAY_DESC]]
})

# ============================================================
# TEACHER IMAGES
# ============================================================

# Row 4 - Monday 30-min (Deanna)
updates.append({
    'range': "'Weekly Classes'!K4",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2023/12/Deana_Teachers-Fotos-42262-EYES-OPEN-scaled.jpg"]]
})

# Row 5 - Monday GP (Teri)
updates.append({
    'range': "'Weekly Classes'!K5",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2023/12/Teri_Teachers-Portraits-4_5A1999-EYES-OPEN-scaled.jpg"]]
})

# Row 7 - Tuesday Intro (group)
updates.append({
    'range': "'Weekly Classes'!K7",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2024/11/tuesday-general-program-teachers-wb-600x395.jpg"]]
})

# Row 8 - Wednesday 30-min (Ben)
updates.append({
    'range': "'Weekly Classes'!K8",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2022/03/Ben_-Teachers-Fotos-42278-scaled.jpg"]]
})

# Row 9 - Foundation Program (Joseph)
updates.append({
    'range': "'Weekly Classes'!K9",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2023/12/Joseph_Teachers-Fotos-42101-EYES-OPEN-scaled.jpg"]]
})

# Row 10 - Thursday 30-min (Debbie)
updates.append({
    'range': "'Weekly Classes'!K10",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2023/12/Debby_Teachers-Fotos-42322-EYES-OPEN-BIG-SMILE-scaled.jpg"]]
})

# Row 11 - Patient Acceptance (Joseph)
updates.append({
    'range': "'Weekly Classes'!K11",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2025/03/Joseph-600x400.jpg"]]
})

# Row 12 - Sunday (Joseph)
updates.append({
    'range': "'Weekly Classes'!K12",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2023/12/Joseph_Teachers-Fotos-42101-EYES-OPEN-600x400.jpg"]]
})

# ============================================================
# SPECIAL EVENTS - Teacher Images
# ============================================================

# Row 4 - 3 Go-to Meditations (Tom)
updates.append({
    'range': "'Special Events'!L4",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2024/10/tom-lauricella-kmc-kadampa-meditation-teacher-nyc-600x416-1.jpeg"]]
})

# Row 5 - Fundamentals (Tom)
updates.append({
    'range': "'Special Events'!L5",
    'values': [["https://meditationinwilliamsburg.org/wp-content/uploads/2024/10/tom-lauricella-kmc-kadampa-meditation-teacher-nyc-600x416-1.jpeg"]]
})

# ============================================================
# EXECUTE UPDATES
# ============================================================

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
print("✓ Done! Formatting preserved.")
print(f"View: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit")
