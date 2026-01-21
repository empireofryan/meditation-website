import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../App.css'
import PageLoader from '../components/PageLoader'
import { fetchUpcomingEvents, type ScheduledClass } from '../utils/sheetsApi'

const PRELOAD_IMAGES = [
  '/BusyStreetTimelapse.png',
];

function ClassesPage() {
  const [events, setEvents] = useState<ScheduledClass[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingEvents()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setEventsLoading(false));
  }, []);

  const formatEventDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <PageLoader images={PRELOAD_IMAGES}>
    <div className="app">
      {/* Navigation */}
      <nav className="nav about-nav">
        <Link to="/" className="logo">
          <span className="logo-main">KADAMPA MEDITATION CENTER</span>
          <span className="logo-sub">Williamsburg</span>
        </Link>
        <div className="nav-links">
          <a href="/about" className="nav-link">About</a>
          <a href="/membership" className="nav-link">Membership</a>
          <a href="/classes" className="nav-link">Classes</a>
          <a href="/#classes" className="cta-button-white">Schedule</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="classes-hero">
        <div className="classes-hero-content">
          <h1>Our Classes</h1>
          <p className="classes-tagline">Meditation and Buddhist teachings for modern life</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="classes-section">
        <div className="classes-container">
          <p className="classes-intro">
            We offer a variety of meditation classes throughout the week, from quick 30-minute
            after-work sessions to in-depth study programs. All classes are suitable for beginners
            and experienced meditators alike. No booking required for drop-in classes.
          </p>
        </div>
      </section>

      {/* 30-Minute Meditations */}
      <section className="classes-section classes-section-alt">
        <div className="classes-container">
          <div className="class-type-card">
            <div className="class-type-header">
              <h2 className="class-type-title">30-Minute After-Work Meditation</h2>
              <p className="class-type-meta">Monday-Friday at 6:00 PM | $5</p>
            </div>
            <div className="class-type-content">
              <p>
                Simple. Profound. Transformative. These brief meditation sessions help you get in touch
                with your infinite potential by connecting to the heart and cultivating inner peace.
                In just 30 minutes your whole day can change.
              </p>
              <p>
                Perfect for beginners or anyone looking for a quick reset after work. Each session
                includes guided meditation with light instruction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* General Program */}
      <section className="classes-section">
        <div className="classes-container">
          <div className="class-type-card">
            <div className="class-type-header">
              <h2 className="class-type-title">General Program Classes</h2>
              <p className="class-type-meta">Multiple times weekly | $10-15</p>
            </div>
            <div className="class-type-content">
              <p>
                Our General Program classes offer accessible teachings on Buddhist meditation and
                philosophy. Each class includes two guided meditations and a teaching based on
                authentic Buddhist texts, presented in a practical way for modern life.
              </p>
              <div className="class-offerings">
                <div className="class-offering">
                  <h4>Monday Evening</h4>
                  <p className="offering-time">7:00 PM | 60 min | $10</p>
                  <p>Weekly themed teachings exploring different aspects of Buddhist wisdom.</p>
                </div>
                <div className="class-offering">
                  <h4>Tuesday Evening - Introduction to Buddhism</h4>
                  <p className="offering-time">7:00 PM | 60 min | $10</p>
                  <p>Perfect for newcomers. Learn meditation basics and core Buddhist concepts.</p>
                </div>
                <div className="class-offering">
                  <h4>Thursday Evening - Patient Acceptance</h4>
                  <p className="offering-time">7:00 PM | 60 min | $10</p>
                  <p>Learn to transform difficult situations through the practice of patience.</p>
                </div>
                <div className="class-offering">
                  <h4>Sunday Morning</h4>
                  <p className="offering-time">11:00 AM | 90 min | $15</p>
                  <p>Start your week with meditation, teaching, and Coffee, Tea & Chat afterward.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foundation Program */}
      <section className="classes-section classes-section-alt">
        <div className="classes-container">
          <div className="class-type-card">
            <div className="class-type-header">
              <span className="class-type-badge membership-badge">Membership Required</span>
              <h2 className="class-type-title">Foundation Program</h2>
              <p className="class-type-meta">Wednesday at 6:45 PM | Included with Membership</p>
            </div>
            <div className="class-type-content">
              <p>
                A commitment-based study program for those interested in deepening their understanding
                of Buddha's teachings. Features regular teachings, meditation, and systematic study
                of Buddhist texts.
              </p>
              <p>
                Foundation Program provides a structured path for spiritual development, with
                opportunities for discussion and community practice. Requires Kadampa Meditation Center Williamsburg membership.
              </p>
              <Link to="/membership" className="class-type-cta">Learn About Membership</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Events */}
      <section className="classes-section">
        <div className="classes-container">
          <div className="class-type-card special-events-card">
            <div className="class-type-header">
              <span className="class-type-badge event-badge">Special Events</span>
              <h2 className="class-type-title">Workshops, Courses & Retreats</h2>
              <p className="class-type-meta">Saturdays & select dates</p>
            </div>
            <div className="class-type-content">
              <p>
                Throughout the year we offer special workshops, day courses, and retreats that
                provide deeper exploration of specific topics. These events are perfect for
                those wanting to deepen their practice or explore particular themes.
              </p>

              {/* Upcoming Events List */}
              <div className="upcoming-events-list">
                <h3 className="upcoming-events-title">Upcoming Events</h3>
                {eventsLoading ? (
                  <p className="events-loading">Loading events...</p>
                ) : events.length > 0 ? (
                  <div className="events-grid">
                    {events.slice(0, 6).map((event) => (
                      <a
                        key={event.id}
                        href={event.registrationLink || '/#classes'}
                        target={event.registrationLink ? '_blank' : undefined}
                        rel={event.registrationLink ? 'noopener noreferrer' : undefined}
                        className="event-item"
                      >
                        <span className="event-date">{formatEventDate(event.date)}</span>
                        <span className="event-name">{event.name}</span>
                        <span className="event-time">{event.time}{event.endTime ? ` - ${event.endTime}` : ''}</span>
                        {event.cost && <span className="event-cost">{event.cost}</span>}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="no-events">No upcoming events scheduled. Check back soon!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="classes-section classes-section-alt">
        <div className="classes-container">
          <h2 className="section-heading">What to Expect</h2>
          <div className="expect-grid">
            <div className="expect-item">
              <h4>No Experience Needed</h4>
              <p>All classes welcome complete beginners, as well as seasoned meditators.</p>
            </div>
            <div className="expect-item">
              <h4>Comfortable Setting</h4>
              <p>Sit on chairs or cushions - whatever's comfortable. Wear casual clothes.</p>
            </div>
            <div className="expect-item">
              <h4>Friendly Community</h4>
              <p>Meet like-minded people in a warm, welcoming environment.</p>
            </div>
            <div className="expect-item">
              <h4>Practical Teachings</h4>
              <p>Learn techniques you can apply immediately to improve your daily life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="classes-cta-section">
        <div className="classes-container">
          <h2>Ready to Begin?</h2>
          <p>Check our schedule and join us for a class this week.</p>
          <a href="/#classes" className="classes-cta-button">View Schedule</a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-map-column">
            <a href="https://maps.google.com/?q=Kadampa+Meditation+Center,+Williamsburg,+119+N+11th+St,+Brooklyn,+NY+11249" target="_blank" rel="noopener noreferrer" className="footer-map">
              <iframe
                src="https://maps.google.com/maps?q=119+N+11th+St,+Brooklyn,+NY+11249&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, pointerEvents: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KMC Williamsburg Location"
              ></iframe>
            </a>
          </div>
          <div className="footer-info-column">
            <h4 className="footer-location-name">
              <span className="footer-logo-main">KADAMPA MEDITATION CENTER</span>
              <span className="footer-logo-sub">Williamsburg</span>
            </h4>
            <p className="footer-address">
              119 North 11th Street<br />
              Williamsburg, NY 11249<br />
              info@meditationinwilliamsburg.org
            </p>
          </div>
          <div className="footer-right">
            <nav className="footer-nav">
              <a href="/about" className="footer-link">About</a>
              <a href="/#classes" className="footer-link">Classes</a>
              <a href="https://checkout.meditationinnewyork.org/make-a-donation-kmcw/" target="_blank" rel="noopener noreferrer" className="footer-link">Donate</a>
              <a href="/about#volunteer" className="footer-link">Volunteer</a>
            </nav>
            <div className="social-links">
              <a href="https://instagram.com/kadampawilliamsburg" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://wa.me/12129246706" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
            <p className="footer-nonprofit">We are a 100% volunteer run, non-profit.</p>
          </div>
        </div>
      </footer>
    </div>
    </PageLoader>
  )
}

export default ClassesPage
