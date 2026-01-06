import './Sunset.css'
import ClassSchedule from '../components/Calendar/ClassSchedule'

function SunsetPage() {
  return (
    <div className="sunset">
      {/* Header */}
      <header className="sunset-header">
        <nav className="sunset-nav">
          <div className="sunset-logo">KMC Williamsburg Meditation</div>
          <div className="sunset-nav-links">
            <a href="#schedule" className="sunset-nav-link">Menu</a>
            <a href="#contact" className="sunset-nav-link">Login</a>
            <a href="https://checkout.meditationinnewyork.org/nye-williamsburg-in-person/" className="sunset-cta-btn" target="_blank" rel="noopener noreferrer">Attend NYE Party</a>
          </div>
        </nav>
      </header>

      {/* Hero Section - Split Layout */}
      <section className="sunset-hero">
        <div className="sunset-hero-image-container">
          <img
            src="/meditation-website/hero-meditation.png"
            alt="Meditation"
            className="sunset-hero-image"
          />
        </div>
        <div className="sunset-hero-content">
          <h1 className="sunset-hero-title">
            KMC<br />WILLIAMSBURG
          </h1>
          <ul className="sunset-hero-list">
            <li>PEACE</li>
            <li>WISDOM</li>
            <li>COMPASSION</li>
            <li>BALANCE</li>
          </ul>
          <a href="#schedule" className="sunset-hero-btn">VIEW<br />SCHEDULE</a>
        </div>
      </section>

      {/* Quote Section */}
      <section className="sunset-quote">
        <div className="sunset-quote-icon">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <path d="M50,25 C62,25 72,32 75,42 C82,44 88,52 88,62 C88,74 78,82 66,80 C62,86 56,90 50,90 C44,90 38,86 34,80 C22,82 12,74 12,62 C12,52 18,44 25,42 C28,32 38,25 50,25" fill="#7CB4C9"/>
          </svg>
        </div>
        <p className="sunset-quote-text">
          "Through meditation we can learn to transform our mind, and by transforming our mind we can transform our entire experience of life."
        </p>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="sunset-schedule">
        <div className="sunset-schedule-container">
          <div className="sunset-schedule-calendar">
            <ClassSchedule />
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="method" className="sunset-method">
        <div className="sunset-method-container">
          <h2 className="sunset-method-title">Our Approach</h2>
          <div className="sunset-method-grid">
            <div className="sunset-method-item">
              <div className="sunset-method-icon">
                <svg width="120" height="120" viewBox="0 0 100 100">
                  {/* Spiky sun/starburst shape */}
                  <polygon points="50,5 54,20 58,8 58,22 68,12 62,25 78,18 67,30 85,28 70,38 92,40 72,46 90,55 70,54 82,68 65,58 72,78 56,62 58,82 50,65 42,82 44,62 28,78 35,58 18,68 30,54 10,55 28,46 8,40 30,38 15,28 33,30 22,18 38,25 32,12 42,22 42,8 46,20 50,5" fill="#E85D4A"/>
                </svg>
              </div>
              <h3 className="sunset-method-item-title">Focus</h3>
              <p className="sunset-method-item-text">
                It all starts by learning how to focus on what you want.
              </p>
            </div>
            <div className="sunset-method-item">
              <div className="sunset-method-icon">
                <svg width="120" height="120" viewBox="0 0 100 100">
                  {/* Wavy blob/cloud shape */}
                  <path d="M50,20 C65,20 75,30 75,40 C80,42 85,48 85,55 C85,65 75,72 65,70 C60,78 55,82 50,82 C45,82 40,78 35,70 C25,72 15,65 15,55 C15,48 20,42 25,40 C25,30 35,20 50,20" fill="#E8B563"/>
                </svg>
              </div>
              <h3 className="sunset-method-item-title">Reflect</h3>
              <p className="sunset-method-item-text">
                Next, you'll reflect on what may be blocking you, and learn how to overcome these obstacles.
              </p>
            </div>
            <div className="sunset-method-item">
              <div className="sunset-method-icon">
                <svg width="120" height="120" viewBox="0 0 100 100">
                  {/* Circle outline */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#7CB4C9" strokeWidth="8"/>
                </svg>
              </div>
              <h3 className="sunset-method-item-title">Refine</h3>
              <p className="sunset-method-item-text">
                The last step? We learn how to continually refine what we've learned. Think of this as your new beginning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Course Section */}
      <section className="sunset-course">
        <div className="sunset-course-content">
          <h2 className="sunset-course-title">UPCOMING<br />COURSE</h2>
          <div className="sunset-course-info">
            <p className="sunset-course-name">SELF LOVE</p>
            <p className="sunset-course-date">SEPT 14—16</p>
            <p className="sunset-course-format">VIRTUAL</p>
          </div>
          <a href="#contact" className="sunset-course-btn">Learn More</a>
        </div>
        <div className="sunset-course-image">
          <img src="https://images.unsplash.com/photo-1596438459194-f275f413d6ff?w=1000&q=80" alt="Red anthurium flowers" />
          <div className="sunset-course-overlay">
            <h3 className="sunset-course-overlay-title">SELF<br />LOVE</h3>
            <p className="sunset-course-overlay-subtitle">A 3-DAY WORKSHOP LEARNING TO<br />GROW MORE<br />LOVE WITHIN</p>
          </div>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className="sunset-gallery">
        <div className="sunset-gallery-grid">
          <div className="sunset-gallery-item sunset-gallery-icon" style={{ backgroundColor: '#E8B563' }}>
            <svg width="80" height="80" viewBox="0 0 100 100">
              <polygon points="50,5 54,20 58,8 58,22 68,12 62,25 78,18 67,30 85,28 70,38 92,40 72,46 90,55 70,54 82,68 65,58 72,78 56,62 58,82 50,65 42,82 44,62 28,78 35,58 18,68 30,54 10,55 28,46 8,40 30,38 15,28 33,30 22,18 38,25 32,12 42,22 42,8 46,20 50,5" fill="#E85D4A"/>
            </svg>
          </div>
          <div className="sunset-gallery-item sunset-gallery-photo">
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80" alt="Women together" />
          </div>
          <div className="sunset-gallery-item sunset-gallery-icon" style={{ backgroundColor: '#E07A5F' }}>
            <svg width="80" height="80" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="32" fill="none" stroke="#7CB4C9" strokeWidth="10"/>
            </svg>
          </div>
          <div className="sunset-gallery-item sunset-gallery-photo">
            <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80" alt="Pink flower" />
          </div>
          <div className="sunset-gallery-item sunset-gallery-icon" style={{ backgroundColor: '#F9E5B8' }}>
            <svg width="80" height="80" viewBox="0 0 100 100">
              <path d="M50,20 C65,20 75,30 75,40 C80,42 85,48 85,55 C85,65 75,72 65,70 C60,78 55,82 50,82 C45,82 40,78 35,70 C25,72 15,65 15,55 C15,48 20,42 25,40 C25,30 35,20 50,20" fill="#E8B563"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="sunset-newsletter">
        <div className="sunset-newsletter-container">
          <div className="sunset-newsletter-header">
            <h2 className="sunset-newsletter-title">NEWSLETTER</h2>
            <p className="sunset-newsletter-subtitle">Sign up for coaching tips, events, and more.</p>
          </div>
          <form className="sunset-newsletter-form">
            <input type="text" placeholder="First Name" className="sunset-newsletter-input" />
            <input type="text" placeholder="Last Name" className="sunset-newsletter-input" />
            <input type="email" placeholder="Email Address" className="sunset-newsletter-input" />
            <button type="submit" className="sunset-newsletter-button">Sign Up</button>
          </form>
        </div>
        <div className="sunset-divider"></div>
      </section>

      {/* Footer */}
      <footer id="contact" className="sunset-footer">
        <div className="sunset-footer-links">
          <a href="#about" className="sunset-footer-link">About</a>
          <a href="#podcast" className="sunset-footer-link">Podcast</a>
          <a href="#schedule" className="sunset-footer-link">Courses</a>
          <a href="#method" className="sunset-footer-link">Work With Me</a>
          <a href="#terms" className="sunset-footer-link">Terms & Conditions</a>
        </div>
      </footer>
    </div>
  )
}

export default SunsetPage
