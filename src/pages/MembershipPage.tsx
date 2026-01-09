import { Link } from 'react-router-dom'
import '../App.css'

function MembershipPage() {
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
          <Link to="/" className="nav-link">Home</Link>
          <a href="/#classes" className="nav-link">Classes</a>
          <a href="/#classes" className="cta-button-white">Schedule</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="membership-hero">
        <div className="membership-hero-content">
          <h1>All Access Membership</h1>
          <p className="membership-price">$85<span>/month</span></p>
          <p className="membership-tagline">Unlimited classes. Infinite growth.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="membership-section">
        <div className="membership-container">
          <h2 className="membership-heading">Your Membership Includes</h2>
          <ul className="benefits-list">
            <li>
              <span className="benefit-icon">✓</span>
              <span>Unlimited access to all classes, series, after-work meditations, retreats, and events at Kadampa Williamsburg</span>
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              <span>Exclusive access to Foundation Program, including past recordings.</span>
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              <span>Exclusive access to online streaming teachings (when available)</span>
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              <span>Unlimited access to all classes, series, after-work meditations, retreats, and events at <a href="https://meditationinnewyork.org/" target="_blank" rel="noopener noreferrer">Kadampa Chelsea</a></span>
            </li>
          </ul>
          <a
            href="https://checkout.meditationinnewyork.org/1-x-kmc-nyc-membership/"
            target="_blank"
            rel="noopener noreferrer"
            className="membership-cta"
          >
            Become a Member
          </a>
        </div>
      </section>

      {/* Members Login Section */}
      <section className="membership-section membership-section-alt">
        <div className="membership-container">
          <h2 className="membership-heading">Members Login</h2>
          <p className="membership-text">
            Already a member? Access your account to stream classes, view recordings, and manage your membership.
          </p>
          <a
            href="https://meditationinnewyork.org/member-login/"
            target="_blank"
            rel="noopener noreferrer"
            className="membership-login-btn"
          >
            Login to Member Portal
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="membership-section">
        <div className="membership-container">
          <h2 className="membership-heading">Questions?</h2>
          <p className="membership-text">
            Contact us at <a href="mailto:info@meditationinwilliamsburg.org">info@meditationinwilliamsburg.org</a> for more information about membership.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} Kadampa Meditation Center Williamsburg</p>
      </footer>
    </div>
  )
}

export default MembershipPage
