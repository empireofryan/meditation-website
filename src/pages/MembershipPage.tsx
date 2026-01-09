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
          <p className="membership-tagline">Unlimited classes. Unlimited growth.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="membership-section">
        <div className="membership-container">
          <h2 className="membership-heading">Your Membership Includes</h2>
          <ul className="benefits-list">
            <li>
              <span className="benefit-icon">✓</span>
              <span>Free access to all General Program classes</span>
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              <span>Free access to all 30-Minute Meditations</span>
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              <span>Free access to Saturday courses/retreats</span>
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              <span>Free access to all branch classes — Williamsburg, Queens, NoHo, UWS, Harlem, Riverdale and Jersey City</span>
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              <span>50% discount on all classes and events at Vajradhara Meditation Center in Brooklyn</span>
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              <span>Discounted class audio recordings</span>
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              <span>Up to 50% discount on special events</span>
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              <span>Ability to stream classes online</span>
            </li>
            <li>
              <span className="benefit-icon">✓</span>
              <span>Access to Foundation Program</span>
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

      {/* Supporting Member Section */}
      <section className="supporting-member-section">
        <div className="supporting-member-card">
          <div className="supporting-member-content">
            <p className="supporting-member-brand">Kadampa Williamsburg</p>
            <h2 className="supporting-member-title">SUPPORTING MEMBER</h2>
            <div className="supporting-member-divider"></div>
            <p className="supporting-member-description">
              For those who are passionate about meditation and want to make it a
              more prominent feature in their lives, membership is a wonderful option.
            </p>
            <p className="supporting-member-price">$85 / month</p>
            <p className="supporting-member-access">
              Access to all courses and retreats at the Williamsburg and Chelsea locations
            </p>
          </div>
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
            Contact us at <a href="mailto:info@meditationinwilliamsburg.org">info@meditationinwilliamsburg.org</a> or
            call <a href="tel:212-924-6706">212.924.6706</a> for more information about membership.
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
