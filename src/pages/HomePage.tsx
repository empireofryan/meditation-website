import { useLayoutEffect, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../App.css'
import Nav from '../components/Nav'
import ClassSchedule from '../components/Calendar/ClassSchedule'
import PageLoader from '../components/PageLoader'
import DustText from '../components/DustText'
import ScrollReveal from '../components/ScrollReveal'
import heroBg from '../assets/hero-bg.png'
import insta1 from '../assets/KMCWBInsta1.png'
import insta2 from '../assets/KMCWBInsta2.png'
import insta3 from '../assets/KMCWBInsta3.png'
import insta4 from '../assets/KMCWBInsta4.png'

const PRELOAD_IMAGES = [
  heroBg,
  '/photos/KMCWBStudents.jpg',
  '/photos/KMCJosephTeaching.jpg',
];

// Images from other pages to preload in background after homepage loads
const BACKGROUND_IMAGES = [
  '/kadampaaboutusheader.png',
  '/photos/volunteer-space.jpg',
  '/DiamondRainbow2.png',
  '/BusyStreetTimelapse.png',
];

function HomePage() {
  const _location = useLocation();
  void _location;
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Use useLayoutEffect to restore scroll position synchronously before paint
  useLayoutEffect(() => {
    // Skip scroll restoration if we have a hash (hash takes priority)
    const hash = window.location.hash;
    if (hash) {
      // Clear any saved scroll position since we're navigating to a hash
      sessionStorage.removeItem('restoreScroll');
      sessionStorage.removeItem('scheduleScrollPosition');
      return;
    }

    const shouldRestore = sessionStorage.getItem('restoreScroll');
    const savedPosition = sessionStorage.getItem('scheduleScrollPosition');

    if (shouldRestore && savedPosition) {
      // Clear flags first
      sessionStorage.removeItem('restoreScroll');
      sessionStorage.removeItem('scheduleScrollPosition');

      // Restore scroll position instantly without smooth behavior
      window.scrollTo({ top: parseInt(savedPosition, 10), behavior: 'instant' });
    }
  }, []);

  // Handle hash scrolling (e.g., /#classes) - wait for element to exist
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const scrollToHash = () => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      // Try with increasing delays to wait for PageLoader to render content
      const retryDelays = [0, 200, 500, 1000, 2000];
      retryDelays.forEach(delay => {
        setTimeout(scrollToHash, delay);
      });
    }
  }, []); // Run on mount only

  return (
    <PageLoader images={PRELOAD_IMAGES} backgroundImages={BACKGROUND_IMAGES}>
    <div className="app">
      <Nav />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-dust-label">
            <DustText text="Meditation in Williamsburg" delay={200} spread={80} />
          </span>
          <h1 className="hero-title hero-title-animate">
            Change your mind, change your world.
          </h1>
        </div>
      </section>

      {/* Class Schedule Section */}
      <section id="classes" className="schedule-section">
        <div className="schedule-header">
          <ScrollReveal>
            <h2>
              Upcoming <span className="underline">Classes</span>
            </h2>
            <p>Join us for meditation sessions throughout the week</p>
          </ScrollReveal>
        </div>
        <div className="schedule-calendar-container">
          <ClassSchedule />
        </div>
      </section>

      {/* Dark Section - About Modern Buddhism */}
      <section id="about" className="dark-section">
        <div className="dark-section-content">
          <div className="dark-section-text-container">
            <ScrollReveal>
              <h2 className="dark-section-title">
                Discover <span className="underline-light">inner peace</span> through meditation
              </h2>
              <p className="dark-section-text">
                We practice Modern Buddhism — a contemporary presentation of Buddha's ancient teachings that emphasizes integrating meditation with daily life, making every moment meaningful&nbsp;and&nbsp;joyous.
              </p>
              <a href="/about" className="cta-button">About Us</a>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={150}>
            <img
              src="/photos/KMCWBStudents.jpg"
              alt="KMC Williamsburg students"
              className="dark-section-image"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Second Yellow Section - Classes */}
      <section className="diagonal-section">
        <div className="section-container reverse">
          <ScrollReveal>
            <div className="section-content">
              <h2>
                Weekly drop-in <span className="underline">meditation classes</span>
              </h2>
              <p>
                We offer 10+ weekly meditation classes suitable for beginners and experienced meditators alike. Join our after-work sessions or General Program classes. Sunday's 11am class includes Coffee, Tea&nbsp;and&nbsp;Chat.
              </p>
              <a href="/classes" className="learn-more-button">Class Info</a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <img
              src="/photos/KMCJosephTeaching.jpg"
              alt="Joseph teaching at KMC Williamsburg"
              className="section-image"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="instagram-section">
        <ScrollReveal>
          <h2 className="instagram-title">Connect With Us</h2>
        </ScrollReveal>
        <div className="social-buttons">
          <a href="https://instagram.com/kadampawilliamsburg" target="_blank" rel="noopener noreferrer" className="social-btn instagram-btn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @kadampawilliamsburg
          </a>
          <a href="https://wa.me/12129246706" target="_blank" rel="noopener noreferrer" className="social-btn whatsapp-btn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp group
          </a>
        </div>
        <div className="instagram-grid">
          <a href="https://instagram.com/kadampawilliamsburg" target="_blank" rel="noopener noreferrer" className="instagram-item">
            <img src={insta1} alt="Meditation" />
          </a>
          <a href="https://instagram.com/kadampawilliamsburg" target="_blank" rel="noopener noreferrer" className="instagram-item">
            <img src={insta2} alt="Peaceful practice" />
          </a>
          <a href="https://instagram.com/kadampawilliamsburg" target="_blank" rel="noopener noreferrer" className="instagram-item">
            <img src={insta3} alt="Group meditation" />
          </a>
          <a href="https://instagram.com/kadampawilliamsburg" target="_blank" rel="noopener noreferrer" className="instagram-item">
            <img src={insta4} alt="Mindfulness" />
          </a>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <ScrollReveal>
            <h2>Newsletter Sign-up</h2>
            <p>Stay updated on upcoming classes and special events.</p>
          </ScrollReveal>
          <form
            className="newsletter-form"
            name="newsletter"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={async (e) => {
              e.preventDefault();
              setFormStatus('submitting');
              const form = e.currentTarget;
              const formData = new FormData(form);
              try {
                await fetch('/', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
                });
                setFormStatus('success');
                form.reset();
              } catch {
                setFormStatus('error');
              }
            }}
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <p hidden><input name="bot-field" /></p>
            <input
              type="text"
              name="first-name"
              placeholder="First Name"
              className="newsletter-input"
              required
            />
            <input
              type="text"
              name="last-name"
              placeholder="Last Name"
              className="newsletter-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="newsletter-input"
              required
            />
            <button type="submit" className="sign-up-button" disabled={formStatus === 'submitting'}>
              {formStatus === 'submitting' ? 'Sending...' : 'Sign Up'}
            </button>
          </form>
          {formStatus === 'success' && <p className="privacy-text" style={{ color: '#2d6a2d' }}>Thank you! You've been signed up.</p>}
          {formStatus === 'error' && <p className="privacy-text" style={{ color: '#a33' }}>Something went wrong. Please try again.</p>}
          {formStatus === 'idle' && <p className="privacy-text">We respect your privacy.</p>}
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
              <span className="footer-logo-main">KADAMPA<br />MEDITATION<br />CENTER</span>
              <span className="footer-logo-sub">Williamsburg</span>
            </h4>
            <p className="footer-address">
              119 North 11th Street<br />
              Williamsburg, NY 11249<br />
              info@meditationinwilliamsburg.org
            </p>
            <p className="footer-nonprofit">We are a 100% volunteer-run, non-profit organization.</p>
          </div>
          <div className="footer-right">
            <nav className="footer-nav">
              <a href="/about" className="footer-link">About</a>
              <a href="#classes" className="footer-link">Classes</a>
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
          </div>
        </div>
      </footer>
    </div>
    </PageLoader>
  )
}

export default HomePage
