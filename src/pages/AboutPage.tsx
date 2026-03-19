import { useState } from 'react'
import '../App.css'
import Nav from '../components/Nav'
import PageLoader from '../components/PageLoader'

const PRELOAD_IMAGES = [
  '/kadampaaboutusheader.png',
  '/photos/KMCWBStatues.jpeg',
  '/photos/KMCGeshla.jpeg',
  '/photos/KMCBooks.jpeg',
  '/photos/KMCKadamMorten.jpg',
  '/photos/volunteer-space.jpg',
  '/photos/KMCJosephTeaching.jpg',
  '/photos/KMCWBStudents.jpg',
];

type SectionId = 'founder' | 'teachers' | 'center' | 'temples' | null;

function AboutPage() {
  const [expandedSection, setExpandedSection] = useState<SectionId>(null);

  const toggleSection = (id: SectionId) => {
    setExpandedSection(prev => prev === id ? null : id);
  };

  return (
    <PageLoader images={PRELOAD_IMAGES}>
    <div className="app">
      <Nav variant="about" />

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
            Kadampa Meditation Center Williamsburg exists to provide the opportunity to learn about and practice Buddha's teachings. We present these teachings in an accessible
            manner that can be easily integrated into busy modern life.
          </p>
          <blockquote className="about-quote">
            "If we want to be truly happy and free from suffering, we must learn how to control our mind."
          </blockquote>
        </div>
      </section>

      {/* The Center */}
      <section className="about-section">
        <div className="about-container about-center-split">
          <img
            src="/photos/KMCWBStatues.jpeg"
            alt="KMC Williamsburg shrine and statues"
            className="about-center-image"
          />
          <div className="about-center-text">
            <h2 className="about-heading">The Center</h2>
            <p className="about-text">
              Founded in 2004, our Williamsburg branch offers drop-in classes most evenings of the week,
              combining guided meditation with Dharma teachings. All general program classes welcome beginners—everyone&nbsp;is&nbsp;welcome.
            </p>
            <p className="about-text">
              Through practicing Buddha's teachings, we discover wisdom to solve daily problems and reach
              our highest potential—a state of permanent happiness, free from all&nbsp;suffering.
            </p>
            <button className="about-learn-more-btn" onClick={() => toggleSection(expandedSection === 'center' ? null : 'center')}>
              {expandedSection === 'center' ? 'Close' : 'Learn More'}
            </button>
          </div>
        </div>
        {expandedSection === 'center' && (
          <div className="about-expanded-inline">
            <div className="about-container">
              <div className="about-expanded-content">
                <img
                  src="https://kawilliamsburg.wpengine.com/wp-content/uploads/2022/03/kadampa-meditation-center-williamsburg-buddha-statues.jpeg"
                  alt="KMC Williamsburg Buddha statues and shrine"
                  className="about-expanded-image"
                />
                <div className="about-expanded-text">
                  <h4>Serving New York City since 1994, and Williamsburg since 2004</h4>
                  <p>
                    In 1994, Kadampa Buddhist teacher Geshe Kelsang Gyatso established Chakrasambara Center in New York City (now Kadampa Meditation Center NYC) and requested senior student Kadam Morten to become the principal teacher. The center started off in a small graffiti-covered dance studio near the Bowery, and by 2001 classes were being held in a rented commercial space in Chelsea. Soon after, a branch class and then a branch center was established in Williamsburg.
                  </p>
                  <p>
                    Today, the Williamsburg Branch offers drop-in meditation classes most evenings of the week, combining guided meditation with Dharma teachings. All general program classes welcome beginners.
                  </p>
                </div>
              </div>
              <div className="about-photo-gallery">
                <div className="about-photo-gallery-item">
                  <img
                    src="https://meditationinwilliamsburg.org/wp-content/uploads/bb-plugin/cache/modern-buddhism-kadampa-williamsburg-meditation-landscape-4dd25ee50f23e03ef80f0519bf6563f4-c9nhgumq7vap.jpeg"
                    alt="Modern Buddhism class at Kadampa Williamsburg"
                  />
                  <p className="about-photo-caption">A meditation class at KMC Williamsburg</p>
                </div>
                <div className="about-photo-gallery-item">
                  <img
                    src="https://meditationinwilliamsburg.org/wp-content/uploads/bb-plugin/cache/kadampa-meditation-center-williamsburg-meditation-room-landscape-8f4a08fb318a3298c1e88a57f9901bf1-0jx3ay5t4zng.jpeg"
                    alt="KMC Williamsburg meditation room"
                  />
                  <p className="about-photo-caption">Our meditation room in Williamsburg</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Our Teachers */}
      <section className="about-section about-section-alt">
        <div className="about-container about-center-split">
          <div className="about-center-text">
            <h2 className="about-heading">Our Teachers</h2>
            <p className="about-text">
              Our experienced teachers present Buddha's teachings with clarity, warmth, and practical insight for everyday life.
            </p>
            <button className="about-learn-more-btn" onClick={() => toggleSection(expandedSection === 'teachers' ? null : 'teachers')}>
              {expandedSection === 'teachers' ? 'Close' : 'Learn More'}
            </button>
          </div>
          <img
            src="/photos/KMCKadamMorten.jpg"
            alt="Kadam Morten teaching"
            className="about-center-image"
          />
        </div>
        {expandedSection === 'teachers' && (
          <div className="about-expanded-inline">
            <div className="about-container">
              <div className="about-expanded-content">
                <img src="/photos/KMCKadamMorten.jpg" alt="Kadam Morten Clausen" className="about-expanded-image" />
                <div className="about-expanded-text">
                  <h4>Kadam Morten Clausen</h4>
                  <p className="about-expanded-subtitle">Eastern US National Spiritual Director &amp; Resident Teacher at KMC NYC</p>
                  <p>
                    Kadam Morten Clausen is the Eastern US National Spiritual Director of the New Kadampa Tradition and Resident Teacher at Kadampa Meditation Center New York City, of which Williamsburg is a branch.
                  </p>
                  <p>
                    For over 30 years he has been a close disciple of Venerable Geshe Kelsang Gyatso, greatly admired as a meditation teacher and especially known for his clarity, humor, and inspirational presentation of Buddha's teachings.
                  </p>
                </div>
              </div>
              <h4 className="about-expanded-section-title">Williamsburg Branch Teachers</h4>
              <div className="about-teachers-grid about-teachers-grid-small">
                <div className="about-teacher-card">
                  <img src="/photos/teachers/joseph.jpg" alt="Joseph" className="about-teacher-photo" />
                  <p className="about-teacher-name">Joseph</p>
                </div>
                <div className="about-teacher-card">
                  <img src="/photos/teachers/teri.jpg" alt="Teri" className="about-teacher-photo" />
                  <p className="about-teacher-name">Teri</p>
                </div>
                <div className="about-teacher-card">
                  <img src="/photos/teachers/ben.jpg" alt="Ben" className="about-teacher-photo" />
                  <p className="about-teacher-name">Ben</p>
                </div>
                <div className="about-teacher-card">
                  <img src="/photos/teachers/deanna.jpg" alt="Deanna" className="about-teacher-photo" />
                  <p className="about-teacher-name">Deanna</p>
                </div>
                <div className="about-teacher-card">
                  <img src="/photos/teachers/debbie.jpg" alt="Debbie" className="about-teacher-photo" />
                  <p className="about-teacher-name">Debbie</p>
                </div>
                <div className="about-teacher-card">
                  <img src="/photos/teachers/eli.jpg" alt="Eli" className="about-teacher-photo" />
                  <p className="about-teacher-name">Eli</p>
                </div>
                <div className="about-teacher-card">
                  <img src="/photos/teachers/giselle.jpg" alt="Giselle" className="about-teacher-photo" />
                  <p className="about-teacher-name">Giselle</p>
                </div>
                <div className="about-teacher-card">
                  <img src="/photos/teachers/tom.jpg" alt="Tom" className="about-teacher-photo" />
                  <p className="about-teacher-name">Tom</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Our Founder / Teaching Tradition */}
      <section className="about-section">
        <div className="about-container about-tradition-split">
          <div className="about-tradition-text">
            <h2 className="about-heading">Our Teaching Tradition</h2>
            <p className="about-text">
              Our teachings are based on the books of modern Buddhist teacher Venerable Geshe Kelsang Gyatso,
              who founded the New Kadampa Tradition. This tradition presents Buddha's ancient wisdom in a way
              that is practical and applicable to contemporary&nbsp;life.
            </p>
            <button className="about-learn-more-btn" onClick={() => toggleSection(expandedSection === 'founder' ? null : 'founder')}>
              {expandedSection === 'founder' ? 'Close' : 'Learn More'}
            </button>
          </div>
          <div className="about-tradition-images">
            <img
              src="/photos/KMCBooks.jpeg"
              alt="Books by Geshe Kelsang Gyatso"
              className="tradition-img tradition-img-back"
            />
            <img
              src="/photos/KMCGeshla.jpeg"
              alt="Venerable Geshe Kelsang Gyatso"
              className="tradition-img tradition-img-mid"
            />
            <img
              src="/photos/KMCKadamMorten.jpg"
              alt="Kadam Morten teaching"
              className="tradition-img tradition-img-front"
            />
          </div>
        </div>
        {expandedSection === 'founder' && (
          <div className="about-expanded-inline">
            <div className="about-container">
              <h3 className="about-expanded-title">Venerable Geshe Kelsang Gyatso</h3>
              <div className="about-expanded-content">
                <img
                  src="https://meditationinnewyork.org/wp-content/uploads/2019/04/kadampa-nyc-kadam-dharma-geshe-kelsang-gyatso-scaled.jpeg"
                  alt="Venerable Geshe Kelsang Gyatso"
                  className="about-expanded-image"
                />
                <div className="about-expanded-text">
                  <p>
                    Venerable Geshe Kelsang Gyatso Rinpoche is the founder of the New Kadampa Tradition &ndash; International Kadampa Buddhist Union, an international association of Kadampa Buddhist centers with over 1,400 locations worldwide.
                  </p>
                  <p>
                    Born in Tibet in 1931 and ordained a Buddhist monk at the age of eight, Geshe Kelsang studied extensively in the great monastic universities of Tibet. In 1977, he accepted an invitation to come to Manjushri Centre in England to teach. He has devoted his entire life to the flourishing of Buddhist teachings throughout the world.
                  </p>
                  <p>
                    In 1991, Geshe Kelsang founded the NKT-IKBU, which now has over 1,400 Kadampa centers and branches around the world. He has written 24 authoritative books on Buddhist thought and practice.
                  </p>
                  <p>
                    Geshe Kelsang first visited our New York center in 1997 and later formally opened the Chelsea location in 2001. In his teachings, he emphasizes the importance of meditation in daily life and how to cultivate a good heart to help others.
                  </p>
                </div>
              </div>
              <div className="about-photo-gallery">
                <div className="about-photo-gallery-item">
                  <img
                    src="https://meditationinnewyork.org/wp-content/uploads/2019/04/geshe-kelsang-gyatso-founder-kmc-chelsea.jpeg"
                    alt="Geshe Kelsang Gyatso at KMC NYC"
                  />
                  <p className="about-photo-caption">Geshe Kelsang Gyatso at KMC New York City</p>
                </div>
                <div className="about-photo-gallery-item">
                  <img
                    src="https://meditationinnewyork.org/wp-content/uploads/2019/04/geshe-kelsang-gyatso-teacher-trijang-rinpoche.jpeg"
                    alt="Geshe Kelsang Gyatso with his teacher Trijang Rinpoche"
                  />
                  <p className="about-photo-caption">With his Spiritual Guide, Kyabje Trijang Rinpoche</p>
                </div>
                <div className="about-photo-gallery-item">
                  <img
                    src="https://meditationinnewyork.org/wp-content/uploads/2019/04/books-by-geshe-kelsang-gyatso.jpeg"
                    alt="Books by Geshe Kelsang Gyatso"
                  />
                  <p className="about-photo-caption">Author of 24 books on Buddhist thought and practice</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Temples */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <h2 className="about-heading">International Temples Project</h2>
          <p className="about-text" style={{ maxWidth: 700 }}>
            The New Kadampa Tradition has built Buddhist temples in cities around the world, dedicated to world peace and the flourishing of Buddha's&nbsp;teachings.
          </p>
          <button className="about-learn-more-btn" onClick={() => toggleSection(expandedSection === 'temples' ? null : 'temples')}>
            {expandedSection === 'temples' ? 'Close' : 'Learn More'}
          </button>
        </div>
        {expandedSection === 'temples' && (
          <div className="about-expanded-inline">
            <div className="about-container">
              <div className="about-temples-gallery">
                <div className="about-temple-item">
                  <img src="https://kadampa.org/wp-content/uploads/2020/08/traditioncover-temple-1024x614.jpg" alt="Manjushri KMC, England" />
                  <p className="about-temple-caption">Manjushri KMC, Ulverston, England. Opened in 1997.</p>
                </div>
                <div className="about-temple-item">
                  <img src="https://kadampa.org/wp-content/uploads/2022/03/5-US-Temple-children-1-1024x614.jpeg" alt="KMC New York" />
                  <p className="about-temple-caption">KMC New York, Glen Spey, New York. Opened in 2006.</p>
                </div>
                <div className="about-temple-item">
                  <img src="https://kadampa.org/wp-content/uploads/2019/10/1-Brazil-Temple-at-Dusk-2013--1024x614.jpg" alt="KMC Brazil" />
                  <p className="about-temple-caption">KMC Brazil, Cabreuva, Brazil. Opened in 2013.</p>
                </div>
                <div className="about-temple-item">
                  <img src="https://kadampa.org/wp-content/uploads/2021/09/unnamed-file-1024x614.jpg" alt="KMC Portugal" />
                  <p className="about-temple-caption">KMC Portugal, Sintra, Portugal.</p>
                </div>
                <div className="about-temple-item">
                  <img src="https://kadampa.org/wp-content/uploads/2021/09/167133359_864333117448918_1864838710688061291_n-1024x614.jpeg" alt="IKRC Grand Canyon" />
                  <p className="about-temple-caption">IKRC Grand Canyon, Williams, Arizona.</p>
                </div>
                <div className="about-temple-item">
                  <img src="https://kadampa.org/wp-content/uploads/2019/04/Proyecto-sin-titulo-1024x614.jpg" alt="KMC Spain" />
                  <p className="about-temple-caption">KMC Spain, Malaga, Spain.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="about-section volunteer-section">
        <div className="volunteer-split">
          <div className="volunteer-left">
            <h2 className="volunteer-heading">KMC NYC Williamsburg Runs on Volunteers...</h2>
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
              <a href="mailto:info@meditationinwilliamsburg.org" className="volunteer-email-link">Drop us a line</a> and let us know a bit about you and how you would like to help out. If you're
              not sure, that's fine too. We can always find something that needs doing!
            </p>
          </div>
          <div className="volunteer-right">
            <img
              src="/photos/volunteer-space.jpg"
              alt="KMC Williamsburg meditation space"
              className="volunteer-image"
            />
          </div>
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
            <h2 className="donate-heading">KMC Williamsburg runs on love, memberships, and donations.</h2>
            <p className="donate-text">
              Thanks to the generosity of our members, volunteers, and benefactors, KMC Williamsburg continues to
              flourish after 20 years in existence. Today we serve many people every month who come through our doors
              in search of real inner peace and&nbsp;happiness.
            </p>
            <p className="donate-text">
              If you'd like to contribute to the continued flourishing of Kadam Dharma teachings, click the button
              below to make a&nbsp;donation.
            </p>
            <p className="donate-text donate-thanks">
              A donation of any amount is received with gratitude. Thank&nbsp;you.
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
          </div>
        </div>
      </footer>
    </div>
    </PageLoader>
  )
}

export default AboutPage
