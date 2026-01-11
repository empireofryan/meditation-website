import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchClassBySlug, type ScheduledClass } from '../utils/sheetsApi';
import styles from './ClassDetail.module.css';

const ClassDetail = () => {
  const { className } = useParams<{ className: string }>();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<ScheduledClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!className) return;

    setLoading(true);
    setError(null);

    fetchClassBySlug(className)
      .then(data => {
        setClassData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [className]);

  const handleBack = () => {
    const savedPosition = sessionStorage.getItem('scheduleScrollPosition');
    if (savedPosition) {
      // Mark that we need to restore scroll position
      sessionStorage.setItem('restoreScroll', 'true');
    }
    navigate(-1);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <nav className={styles.nav}>
          <Link to="/kmc-schedule" className={styles.logo}>KMC Williamsburg</Link>
          <div className={styles.navLinks}>
            <a href="/#about" className={styles.navLink}>About</a>
            <a href="/#contact" className={styles.navLink}>Contact</a>
            <a href="/#classes" className={styles.ctaButton}>Class Schedule</a>
          </div>
        </nav>
        <div className={styles.container}>
          <div className={styles.loading}>Loading class details...</div>
        </div>
      </div>
    );
  }

  if (error || !classData) {
    return (
      <div className={styles.page}>
        <nav className={styles.nav}>
          <Link to="/kmc-schedule" className={styles.logo}>KMC Williamsburg</Link>
          <div className={styles.navLinks}>
            <a href="/#about" className={styles.navLink}>About</a>
            <a href="/#contact" className={styles.navLink}>Contact</a>
            <a href="/#classes" className={styles.ctaButton}>Class Schedule</a>
          </div>
        </nav>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1>Class not found</h1>
            <p>{error || "We couldn't find the class you're looking for."}</p>
            <button onClick={handleBack} className={styles.backButton}>
              &larr; Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const dayName = classData.date.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = classData.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const formattedDate = `${dayName}, ${dateStr}`;

  const handleBookNow = () => {
    if (classData.registrationLink) {
      window.open(classData.registrationLink, '_blank');
    }
  };

  return (
    <div className={styles.page}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <Link to="/kmc-schedule" className={styles.logo}>KMC Williamsburg</Link>
        <div className={styles.navLinks}>
          <a href="/#about" className={styles.navLink}>About</a>
          <a href="/#contact" className={styles.navLink}>Contact</a>
          <a href="/#classes" className={styles.ctaButton}>Class Schedule</a>
        </div>
      </nav>

      {/* Back Button */}
      <div className={styles.backContainer}>
        <button onClick={handleBack} className={styles.backButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Class Detail Card */}
      <div className={styles.container}>
        <article className={styles.classDetail}>
          <header className={styles.header}>
            <h1 className={styles.title}>{classData.name}</h1>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                {classData.teacherImage ? (
                  <img
                    src={classData.teacherImage}
                    alt={classData.instructor}
                    className={styles.teacherPhoto}
                  />
                ) : (
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
                <span>{classData.instructor.split(' ')[0]}</span>
              </div>
              <div className={styles.metaItem}>
                <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formattedDate}</span>
              </div>
              {classData.time && (
                <div className={styles.metaItem}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{classData.time}{classData.endTime ? ` - ${classData.endTime}` : ''}</span>
                </div>
              )}
              {classData.cost && (
                <div className={styles.metaItem}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{classData.cost}</span>
                </div>
              )}
              {classData.format && (
                <div className={styles.metaItem}>
                  <span className={styles.formatBadge}>{classData.format}</span>
                </div>
              )}
            </div>
          </header>

          {classData.description && (
            <section className={styles.content}>
              <h2 className={styles.sectionTitle}>About this class</h2>
              <div className={styles.description}>
                {classData.description.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          <footer className={styles.cardFooter}>
            <div className={styles.footerInfo}>
              <span className={styles.dateTime}>
                {dayName} at {classData.time}
              </span>
            </div>
            <button className={styles.bookButton} onClick={handleBookNow}>
              Book Now
            </button>
          </footer>
        </article>
      </div>

      {/* Site Footer */}
      <footer className={styles.siteFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <h3>Welcome to our center</h3>
            <p className={styles.footerBrand}>KMC WILLIAMSBURG</p>
            <p className={styles.footerAddress}>
              119 North 11th Street<br />
              Williamsburg, NY 11249<br />
              212.924.6706<br />
              info@meditationinwilliamsburg.org
            </p>
          </div>
          <div className={styles.footerRight}>
            <nav className={styles.footerNav}>
              <a href="/#about" className={styles.footerLink}>About</a>
              <a href="/#classes" className={styles.footerLink}>Classes</a>
              <a href="/#contact" className={styles.footerLink}>Contact</a>
            </nav>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClassDetail;
