import React, { useState } from 'react';
import type { Class } from '../../types';
import BookButton from './BookButton';
import styles from './ClassCard.module.css';

// Clean up class name for display (remove duration prefix like "30-Minute")
function formatClassName(name: string): string {
  return name.replace(/^\d+-minute\s+/i, '');
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

interface ClassCardProps {
  classData: Class;
  onBook: (classId: string) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ classData, onBook }) => {
  const { id, name, instructor, time, cost, isCancelled, cancellationReason, isSpecialEvent, date, description, duration } = classData;
  const [isExpanded, setIsExpanded] = useState(false);

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

  // Format time - extract hour:minute and period separately
  const timeMatch = time.match(/(\d{1,2}:\d{2})\s*(AM|PM)/i);
  const timeNumber = timeMatch ? timeMatch[1] : time;
  const timePeriod = timeMatch ? timeMatch[2].toLowerCase() : '';

  // Format duration
  const durationText = duration ? `${duration} mins` : '';

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

  // Format display name (remove "30-Minute" prefix)
  const displayName = formatClassName(name);

  if (isCancelled) {
    return (
      <div className={`${styles.classCard} ${styles.cancelled}`}>
        <div className={styles.timeColumn}>
          <span className={styles.time}>{timeNumber}<span className={styles.period}>{timePeriod}</span></span>
          {durationText && <span className={styles.duration}>{durationText}</span>}
        </div>
        <div className={styles.classInfo}>
          <div className={styles.headerRow}>
            <span className={`${styles.className} ${styles.strikethrough}`}>
              {displayName}
            </span>
            <span className={styles.noClassText}>
              NO CLASS TODAY{cancellationReason ? ` - ${cancellationReason}` : ''}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.classCard} ${isSpecialEvent ? styles.specialEvent : ''} ${isSeriesClass ? styles.seriesClass : ''} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.mainRow}>
        <div className={styles.timeColumn}>
          <span className={styles.time}>{timeNumber}<span className={styles.period}>{timePeriod}</span></span>
          {durationText && <span className={styles.duration}>{durationText}</span>}
        </div>
        <div className={styles.classInfo}>
          <div className={styles.headerRow}>
            <span className={styles.className}>
              {isSpecialEvent && <span className={styles.eventBadge}>Event</span>}
              {isSeriesClass && <span className={styles.seriesBadge}>Series</span>}
              {displayName}
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
          {description && (
            <BookButton
              onClick={() => setIsExpanded(!isExpanded)}
              variant="secondary"
            >
              {isExpanded ? 'Less Info' : 'More Info'}
            </BookButton>
          )}
          <BookButton onClick={handleBook}>
            Book
          </BookButton>
        </div>
      </div>
      {isExpanded && description && (
        <div className={styles.accordionContent}>
          <p className={styles.description}>{description}</p>
        </div>
      )}
    </div>
  );
};

export default ClassCard;
