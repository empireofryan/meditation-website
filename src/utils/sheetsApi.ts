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
  const knownTeachers = ['ben', 'cristina', 'deanna', 'debbie', 'joseph', 'teri', 'tom'];

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
      teacherImage: getTeacherImageUrl(teacher)
    });
  }

  // Parse Special Events (skip rows 0-2)
  const specialEvents: SpecialEvent[] = [];
  for (let i = 3; i < specialRows.length; i++) {
    const row = specialRows[i];
    if (!row[0] || row[0].toLowerCase().startsWith('example')) continue;

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

  // Parse Cancellations (skip rows 0-2)
  const cancellations: Cancellation[] = [];
  for (let i = 3; i < cancelRows.length; i++) {
    const row = cancelRows[i];
    if (!row[0] || row[0].toLowerCase().startsWith('example')) continue;

    cancellations.push({
      date: row[0] || '',
      day: row[1] || '',
      className: row[2] || '',
      reason: row[3] || ''
    });
  }

  return { weeklyClasses, specialEvents, cancellations };
}

export async function fetchAllClasses(daysAhead: number = 60): Promise<ScheduledClass[]> {
  const { weeklyClasses, specialEvents, cancellations } = await fetchSchedule();
  const classes: ScheduledClass[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Create a map of cancellations for quick lookup
  const cancellationMap = new Map<string, Cancellation>();
  cancellations.forEach(c => {
    const key = `${c.date}-${c.day}`.toLowerCase();
    cancellationMap.set(key, c);
  });

  // Generate weekly class instances for the next N days
  for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayOffset);
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

    weeklyClasses.forEach((wc) => {
      if (wc.day.toLowerCase() === dayName.toLowerCase()) {
        const dateStr = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const cancelKey = `${dateStr}-${dayName}`.toLowerCase();
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
        cost: event.cost,
        description: event.description,
        registrationLink: event.registrationLink,
        format: event.format,
        featuredImage: event.featuredImage,
        teacherImage: event.teacherImage,
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
        isSpecialEvent: true,
        isCancelled: false
      });
    }
  });

  // Sort by date
  upcomingEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

  return upcomingEvents;
}
