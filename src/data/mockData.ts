import type { Class } from '../types';

// Real class data based on meditationinwilliamsburg.org calendar
export const generateRealClasses = (startDate: Date, days: number): Class[] => {
  const classes: Class[] = [];
  let id = 1;

  for (let dayOffset = 0; dayOffset < days; dayOffset++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayOffset);
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Monday classes
    if (dayOfWeek === 1) {
      classes.push({
        id: id.toString(),
        name: '30-Minute After-Work Meditation with Deanna',
        instructor: 'Deanna',
        time: '6:00 PM',
        date: new Date(currentDate),
        spotsAvailable: Math.floor(Math.random() * 10) + 10,
        totalSpots: 20,
      });
      id++;

      classes.push({
        id: id.toString(),
        name: 'Monday General Program: The Confidence to Change',
        instructor: 'Gen Kelsang Demo',
        time: '7:00 PM',
        date: new Date(currentDate),
        spotsAvailable: Math.floor(Math.random() * 12) + 8,
        totalSpots: 20,
      });
      id++;
    }

    // Tuesday classes
    if (dayOfWeek === 2) {
      classes.push({
        id: id.toString(),
        name: '30-Minute After-Work Meditation',
        instructor: 'Kadam Sarah',
        time: '6:00 PM',
        date: new Date(currentDate),
        spotsAvailable: Math.floor(Math.random() * 10) + 10,
        totalSpots: 20,
      });
      id++;

      classes.push({
        id: id.toString(),
        name: 'Tuesday General Program: Introduction to Buddhism',
        instructor: 'Gen Kelsang Demo',
        time: '7:00 PM',
        date: new Date(currentDate),
        spotsAvailable: Math.floor(Math.random() * 12) + 8,
        totalSpots: 20,
      });
      id++;
    }

    // Wednesday classes
    if (dayOfWeek === 3) {
      classes.push({
        id: id.toString(),
        name: '30-Minute After-Work Meditation with Ben',
        instructor: 'Ben',
        time: '6:00 PM',
        date: new Date(currentDate),
        spotsAvailable: Math.floor(Math.random() * 10) + 10,
        totalSpots: 20,
      });
      id++;

      classes.push({
        id: id.toString(),
        name: 'Foundation Program',
        instructor: 'Kadam Morten',
        time: '6:45 PM',
        date: new Date(currentDate),
        spotsAvailable: Math.floor(Math.random() * 8) + 7,
        totalSpots: 15,
      });
      id++;
    }

    // Thursday classes
    if (dayOfWeek === 4) {
      classes.push({
        id: id.toString(),
        name: '30-Minute After-Work Meditation with Debbie',
        instructor: 'Debbie',
        time: '6:00 PM',
        date: new Date(currentDate),
        spotsAvailable: Math.floor(Math.random() * 10) + 10,
        totalSpots: 20,
      });
      id++;

      const thursdayTopics = [
        'How Love Solves Your Problems',
        'Patient Acceptance: Beyond Taking Things Personally',
      ];
      const randomTopic = thursdayTopics[Math.floor(Math.random() * thursdayTopics.length)];

      classes.push({
        id: id.toString(),
        name: randomTopic,
        instructor: 'Gen Jampa',
        time: '7:00 PM',
        date: new Date(currentDate),
        spotsAvailable: Math.floor(Math.random() * 12) + 8,
        totalSpots: 20,
      });
      id++;
    }

    // Saturday classes
    if (dayOfWeek === 6) {
      const saturdayClasses = [
        'Transformative Power of Love',
        '3 Go-to Meditations for a Peaceful Mind',
        'Fundamentals of Meditation',
        'Slow It Down: A Holiday Season Meditation',
      ];
      const randomSatClass = saturdayClasses[Math.floor(Math.random() * saturdayClasses.length)];

      classes.push({
        id: id.toString(),
        name: randomSatClass,
        instructor: 'Kadam Lucy',
        time: '11:00 AM',
        date: new Date(currentDate),
        spotsAvailable: Math.floor(Math.random() * 15) + 10,
        totalSpots: 25,
      });
      id++;
    }

    // Sunday classes
    if (dayOfWeek === 0) {
      const sundayClasses = [
        'Practical Advice for a Happy Life',
        'Developing Authentic Confidence',
      ];
      const randomSunClass = sundayClasses[Math.floor(Math.random() * sundayClasses.length)];

      classes.push({
        id: id.toString(),
        name: randomSunClass,
        instructor: 'Gen Kelsang Demo',
        time: '11:00 AM',
        date: new Date(currentDate),
        spotsAvailable: Math.floor(Math.random() * 15) + 10,
        totalSpots: 25,
      });
      id++;
    }
  }

  // Add special New Year's Eve event if the date range includes Dec 31
  const dec31 = new Date(2025, 11, 31); // December 31, 2025
  if (startDate <= dec31 && new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000) >= dec31) {
    classes.push({
      id: id.toString(),
      name: 'New Years Eve Meditation & Celebration',
      instructor: 'Gen Kelsang Demo',
      time: '7:00 PM',
      date: dec31,
      spotsAvailable: 15,
      totalSpots: 30,
    });
    id++;
  }

  return classes;
};

// Generate classes from December 30, 2025 to January 30, 2026
const startDate = new Date(2025, 11, 30); // December 30, 2025
startDate.setHours(0, 0, 0, 0);

export const mockClasses = generateRealClasses(startDate, 32); // 32 days from Dec 30 to Jan 30
