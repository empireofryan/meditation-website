import React, { useEffect, useRef, useCallback, useState } from 'react';
import { getDayName, getDayNumber } from '../../utils/dateUtils';
import styles from './DateSelector.module.css';

interface DateSelectorProps {
  dates: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onLoadMore?: () => void;
  classCountByDate?: Map<string, number>;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  dates,
  selectedDate,
  onSelectDate,
  onLoadMore,
  classCountByDate,
}) => {
  const selectedRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    // Scroll selected date into view on mount
    if (selectedRef.current && containerRef.current) {
      const container = containerRef.current;
      const selected = selectedRef.current;
      const scrollLeft =
        selected.offsetLeft - container.offsetWidth / 2 + selected.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
      // Update scroll buttons after scroll completes
      setTimeout(() => {
        if (containerRef.current) {
          const scrollPos = containerRef.current.scrollLeft;
          setCanScrollLeft(scrollPos > 0);
        }
      }, 150);
    }
  }, [selectedDate]);

  // Check scroll position and update arrow states
  const updateScrollButtons = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  // Handle scroll to load more dates
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    // Update arrow states
    updateScrollButtons();

    // Load more when scrolled 80% to the right
    if (onLoadMore && scrollLeft + clientWidth >= scrollWidth * 0.8) {
      onLoadMore();
    }
  }, [onLoadMore, updateScrollButtons]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Update scroll buttons when dates change or component mounts
    updateScrollButtons();
  }, [dates, updateScrollButtons]);

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const _getMonthName = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short' });
  };
  void _getMonthName;

  const _shouldShowMonth = (date: Date, index: number): boolean => {
    if (index === 0) return true;
    const prevDate = dates[index - 1];
    return date.getMonth() !== prevDate.getMonth();
  };
  void _shouldShowMonth;

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
      <button
        className={`${styles.navArrow} ${!canScrollLeft ? styles.disabled : ''}`}
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        aria-label="Previous dates"
      >
        ‹
      </button>
      <div className={styles.dateScrollContainer} ref={containerRef}>
        <div className={styles.dateList}>
          {dates.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            const classCount = classCountByDate?.get(date.toDateString()) || 0;
            const hasClasses = classCount > 0;
            return (
              <div
                key={date.toISOString()}
                ref={isSelected ? selectedRef : null}
                className={`${styles.dateItem} ${isSelected ? styles.selected : ''} ${!hasClasses ? styles.noClasses : ''}`}
                onClick={() => hasClasses && onSelectDate(date)}
              >
                <span className={styles.dayName}>{getDayName(date)}</span>
                <span className={styles.dayNumber}>{getDayNumber(date)}</span>
                <span className={styles.classCount}>
                  {hasClasses ? `${classCount} class${classCount !== 1 ? 'es' : ''}` : 'No classes'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className={`${styles.navArrow} ${!canScrollRight ? styles.disabled : ''}`}
        onClick={scrollRight}
        disabled={!canScrollRight}
        aria-label="Next dates"
      >
        ›
      </button>
    </div>
  );
};

export default DateSelector;
