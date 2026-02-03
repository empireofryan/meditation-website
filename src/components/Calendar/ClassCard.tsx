import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

  const knownTeachers = ['ben', 'cristina', 'deanna', 'debbie', 'eli', 'giselle', 'joseph', 'teri', 'tom'];
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
  const { id, name, instructor, time, cost, isCancelled, cancellationReason, isSpecialEvent, date, description, duration, registrationLink } = classData;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBook = () => {
    onBook(id);
  };

  // Check if this is a members-only class
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const isMembersOnly =
    name.toLowerCase().includes('foundation program') ||
    cost === '$85/month';

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

  // Check if there's a valid booking link (URL, not email)
  const hasBookingLink = registrationLink && registrationLink.startsWith('http');

  // Get teacher photos (supports multiple teachers)
  const teacherPhotos = getTeacherPhotos(instructor);

  // Format display name (remove "30-Minute" prefix)
  const displayName = formatClassName(name);

  if (isCancelled) {
    return (
      <div className={`${styles.classCard} ${styles.cancelled}`}>
        <div className={styles.mainRow}>
          <div className={styles.timeColumn}>
            <span className={`${styles.time} ${styles.cancelledTime}`}>{timeNumber}<span className={styles.period}>{timePeriod}</span></span>
            {durationText && <span className={`${styles.duration} ${styles.cancelledTime}`}>{durationText}</span>}
          </div>
          <div className={styles.classInfo}>
            <span className={`${styles.className} ${styles.strikethrough}`}>
              {displayName}
            </span>
          </div>
          <span className={`${styles.instructorName} ${styles.cancelledInstructor}`}>
            {teacherPhotos.length > 0 && (
              <span className={styles.photoStack}>
                {teacherPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt=""
                    className={`${styles.teacherPhoto} ${styles.cancelledPhoto}`}
                    style={{ zIndex: teacherPhotos.length - index }}
                  />
                ))}
              </span>
            )}
            {displayInstructor}
          </span>
          <span></span>
          <div className={styles.bookSection}>
            <span className={styles.cancelledBadge}>CLASS CANCELLED</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.classCard} ${isSpecialEvent ? styles.specialEvent : ''} ${isMembersOnly ? styles.membersClass : ''} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.mainRow}>
        <div className={styles.timeColumn}>
          <span className={styles.time}>{timeNumber}<span className={styles.period}>{timePeriod}</span></span>
          {durationText && <span className={styles.duration}>{durationText}</span>}
        </div>
        <div className={styles.classInfo}>
          <span className={styles.className}>
            {isSpecialEvent && <span className={styles.eventBadge}>Event</span>}
            {isMembersOnly && <span className={styles.membersBadge}>Members</span>}
            {displayName}
          </span>
        </div>
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
        {isMembersOnly ? (
          <Link to="/membership" className={styles.membershipLink}>Membership Required</Link>
        ) : (
          <span className={styles.cost}>{displayCost || ''}</span>
        )}
        <div className={styles.bookSection}>
          {description && (
            <BookButton
              onClick={() => setIsExpanded(!isExpanded)}
              variant="secondary"
            >
              {isExpanded ? 'Less Info' : 'More Info'}
            </BookButton>
          )}
          <BookButton onClick={handleBook} disabled={!hasBookingLink}>
            Book
          </BookButton>
        </div>
      </div>
      {description && (
        <div className={`${styles.accordionContent} ${isExpanded ? styles.accordionContentExpanded : ''}`}>
          <p className={styles.description}>{description}</p>
        </div>
      )}
    </div>
  );
};

export default ClassCard;
