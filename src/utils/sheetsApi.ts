const SPREADSHEET_ID = '1LJj6skGlhjfrQpUh3OZeIi-nBTGBbAhzsNniuF9gsDs';

export interface WeeklyClass {
  id: string;
  title: string;
  day: string;
  time: string;
  duration: number;
  teacher: string;
  cost: string;
  description: string;
  registrationLink: string;
  format: string;
  featuredImage: string;
  teacherImage: string;
  classInfo: string;
}

export interface SpecialEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  break: string;
  teacher: string;
  cost: string;
  description: string;
  registrationLink: string;
  format: string;
  featuredImage: string;
  teacherImage: string;
}

export interface Cancellation {
  date: string;
  className: string;
  reason: string;
}

export interface Announcement {
  id: string;
  text: string;
  startDate: Date;
  endDate: Date;
}

// Combined class type for the calendar display
export interface ScheduledClass {
  id: string;
  name: string;
  instructor: string;
  time: string;
  date: Date;
  endTime?: string;
  duration?: number;
  cost: string;
  description: string;
  registrationLink: string;
  format: string;
  featuredImage: string;
  teacherImage: string;
  classInfo: string;
  isSpecialEvent: boolean;
  isCancelled: boolean;
  cancellationReason?: string;
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate teacher image URL from teacher name (first name only)
function getTeacherImageUrl(teacherName: string): string {
  if (!teacherName) return '';

  // Extract first name (before space or comma)
  const firstName = teacherName.split(/[\s,]/)[0].toLowerCase();

  // Known teachers with photos
  const knownTeachers = ['ben', 'cristina', 'deanna', 'debbie', 'eli', 'giselle', 'joseph', 'teri', 'tom'];

  if (knownTeachers.includes(firstName)) {
    return `/photos/teachers/${firstName}.jpg`;
  }

  return '';
}

function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentCell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
        currentRow = [];
        currentCell = '';
        if (char === '\r') i++;
      } else {
        currentCell += char;
      }
    }
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows;
}

