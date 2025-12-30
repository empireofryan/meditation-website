import './App.css'
import ClassSchedule from './components/Calendar/ClassSchedule'

// Auto-deploy test - this change should trigger automatic deployment
function App() {
  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <nav className="nav">
          <div className="logo">KMC Williamsburg</div>
          <div className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a href="#classes" className="cta-button">Class Schedule</a>
          </div>
        </nav>
        <div className="hero-content">
          <h1 className="hero-title">
            Change your mind, change your world.
          </h1>
          <a href="#about" className="hero-cta">Learn more about us</a>
        </div>
      </section>

      {/* First Yellow Section - About Modern Buddhism */}
      <section id="about" className="diagonal-section">
        <div className="section-container">
          <img
            src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800"
            alt="Meditation practice"
            className="section-image"
          />
          <div className="section-content">
            <h2>
              Discover <span className="underline">inner peace</span> through meditation
            </h2>
            <p>
              At KMC Williamsburg, we practice Modern Buddhism - a modern presentation of Buddha's ancient teachings that emphasizes integrating meditation learning with daily life, making every moment of our lives meaningful and fulfilling.
            </p>
            <button className="learn-more-button">Learn More</button>
          </div>
        </div>
      </section>

      {/* Second Yellow Section - Classes */}
      <section className="diagonal-section" style={{ clipPath: 'polygon(0 0, 100% 8%, 100% 100%, 0 92%)', marginTop: '-180px' }}>
        <div className="section-container reverse">
          <div className="section-content">
            <h2>
              Weekly drop-in <span className="underline">meditation classes</span>
            </h2>
            <p>
              We offer 10+ weekly meditation classes suitable for beginners to experienced meditators. Join our after-work sessions or General Program classes. Sunday's 11am class includes Coffee, Tea and Chat for social connection.
            </p>
            <button className="learn-more-button">View Schedule</button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800"
            alt="Group meditation"
            className="section-image"
          />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <blockquote className="testimonial-quote">
          "Modern Buddhism has taught me how to integrate meditation into my daily life, bringing deep and lasting peace and happiness."
        </blockquote>
        <p className="testimonial-author">—A Student</p>
      </section>

      {/* Free Session Section with Calendar */}
      <section id="classes" className="free-session-section">
        <h2 className="free-session-title">
          Try a session for <span className="free-word">free</span> and see if it's right for you.
        </h2>
        <p className="free-session-subtitle">
          There's no commitment, pressure, or obligation.
        </p>

        {/* Calendar Integration */}
        <div className="calendar-container">
          <ClassSchedule />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Newsletter Sign-up</h2>
          <p>Sign up with your email address to receive news and updates.</p>
          <form className="newsletter-form">
            <input
              type="text"
              placeholder="First Name"
              className="newsletter-input"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="newsletter-input"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="newsletter-input"
            />
            <button type="submit" className="sign-up-button">
              Sign Up
            </button>
          </form>
          <p className="privacy-text">We respect your privacy.</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3>Welcome to our center</h3>
            <p className="footer-brand">KMC WILLIAMSBURG</p>
            <p className="footer-credit">
              119 North 11th Street<br />
              Williamsburg, NY 11249<br />
              212.924.6706<br />
              info@meditationinwilliamsburg.org
            </p>
          </div>
          <div className="footer-right">
            <nav className="footer-nav">
              <a href="#about" className="footer-link">About</a>
              <a href="#classes" className="footer-link">Classes</a>
              <a href="#events" className="footer-link">Events</a>
              <a href="#contact" className="footer-link">Contact</a>
            </nav>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
