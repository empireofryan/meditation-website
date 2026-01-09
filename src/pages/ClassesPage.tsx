import { Link } from 'react-router-dom'
import '../App.css'

function ClassesPage() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav about-nav">
        <Link to="/" className="logo">
          <span className="logo-main">KADAMPA MEDITATION CENTER</span>
          <span className="logo-sub">Williamsburg</span>
        </Link>
        <div className="nav-links">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/membership" className="nav-link">Membership</Link>
          <Link to="/classes" className="nav-link">Classes</Link>
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
              <span className="class-type-badge">Drop-in</span>
              <h2 className="class-type-title">30-Minute After-Work Meditation</h2>
              <p className="class-type-meta">Thursday & Friday at 6:00 PM | $5</p>
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
              <span className="class-type-badge">Drop-in</span>
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
                opportunities for discussion and community practice. Requires KMC NYC membership.
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
              <p>
                Topics include: stress reduction, relationships, overcoming anxiety, developing
                compassion, and more. Check our schedule for upcoming events.
              </p>
              <a href="/#classes" className="class-type-cta">View Upcoming Events</a>
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
              <p>All classes welcome complete beginners. We'll guide you through everything.</p>
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
      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} Kadampa Meditation Center Williamsburg</p>
      </footer>
    </div>
  )
}

export default ClassesPage
