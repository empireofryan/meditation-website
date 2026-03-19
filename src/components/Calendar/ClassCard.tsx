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

// Format description: preserve line breaks for series topics
function formatDescription(desc: string): React.ReactNode {
  if (!desc) return null;
  // Split on newlines and render with line breaks
  const lines = desc.split('\n');
  if (lines.length <= 1) return desc;
  return lines.map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </React.Fragment>
  ));
}

interface ClassCardProps {
  classData: Class;
  onBook: (classId: string) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ classData, onBook }) => {
  const { id, name, instructor, time, cost, isCancelled, isSpecialEvent, description, duration, registrationLink } = classData;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBook = () => {
    onBook(id);
  };

  // Check if this is a members-only class
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

  const handleRowClick = (e: React.MouseEvent) => {
    if (!description) return;
    // Don't toggle if clicking a link or button (book button, membership link)
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button:not(.' + styles.caretToggle + ')')) return;
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.classCard} ${isSpecialEvent ? styles.specialEvent : ''} ${isMembersOnly ? styles.membersClass : ''} ${isExpanded ? styles.expanded : ''}`}>
      <div className={`${styles.mainRow} ${description ? styles.clickableRow : ''}`} onClick={handleRowClick}>
        <div className={styles.timeColumn}>
          <span className={styles.time}>{timeNumber}<span className={styles.period}>{timePeriod}</span></span>
          {durationText && <span className={styles.duration}>{durationText}</span>}
          {!isMembersOnly && displayCost && <span className={styles.costMobile}>{displayCost}</span>}
        </div>
        <div className={styles.classInfo}>
          <span className={styles.className}>
            {isSpecialEvent && <span className={styles.eventBadge}>Event</span>}
            {displayName}
            {description && (
              <span
                className={`${styles.caretToggle} ${isExpanded ? styles.caretOpen : ''}`}
                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
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
          <span></span>
        ) : (
          <span className={styles.cost}>{displayCost || ''}</span>
        )}
        <div className={styles.bookSection}>
          {isMembersOnly ? (
            <Link to="/membership" className={styles.membershipLink}>Membership Required</Link>
          ) : hasBookingLink ? (
            <BookButton onClick={handleBook}>
              Book
            </BookButton>
          ) : (
            <span className={styles.dropInLabel}>Drop Ins Welcome</span>
          )}
        </div>
      </div>
      {description && (
        <div className={`${styles.accordionContent} ${isExpanded ? styles.accordionContentExpanded : ''}`}>
          <div className={styles.accordionContentInner}>
            <p className={styles.description}>{formatDescription(description)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCard;
