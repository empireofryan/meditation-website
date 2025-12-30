import React, { useEffect, useRef, useCallback } from 'react';
import { getDayName, getDayNumber } from '../../utils/dateUtils';
import styles from './DateSelector.module.css';

interface DateSelectorProps {
  dates: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onLoadMore?: () => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  dates,
  selectedDate,
  onSelectDate,
  onLoadMore,
}) => {
  const selectedRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll selected date into view on mount
    if (selectedRef.current && containerRef.current) {
      const container = containerRef.current;
      const selected = selectedRef.current;
      const scrollLeft =
        selected.offsetLeft - container.offsetWidth / 2 + selected.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [selectedDate]);

  // Handle scroll to load more dates
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !onLoadMore) return;

    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    // Load more when scrolled 80% to the right
    if (scrollLeft + clientWidth >= scrollWidth * 0.8) {
      onLoadMore();
    }
  }, [onLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getMonthName = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  const shouldShowMonth = (date: Date, index: number): boolean => {
    if (index === 0) return true;
    const prevDate = dates[index - 1];
    return date.getMonth() !== prevDate.getMonth();
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.dateSelector}>
      <button className={styles.navArrow} onClick={scrollLeft} aria-label="Previous dates">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div className={styles.dateScrollContainer} ref={containerRef}>
        <div className={styles.dateList}>
          {dates.map((date, index) => {
            const isSelected = isSameDay(date, selectedDate);
            return (
              <div
                key={date.toISOString()}
                ref={isSelected ? selectedRef : null}
                className={`${styles.dateItem} ${isSelected ? styles.selected : ''}`}
                onClick={() => onSelectDate(date)}
              >
                <span className={styles.dayName}>{getDayName(date)}</span>
                <span className={styles.dayNumber}>{getDayNumber(date)}</span>
                {shouldShowMonth(date, index) && (
                  <span className={styles.monthIndicator}>{getMonthName(date)}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <button className={styles.navArrow} onClick={scrollRight} aria-label="Next dates">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default DateSelector;
