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
          <a href="/classes" className="nav-link">Classes</a>
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
  )
}

export default AboutPage
