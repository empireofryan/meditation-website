import React, { useState, useMemo, useCallback } from 'react';
import type { Class } from '../../types';
import { generateDateRange } from '../../utils/dateUtils';
import { mockClasses } from '../../data/mockData';
import DateSelector from './DateSelector';
import ClassCard from './ClassCard';
import styles from './ClassSchedule.module.css';

const ClassSchedule: React.FC = () => {
  // Start from December 30, 2025 to match the calendar data
  const startDate = useMemo(() => {
    const start = new Date(2025, 11, 30); // December 30, 2025
    start.setHours(0, 0, 0, 0);
    return start;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(startDate);
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [dateCount, setDateCount] = useState(32); // 32 days from Dec 30 to Jan 30

  // Generate date range dynamically based on dateCount
  const dates = useMemo(() => {
    return generateDateRange(startDate, dateCount);
  }, [startDate, dateCount]);

  // Load more dates when user scrolls near the end
  const loadMoreDates = useCallback(() => {
    setDateCount(prev => prev + 14);
  }, []);

  // Group classes by date
  const groupedClasses = useMemo(() => {
    const groups = new Map<string, Class[]>();

    classes.forEach((classItem) => {
      const dateKey = classItem.date.toDateString();
      if (!groups.has(dateKey)) {
        groups.set(dateKey, []);
      }
      groups.get(dateKey)!.push(classItem);
    });

    // Sort classes within each date by time
    groups.forEach((classList) => {
      classList.sort((a, b) => {
        const timeA = new Date(`2000-01-01 ${a.time}`);
        const timeB = new Date(`2000-01-01 ${b.time}`);
        return timeA.getTime() - timeB.getTime();
      });
    });

    return groups;
  }, [classes]);

  // Get sorted dates that have classes
  const datesWithClasses = useMemo(() => {
    return Array.from(groupedClasses.keys())
      .map(dateKey => new Date(dateKey))
      .sort((a, b) => a.getTime() - b.getTime());
  }, [groupedClasses]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);

    // Scroll to the selected date's section within the calendar container
    setTimeout(() => {
      const dateKey = date.toDateString();
      const element = document.getElementById(`date-section-${dateKey}`);
      const container = document.querySelector(`.${styles.classList}`);

      if (element && container) {
        const containerTop = container.getBoundingClientRect().top;
        const elementTop = element.getBoundingClientRect().top;
        const scrollOffset = elementTop - containerTop + container.scrollTop;

        container.scrollTo({ top: scrollOffset, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBookClass = (classId: string) => {
    const classToBook = classes.find((c) => c.id === classId);
    if (classToBook) {
      // Update the class to reduce available spots
      setClasses((prevClasses) =>
        prevClasses.map((c) =>
          c.id === classId
            ? { ...c, spotsAvailable: Math.max(0, c.spotsAvailable - 1) }
            : c
        )
      );

      // Show confirmation (you could use a toast notification here)
      alert(
        `Successfully booked ${classToBook.name} at ${classToBook.time} with ${classToBook.instructor}!`
      );
    }
  };

  const formatSelectedDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateSectionHeader = (date: Date): string => {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return `${weekday} ${day} ${month}`;
  };

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Class Schedule</h1>
        <p className={styles.subtitle}>{formatSelectedDate(selectedDate)}</p>
      </div>

      <DateSelector
        dates={dates}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
        onLoadMore={loadMoreDates}
      />

      <div className={styles.classList}>
        {datesWithClasses.length > 0 ? (
          datesWithClasses.map((date) => {
            const dateKey = date.toDateString();
            const dateClasses = groupedClasses.get(dateKey) || [];

            return (
              <div key={dateKey} id={`date-section-${dateKey}`} className={styles.dateSection}>
                <div className={styles.dateSectionHeader}>
                  {formatDateSectionHeader(date)}
                </div>
                <div className={styles.dateClassList}>
                  {dateClasses.map((classItem) => (
                    <ClassCard
                      key={classItem.id}
                      classData={classItem}
                      onBook={handleBookClass}
                    />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <svg
              className={styles.emptyIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className={styles.emptyTitle}>No Classes Available</h3>
            <p className={styles.emptyMessage}>
              There are no classes scheduled.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassSchedule;
