import { Link } from 'react-router-dom'
import '../App.css'

function AboutPage() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav about-nav">
        <Link to="/" className="logo">
          <span className="logo-main">KADAMPA MEDITATION CENTER</span>
          <span className="logo-sub">Williamsburg</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/membership" className="nav-link">Membership</Link>
          <a href="/#classes" className="nav-link">Classes</a>
          <a href="/#classes" className="cta-button-white">Schedule</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Us</h1>
          <p className="about-tagline">Discover inner peace in the heart of Williamsburg</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-heading">Our Mission</h2>
          <p className="about-text">
            KMC NYC Williamsburg exists to provide everyone in the surrounding areas with the opportunity
            to learn about and practice Buddha's teachings. We present these teachings in an accessible
            manner that can be easily integrated into busy modern life.
          </p>
          <blockquote className="about-quote">
            "All experiences are preceded by mind, led by mind, made by mind."
          </blockquote>
        </div>
      </section>

      {/* About the Center */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <h2 className="about-heading">The Center</h2>
          <p className="about-text">
            Founded in 2005, our Williamsburg branch offers drop-in classes most evenings of the week,
            combining guided meditation with Dharma teachings. All general program classes welcome beginners—everyone is welcome.
          </p>
          <p className="about-text">
            Through practicing Buddha's teachings, we discover wisdom to solve daily problems and reach
            our highest potential—a state of permanent happiness, free from all suffering.
          </p>
        </div>
      </section>

      {/* Teaching Tradition */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-heading">Our Teaching Tradition</h2>
          <p className="about-text">
            Our teachings are based on the books of modern Buddhist teacher Venerable Geshe Kelsang Gyatso,
            who founded the New Kadampa Tradition. This tradition presents Buddha's ancient wisdom in a way
            that is practical and applicable to contemporary life.
          </p>
        </div>
      </section>

      {/* Class Schedule */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <h2 className="about-heading">Weekly Schedule</h2>
          <div className="about-schedule">
            <div className="schedule-item">
              <span className="schedule-day">Sunday</span>
              <span className="schedule-time">11:00 AM</span>
            </div>
            <div className="schedule-item">
              <span className="schedule-day">Monday - Thursday</span>
              <span className="schedule-time">7:00 PM (Wed 6:45 PM)</span>
            </div>
            <div className="schedule-item">
              <span className="schedule-day">Saturday</span>
              <span className="schedule-time">Courses, retreats & special events</span>
            </div>
          </div>
          <p className="about-text" style={{ marginTop: '1.5rem' }}>
            30-minute after-work meditations also available throughout the week.
          </p>
          <Link to="/#classes" className="about-cta">View Full Schedule</Link>
        </div>
      </section>

      {/* Donate Section */}
      <section className="about-section donate-section">
        <div className="donate-container">
          <div className="donate-graphic">
            <div className="donate-card">
              <p className="donate-card-title">Support a Space for Inner Peace in Williamsburg</p>
              <p className="donate-card-text">
                Your generosity helps us offer meditation, spiritual teachings, and
                community for all who seek refuge in the city.
              </p>
              <p className="donate-card-brand">KADAMPA MEDITATION CENTER<br /><span>Williamsburg</span></p>
            </div>
          </div>
          <div className="donate-content">
            <h2 className="donate-heading">KMC Williamsburg runs on love, wisdom, class fees, membership and donations.</h2>
            <p className="donate-text">
              Thanks to the generosity of our members, volunteers, and benefactors, KMC Williamsburg continues to
              flourish after 20 years in existence. Today we serve many people every month who come through our doors
              in search of real inner peace and happiness.
            </p>
            <p className="donate-text">
              If you'd like to contribute to the continued flourishing of Kadam Dharma teachings, click the button
              below to make a donation.
            </p>
            <p className="donate-text donate-thanks">
              A donation of any amount is received with gratitude. Thank you.
            </p>
            <a
              href="https://checkout.meditationinnewyork.org/make-a-donation-kmcw/"
              target="_blank"
              rel="noopener noreferrer"
              className="donate-button"
            >
              Donate
            </a>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="about-section about-section-alt volunteer-section">
        <div className="about-container">
          <h2 className="volunteer-heading">KMC NYC Williamsburg Runs on Volunteers...</h2>
          <p className="volunteer-subheading">Join us!</p>
          <img
            src="/photos/volunteer-space.jpg"
            alt="KMC Williamsburg meditation space"
            className="volunteer-image"
          />
          <div className="volunteer-content">
            <p className="volunteer-text">
              As a charity organization, we rely on the kindness and enthusiasm of current students to
              help our Center flourish.
            </p>
            <p className="volunteer-text">
              From assisting with the running of our classes to giving our beautiful meditation space a
              dusting, KMC NYC Williamsburg offers volunteer opportunities to suit all types of people
              and their varying schedules and interests.
            </p>
            <p className="volunteer-text">
              Drop us a line and let us know a bit about you and how you would like to help out. If you're
              not sure, that's fine too. We can always find something that needs doing!
            </p>
            <form className="volunteer-form">
              <input type="text" placeholder="Your name" className="volunteer-input" />
              <input type="email" placeholder="Your email" className="volunteer-input" />
              <textarea placeholder="Your message" className="volunteer-textarea" rows={5}></textarea>
              <button type="submit" className="volunteer-button">Send</button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-heading">Visit Us</h2>
          <div className="about-contact">
            <p className="about-address">
              <strong>119 North 11th Street</strong><br />
              Williamsburg, NY 11249
            </p>
            <p className="about-contact-info">
              <a href="tel:212-924-6706">212.924.6706</a><br />
              <a href="mailto:info@meditationinwilliamsburg.org">info@meditationinwilliamsburg.org</a>
            </p>
            <a
              href="https://instagram.com/kadampawilliamsburg"
              target="_blank"
              rel="noopener noreferrer"
              className="about-instagram"
            >
              @kadampawilliamsburg
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} Kadampa Meditation Center Williamsburg</p>
      </footer>
    </div>
  )
}

export default AboutPage
