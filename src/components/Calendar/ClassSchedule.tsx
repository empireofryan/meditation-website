import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { Class } from '../../types';
import { generateDateRange } from '../../utils/dateUtils';
import { fetchAllClasses } from '../../utils/sheetsApi';
import DateSelector from './DateSelector';
import ClassCard from './ClassCard';
import styles from './ClassSchedule.module.css';

type ViewMode = 'schedule' | 'calendar';

// Helper to get short class name
const getShortClassName = (name: string): string => {
  // Abbreviate common class names
  if (name.toLowerCase().includes('30-minute')) return '30min Med';
  if (name.toLowerCase().includes('introduction to buddhism')) return 'Intro Buddhism';
  if (name.toLowerCase().includes('foundation program')) return 'Foundation';
  if (name.toLowerCase().includes('general program')) return 'General Prog';
  if (name.toLowerCase().includes('patient acceptance')) return 'Patience';
  if (name.toLowerCase().includes('sunday morning')) return 'Sunday AM';
  if (name.toLowerCase().includes('after-work')) return 'After-Work';
  // Truncate long names
  if (name.length > 15) return name.substring(0, 12) + '...';
  return name;
};

const ClassSchedule: React.FC = () => {
  const startDate = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return start;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(startDate);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('schedule');
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [hoveredClass, setHoveredClass] = useState<Class | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  // Calculate days for 2 months ahead
  const dateCount = useMemo(() => {
    const today = new Date();
    const twoMonthsAhead = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());
    return Math.ceil((twoMonthsAhead.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }, []);

  // Calculate the max date (2 months from today)
  const maxDate = useMemo(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());
  }, []);

  // Fetch classes from Google Sheets
  useEffect(() => {
    async function loadClasses() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllClasses(dateCount);

        // Convert ScheduledClass to Class type
        const convertedClasses: Class[] = data.map(sc => ({
          id: sc.id,
          name: sc.name,
          instructor: sc.instructor,
          time: sc.time,
          date: sc.date,
          endTime: sc.endTime,
          duration: sc.duration,
          cost: sc.cost,
          description: sc.description,
          registrationLink: sc.registrationLink,
          format: sc.format,
          featuredImage: sc.featuredImage,
          teacherImage: sc.teacherImage,
          isSpecialEvent: sc.isSpecialEvent,
          isCancelled: sc.isCancelled,
          cancellationReason: sc.cancellationReason
        }));

        setClasses(convertedClasses);
      } catch (err) {
        console.error('Failed to load classes:', err);
        setError('Failed to load schedule. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadClasses();
  }, [dateCount]);

  // Generate date range dynamically based on dateCount
  const dates = useMemo(() => {
    return generateDateRange(startDate, dateCount);
  }, [startDate, dateCount]);


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

  // Create a map of class counts by date for the DateSelector
  const classCountByDate = useMemo(() => {
    const countMap = new Map<string, number>();
    groupedClasses.forEach((classList, dateKey) => {
      countMap.set(dateKey, classList.length);
    });
    return countMap;
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
    if (classToBook && classToBook.registrationLink) {
      window.open(classToBook.registrationLink, '_blank');
    }
  };

  const formatSelectedDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDateSectionHeader = (date: Date): string => {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return `${weekday} ${day} ${month}`;
  };

  if (loading) {
    return (
      <div className={styles.scheduleContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Class Schedule</h1>
        </div>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading schedule...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.scheduleContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Class Schedule</h1>
        </div>
        <div className={styles.errorState}>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  // Calendar view helpers
  const getCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const days: (Date | null)[] = [];

    // Add padding for days before the 1st
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  };

  const getClassesForDate = (date: Date) => {
    return groupedClasses.get(date.toDateString()) || [];
  };

  const navigateMonth = (direction: number) => {
    setCalendarMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);

      // Don't go before current month
      const today = new Date();
      const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      if (newMonth < currentMonthStart) {
        return prev;
      }

      // Don't go beyond 2 months from now
      const maxMonthStart = new Date(today.getFullYear(), today.getMonth() + 2, 1);
      if (newMonth >= maxMonthStart) {
        return prev;
      }

      return newMonth;
    });
  };

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.header}>
        {/* View Mode Toggle */}
        <div className={styles.viewToggle}>
          <div
            className={`${styles.toggleSlider} ${viewMode === 'calendar' ? styles.sliderRight : ''}`}
          />
          <button
            className={`${styles.toggleOption} ${viewMode === 'schedule' ? styles.toggleActive : ''}`}
            onClick={() => setViewMode('schedule')}
          >
            Schedule
          </button>
          <button
            className={`${styles.toggleOption} ${viewMode === 'calendar' ? styles.toggleActive : ''}`}
            onClick={() => setViewMode('calendar')}
          >
            Calendar
          </button>
        </div>
        <p className={styles.subtitle}>
          {viewMode === 'schedule'
            ? formatSelectedDate(selectedDate)
            : calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          }
        </p>
      </div>

      {viewMode === 'schedule' ? (
        <>
          <DateSelector
            dates={dates}
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
            classCountByDate={classCountByDate}
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
        </>
      ) : (
        <div className={styles.calendarView}>
          <div className={styles.calendarNav}>
            <button onClick={() => navigateMonth(-1)} className={styles.navButton}>
              ←
            </button>
            <span className={styles.monthLabel}>
              {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => navigateMonth(1)} className={styles.navButton}>
              →
            </button>
          </div>
          <div className={styles.calendarGrid}>
            <div className={styles.weekdayHeader}>Sun</div>
            <div className={styles.weekdayHeader}>Mon</div>
            <div className={styles.weekdayHeader}>Tue</div>
            <div className={styles.weekdayHeader}>Wed</div>
            <div className={styles.weekdayHeader}>Thu</div>
            <div className={styles.weekdayHeader}>Fri</div>
            <div className={styles.weekdayHeader}>Sat</div>
            {getCalendarDays().map((day, index) => {
              const dayClasses = day ? getClassesForDate(day) : [];
              const isToday = day && day.toDateString() === new Date().toDateString();
              return (
                <div
                  key={index}
                  className={`${styles.calendarDay} ${!day ? styles.emptyDay : ''} ${isToday ? styles.today : ''} ${dayClasses.length > 0 ? styles.hasClasses : ''}`}
                >
                  {day && (
                    <>
                      <span className={styles.dayNumber}>{day.getDate()}</span>
                      {dayClasses.length > 0 && (
                        <div className={styles.classTitles}>
                          {dayClasses.slice(0, 3).map((classItem) => (
                            <div
                              key={classItem.id}
                              className={styles.classTitleWrapper}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.innerWidth <= 768) {
                                  setSelectedClass(classItem);
                                } else if (classItem.registrationLink) {
                                  window.open(classItem.registrationLink, '_blank');
                                }
                              }}
                            >
                              <span className={styles.classTitle}>
                                {classItem.time} - {classItem.name}
                              </span>
                              <div className={styles.tooltip}>
                                <div className={styles.tooltipTime}>{classItem.time}</div>
                                <div className={styles.tooltipName}>{classItem.name}</div>
                                <div className={styles.tooltipTeacher}>{classItem.instructor}</div>
                                <div className={styles.tooltipCost}>{classItem.cost}</div>
                              </div>
                            </div>
                          ))}
                          {dayClasses.length > 3 && (
                            <span className={styles.moreClasses}>+{dayClasses.length - 3} more</span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Modal */}
      {selectedClass && (
        <div className={styles.modalOverlay} onClick={() => setSelectedClass(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedClass(null)}>×</button>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>{selectedClass.name}</h3>
              <div className={styles.modalDetails}>
                <p><strong>Time:</strong> {selectedClass.time}</p>
                <p><strong>Instructor:</strong> {selectedClass.instructor}</p>
                <p><strong>Cost:</strong> {selectedClass.cost}</p>
                {selectedClass.description && (
                  <p className={styles.modalDescription}>{selectedClass.description}</p>
                )}
              </div>
              {selectedClass.registrationLink && (
                <a
                  href={selectedClass.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalButton}
                >
                  Register
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSchedule;
