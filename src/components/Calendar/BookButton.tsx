import React from 'react';
import styles from './BookButton.module.css';

interface BookButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const BookButton: React.FC<BookButtonProps> = ({
  onClick,
  disabled = false,
  variant = 'primary',
  children
}) => {
  const className = variant === 'primary'
    ? styles.bookButton
    : styles.secondaryButton;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default BookButton;