async function fetchSheetAsCSV(sheetName: string): Promise<string[][]> {
  // Use export URL with sheet name
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Failed to fetch ${sheetName}:`, response.status);
    return [];
  }

  const csv = await response.text();
  return parseCSV(csv);
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;

  // Try various date formats
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  return null;
}

function calculateDuration(startTime: string, endTime: string): number | undefined {
  const parseTime = (t: string) => {
    const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) return null;
    let h = parseInt(m[1]);
    const min = parseInt(m[2]);
    const p = m[3].toUpperCase();
    if (p === 'PM' && h !== 12) h += 12;
    if (p === 'AM' && h === 12) h = 0;
    return h * 60 + min;
  };
  const s = parseTime(startTime);
  const e = parseTime(endTime);
  if (s == null || e == null) return undefined;
  const diff = e - s;
  return diff > 0 ? diff : undefined;
}

function calculateEndTime(startTime: string, durationMinutes: number): string {
  // Parse start time (e.g., "6:00 PM")
  const match = startTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return '';

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();

  // Convert to 24-hour
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  // Add duration
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  let endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;

  // Convert back to 12-hour
  const endPeriod = endHours >= 12 ? 'PM' : 'AM';
  if (endHours > 12) endHours -= 12;
  if (endHours === 0) endHours = 12;

  return `${endHours}:${endMinutes.toString().padStart(2, '0')} ${endPeriod}`;
}

export async function fetchSchedule(): Promise<{
  weeklyClasses: WeeklyClass[];
  specialEvents: SpecialEvent[];
  cancellations: Cancellation[];
}> {
  const [weeklyRows, specialRows, cancelRows] = await Promise.all([
    fetchSheetAsCSV('Weekly Classes'),
    fetchSheetAsCSV('Special Events'),
    fetchSheetAsCSV('Cancellations')
  ]);

  // Parse Weekly Classes (skip rows 0-2: instruction, example, header)
  const weeklyClasses: WeeklyClass[] = [];
  for (let i = 3; i < weeklyRows.length; i++) {
    const row = weeklyRows[i];
    if (!row[0] || row[0].toLowerCase().startsWith('example')) continue;

    const teacher = row[4] || '';
    weeklyClasses.push({
      id: `weekly-${i}`,
      title: row[0] || '',
      day: row[1] || '',
      time: row[2] || '',
      duration: parseInt(row[3]) || 60,
      teacher,
      cost: row[5] || '',
      description: row[6] || '',
      registrationLink: row[7] || '',
      format: row[8] || 'In-Person',
      featuredImage: row[9] || '',
      teacherImage: getTeacherImageUrl(teacher),
      classInfo: row[11] || ''
    });
  }

  // Parse Special Events - find header row dynamically, then start after it
  const specialEvents: SpecialEvent[] = [];
  let specialStartIdx = 0;
  for (let i = 0; i < specialRows.length; i++) {
    if (specialRows[i][0]?.toLowerCase().trim() === 'title') {
      specialStartIdx = i + 1;
      break;
    }
  }
  // Fallback: if no header found, skip first row (instruction/example)
  if (specialStartIdx === 0) specialStartIdx = 1;
  for (let i = specialStartIdx; i < specialRows.length; i++) {
    const row = specialRows[i];
    if (!row[0] || row[0].toLowerCase().startsWith('example') || row[0].toLowerCase().startsWith('special event')) continue;

    const eventTeacher = row[5] || '';
    specialEvents.push({
      id: `event-${i}`,
      title: row[0] || '',
      date: row[1] || '',
      startTime: row[2] || '',
      endTime: row[3] || '',
      break: row[4] || '',
      teacher: eventTeacher,
      cost: row[6] || '',
      description: row[7] || '',
      registrationLink: row[8] || '',
      format: row[9] || 'In-Person',
      featuredImage: row[10] || '',
      teacherImage: getTeacherImageUrl(eventTeacher)
    });
  }

  // Parse Cancellations - start from row 1 and filter intelligently
  // Sheet structure: Date (A), Title (B), Reason (C)
  const cancellations: Cancellation[] = [];
  for (let i = 0; i < cancelRows.length; i++) {
    const row = cancelRows[i];
    // Skip empty rows or rows without both date and class name
    if (!row[0] || !row[1]) continue;

    // Skip instruction/header rows
    if (row[0].toLowerCase().includes('cancellation')) continue;
    if (row[0].toLowerCase() === 'date') continue;
    if (row[1].toLowerCase() === 'title') continue;

    // Validate date is parseable (this filters out headers/examples with non-date text)
    const testDate = new Date(row[0]);
    if (isNaN(testDate.getTime())) continue;

    cancellations.push({
      date: row[0],
      className: row[1],
      reason: row[2] || ''
    });
  }

  return { weeklyClasses, specialEvents, cancellations };
}

export async function fetchAllClasses(daysAhead: number = 60, daysBefore: number = 0): Promise<ScheduledClass[]> {
  const { weeklyClasses, specialEvents, cancellations } = await fetchSchedule();
  const classes: ScheduledClass[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Create a map of cancellations for quick lookup by date + class title
  const cancellationMap = new Map<string, Cancellation>();
  cancellations.forEach(c => {
    // Normalize the date - use ISO format for consistent matching
    const cancelDate = parseDate(c.date);
    if (cancelDate) {
      const isoDate = cancelDate.toISOString().split('T')[0]; // YYYY-MM-DD
      const key = `${isoDate}-${c.className}`.toLowerCase();
      cancellationMap.set(key, c);
    }
  });

  // Generate weekly class instances from daysBefore ago through daysAhead
  for (let dayOffset = -daysBefore; dayOffset < daysAhead; dayOffset++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayOffset);
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

    weeklyClasses.forEach((wc) => {
      if (wc.day.toLowerCase() === dayName.toLowerCase()) {
        // Use ISO date for matching (YYYY-MM-DD)
        const isoDate = currentDate.toISOString().split('T')[0];
        // Match by date AND class title
        const cancelKey = `${isoDate}-${wc.title}`.toLowerCase();
        const cancellation = cancellationMap.get(cancelKey);

        classes.push({
          id: `${wc.id}-${currentDate.toISOString().split('T')[0]}`,
          name: wc.title,
          instructor: wc.teacher,
          time: wc.time,
          date: new Date(currentDate),
          endTime: calculateEndTime(wc.time, wc.duration),
          duration: wc.duration,
          cost: wc.cost,
          description: wc.description,
          registrationLink: wc.registrationLink,
          format: wc.format,
          featuredImage: wc.featuredImage,
          teacherImage: wc.teacherImage,
          classInfo: wc.classInfo,
          isSpecialEvent: false,
          isCancelled: !!cancellation,
          cancellationReason: cancellation?.reason
        });
      }
    });
  }

  // Add special events
  specialEvents.forEach(event => {
    const eventDate = parseDate(event.date);
    if (eventDate && eventDate >= today) {
      classes.push({
        id: event.id,
        name: event.title,
        instructor: event.teacher,
        time: event.startTime,
        date: eventDate,
        endTime: event.endTime,
        duration: calculateDuration(event.startTime, event.endTime),
        cost: event.cost,
        description: event.description,
        registrationLink: event.registrationLink,
        format: event.format,
        featuredImage: event.featuredImage,
        teacherImage: event.teacherImage,
        classInfo: '',
        isSpecialEvent: true,
        isCancelled: false
      });
    }
  });

  // Sort by date and time
  classes.sort((a, b) => {
    const dateCompare = a.date.getTime() - b.date.getTime();
    if (dateCompare !== 0) return dateCompare;

    // Sort by time within the same day
    const timeA = new Date(`2000-01-01 ${a.time}`);
    const timeB = new Date(`2000-01-01 ${b.time}`);
    return timeA.getTime() - timeB.getTime();
  });

  return classes;
}

// Legacy function for compatibility
export async function fetchClasses(): Promise<ScheduledClass[]> {
  return fetchAllClasses();
}

function createSlugWithDay(name: string, date: Date): string {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  return `${name}-${dayName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function fetchClassBySlug(slug: string): Promise<ScheduledClass | null> {
  const classes = await fetchAllClasses();
  // First try to match with day included in slug (new format)
  const matchWithDay = classes.find(c => createSlugWithDay(c.name, c.date) === slug);
  if (matchWithDay) return matchWithDay;

  // Fall back to matching just by name (legacy format)
  return classes.find(c => createSlug(c.name) === slug) || null;
}

// Fetch only upcoming special events (not regular weekly classes)
export async function fetchUpcomingEvents(): Promise<ScheduledClass[]> {
  const { specialEvents } = await fetchSchedule();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents: ScheduledClass[] = [];

  specialEvents.forEach(event => {
    const eventDate = parseDate(event.date);
    if (eventDate && eventDate >= today) {
      upcomingEvents.push({
        id: event.id,
        name: event.title,
        instructor: event.teacher,
        time: event.startTime,
        date: eventDate,
        endTime: event.endTime,
        cost: event.cost,
        description: event.description,
        registrationLink: event.registrationLink,
        format: event.format,
        featuredImage: event.featuredImage,
        teacherImage: event.teacherImage,
        classInfo: '',
        isSpecialEvent: true,
        isCancelled: false
      });
    }
  });

  // Sort by date
  upcomingEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

  return upcomingEvents;
}

// Fetch active announcements from the Announcements sheet
export async function fetchAnnouncements(): Promise<Announcement[]> {
  const rows = await fetchSheetAsCSV('Announcements');
  const announcements: Announcement[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Skip header row (row 0), start from row 1
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    // Skip empty rows or rows without announcement text
    if (!row[0] || !row[0].trim()) continue;

    const text = row[0].trim();
    const startDate = parseDate(row[1]);
    const endDate = parseDate(row[2]);

    // Skip if dates are invalid
    if (!startDate || !endDate) continue;

    // Set end date to end of day for inclusive comparison
    endDate.setHours(23, 59, 59, 999);

    // Only include announcements that are currently active
    if (today >= startDate && today <= endDate) {
      announcements.push({
        id: `announcement-${i}`,
        text,
        startDate,
        endDate
      });
    }
  }

  return announcements;
}
