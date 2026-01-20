import React from 'react';
import { Link } from 'react-router-dom';
import type { Class } from '../../types';
import BookButton from './BookButton';
import styles from './ClassCard.module.css';

function createSlug(name: string, date: Date): string {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  return `${name}-${dayName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get teacher photo URLs for all teachers (handles multiple comma-separated names)
function getTeacherPhotos(instructorName: string): string[] {
  if (!instructorName) return [];

  const knownTeachers = ['ben', 'cristina', 'deanna', 'debbie', 'joseph', 'teri', 'tom'];
  const photos: string[] = [];

  // Split by comma and get first name of each teacher
  const teachers = instructorName.split(',').map(name => name.trim().split(' ')[0].toLowerCase());

  for (const firstName of teachers) {
    if (knownTeachers.includes(firstName)) {
      photos.push(`/photos/teachers/${firstName}.jpg`);
    }
  }

  return photos;
}

function saveScrollPosition() {
  sessionStorage.setItem('scheduleScrollPosition', window.scrollY.toString());
}

interface ClassCardProps {
  classData: Class;
  onBook: (classId: string) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ classData, onBook }) => {
  const { id, name, instructor, time, endTime, cost, isCancelled, cancellationReason, isSpecialEvent, date } = classData;

  const handleBook = () => {
    onBook(id);
  };

  // Check if this is a series class
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const isSeriesClass =
    name.toLowerCase().includes('foundation program') ||
    (name.toLowerCase().includes('general program') && dayOfWeek === 'Monday') ||
    (name.toLowerCase().includes('patient acceptance') && dayOfWeek === 'Thursday') ||
    dayOfWeek === 'Sunday';

  // Format time range (e.g., "6:00 PM - 6:30 PM")
  const timeRange = endTime ? `${time} - ${endTime}` : time;

  // Format cost - special case for monthly membership
  const displayCost = cost === '$85/month'
    ? 'Monthly Membership Required'
    : cost;

  // Format instructor - just first names (handles comma-separated multiple teachers)
  const displayInstructor = instructor
    ? instructor.split(',').map(name => name.trim().split(' ')[0]).join(', ')
    : instructor;

  // Get teacher photos (supports multiple teachers)
  const teacherPhotos = getTeacherPhotos(instructor);

  if (isCancelled) {
    return (
      <div className={`${styles.classCard} ${styles.cancelled}`}>
        <div className={styles.timeColumn}>
          <span className={styles.time}>{timeRange}</span>
        </div>
        <div className={styles.classInfo}>
          <div className={styles.headerRow}>
            <span className={`${styles.className} ${styles.strikethrough}`}>
              {name}
            </span>
            <span className={styles.noClassBadge}>
              NO CLASS{cancellationReason ? ` - ${cancellationReason}` : ''}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.classCard} ${isSpecialEvent ? styles.specialEvent : ''} ${isSeriesClass ? styles.seriesClass : ''}`}>
      <div className={styles.timeColumn}>
        <span className={styles.time}>{timeRange}</span>
      </div>
      <div className={styles.classInfo}>
        <div className={styles.headerRow}>
          <span className={styles.className}>
            {isSpecialEvent && <span className={styles.eventBadge}>Event</span>}
            {isSeriesClass && <span className={styles.seriesBadge}>Series</span>}
            {name}
          </span>
          <span className={styles.instructorName}>
            {teacherPhotos.length > 0 && (
              <span className={styles.photoStack}>
                {teacherPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt=""
                    className={styles.teacherPhoto}
                    style={{ zIndex: teacherPhotos.length - index }}
                  />
                ))}
              </span>
            )}
            {displayInstructor}
          </span>
          {displayCost && <span className={styles.cost}>{displayCost}</span>}
        </div>
      </div>
      <div className={styles.bookSection}>
        <Link to={`/classes/${createSlug(name, date)}`} style={{ textDecoration: 'none' }} onClick={saveScrollPosition}>
          <BookButton
            onClick={() => {}}
            variant="secondary"
          >
            More Info
          </BookButton>
        </Link>
        <BookButton onClick={handleBook}>
          Book
        </BookButton>
      </div>
    </div>
  );
};

export default ClassCard;
