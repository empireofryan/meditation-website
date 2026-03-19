import { useState } from 'react'
import '../App.css'
import Nav from '../components/Nav'

const FP_PASSWORD = 'TNESTH'

function FPResourcesPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('schedule')

  const handleSubmit = () => {
    if (password.toUpperCase() === FP_PASSWORD) {
      setAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  const tabs = [
    { id: 'schedule', label: 'Schedule' },
    { id: 'guidelines', label: 'Guidelines' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'resources', label: 'Resources' },
    { id: 'exams', label: 'Exams' },
  ]

  return (
    <div className="app">
      <Nav variant="about" />

      {!authenticated ? (
        <section className="fp-password-section">
          <div className="fp-password-card">
            <h1 className="fp-password-title">FP Resources</h1>
            <p className="fp-password-text">This content is password-protected. Please enter your FP member password.</p>
            <input
              type="password"
              className="password-modal-input"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter password"
              autoFocus
            />
            {error && <p className="password-modal-error">{error}</p>}
            <button className="password-modal-submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </section>
      ) : (
        <>
          <section className="fp-resources-hero">
            <h1>FP Resources</h1>
            <p>Foundation Program — Kadampa Meditation Center Williamsburg</p>
          </section>

          {/* Zoom Banner */}
          <div className="fp-zoom-banner">
            <div className="fp-zoom-banner-item">
              <span>Attend Online:</span>
              <a
                href="https://zoom.us/j/95204364746?pwd=v982BTYgqnhbjJ8Y4wfiWTL8RodwhA.1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Zoom Meeting
              </a>
            </div>
            <div className="fp-zoom-banner-item">
              <a
                href="https://drive.google.com/drive/folders/1BARikaQwu3N5bDYB4tZHM1BqqgV8VfBd?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Access FP Recordings on Google Drive &rarr;
              </a>
            </div>
          </div>

          {/* Tabs */}
          <div className="fp-tabs-container">
            <nav className="fp-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`fp-tab ${activeTab === tab.id ? 'fp-tab-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <section className="fp-tab-content">
            <div className="fp-content-inner">

              {/* SCHEDULE TAB */}
              {activeTab === 'schedule' && (
                <div className="fp-doc">
                  <h2>Williamsburg FP Schedule</h2>
                  <div className="fp-schedule-note">
                    <p><strong>September 11:</strong> Regular class — New term begins</p>
                    <p>All Monday classes are on with the exception of dates listed below.</p>
                  </div>
                  <p className="fp-doc-note">For the complete and most up-to-date schedule, view the full document:</p>
                  <a
                    href="https://docs.google.com/document/d/14j0EtwkbDB72qog5U8ld8q5GzTatUyRsfEEhVM8mQj0/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fp-doc-link"
                  >
                    Open FP Schedule in Google Docs &rarr;
                  </a>
                </div>
              )}

              {/* GUIDELINES TAB */}
              {activeTab === 'guidelines' && (
                <div className="fp-doc">
                  <h2>Foundation Program Guidelines</h2>

                  <h3>1. The Importance of Study Programs</h3>
                  <p>Many students of Buddhism have a sincere wish to deepen their knowledge and experience of Dharma and to gain authentic spiritual realizations through a structured program of Dharma studies. The Foundation Program (FP) and the Teacher Training Program (TTP) are tried and tested methods for fulfilling these wishes.</p>
                  <blockquote className="fp-quote">
                    "Our present understanding and experience of Dharma is quite superficial. We are like someone who has entered a huge food store and seen many things but sampled only a few... If we just pick at Dharma randomly, we shall never gain a deep and stable experience. For this reason, the Foundation Program and Teacher Training Program are very important."
                    <cite>— Geshe Kelsang Gyatso</cite>
                  </blockquote>

                  <h3>2. The Foundation Program</h3>
                  <p>FP provides a systematic presentation of particular subjects of Mahayana Buddhism. The program comprises five subjects:</p>
                  <ul>
                    <li><strong>The Stages of the Path to Enlightenment</strong> — based on <em>Joyful Path of Good Fortune</em></li>
                    <li><strong>Training the Mind</strong> — based on <em>Universal Compassion</em> and <em>The New Eight Steps to Happiness</em></li>
                    <li><strong>The Heart Sutra</strong> — based on <em>The New Heart of Wisdom</em></li>
                    <li><strong>Guide to the Bodhisattva's Way of Life</strong> — based on <em>Meaningful to Behold</em></li>
                    <li><strong>Types of Mind</strong> — based on <em>How to Understand the Mind</em></li>
                  </ul>

                  <h3>3. Requirements</h3>

                  <h4>3.1 Attend all classes</h4>
                  <p>FP meets on <strong>Mondays, 6:45–8:45pm</strong>. Students must attend all regular classes, discussion classes, and pujas when they fall on a class night.</p>
                  <p><strong>In Person:</strong> Sign in at the front desk. If you forget, email <a href="mailto:fp@meditationinwilliamsburg.org">fp@meditationinwilliamsburg.org</a>. Students arriving after 7:45pm are marked absent but may still attend and must submit a Missed Class Summary.</p>
                  <p><strong>Online:</strong> Join via a personal Zoom account with your first and last name as display name. Cameras must be on or students are removed after 5 minutes.</p>

                  <h4>3.2 Prepare for all classes</h4>
                  <p>Read the allotted pages, organize your thoughts, and memorize essential points (primarily the root text and outlines).</p>

                  <h4>3.3 Submit Missed Class Summaries</h4>
                  <p>When missing a regular class, listen to the recording and submit a summary within one week. For missed discussion classes, submit a question. More than 3 outstanding summaries may result in suspension.</p>

                  <h4>3.4 Partner Discussion</h4>
                  <p>Held towards the end of each class. Partners summarize the teaching, discuss the essential meaning, and come to a conclusion about how to practice.</p>

                  <h4>3.5 Rota Commitments</h4>
                  <p>Contribute two hours each month towards helping keep the Center clean and functioning. In-person: cleaning, sweeping, front desk. Online: transcribing classes, tech support.</p>

                  <h4>3.6 Group Discussion Classes</h4>
                  <p>Held every 5–6 classes in place of the regular class. Two students lead the discussion. All students should review relevant pages beforehand.</p>

                  <h4>3.7 Attend Pujas</h4>
                  <p>Strongly encouraged to attend <em>Offering to the Spiritual Guide</em> (10th and 25th of each month) and <em>Melodious Drum Puja</em> (28th or 29th). Required when they coincide with FP class.</p>

                  <h4>3.8 Sit FP Exams</h4>
                  <p>Tests are conducted at the end of each section of a book. Results are confidential and primarily for the student's benefit.</p>

                  <h4>3.9 Help Develop KMC Williamsburg</h4>
                  <p>Attend weekly General Program classes and Saturday courses. This sets a good example, helps the Center develop, creates merit, and gives opportunities to explain Dharma to others.</p>

                  <h3>4. Class Structure</h3>
                  <ol>
                    <li>Introduction and preliminary meditation</li>
                    <li>Recitation of prayers (gradually from memory)</li>
                    <li>Guided meditation on last week's subject</li>
                    <li>Transmission and commentary of the text</li>
                    <li>Focused pair discussion (15–20 minutes)</li>
                    <li>Group discussion sharing conclusions (5–10 minutes)</li>
                    <li>Auspicious Prayers and Dedications</li>
                  </ol>

                  <h3>5. Student Etiquette</h3>
                  <ul>
                    <li>Arrive early, sign in, confirm your partner, then enter the meditation room in silence.</li>
                    <li>If arriving late during meditation, sit outside until it finishes. Enter the Late Arrivals section, then move to your regular seat when teaching begins.</li>
                    <li>Chant prayers at the same volume as the rest of the class.</li>
                    <li>Stay seated after class for announcements about rota and next class planning.</li>
                  </ul>

                  <h3>6. Admissions</h3>
                  <p>Contact <a href="mailto:fp@meditationinwilliamsburg.org">fp@meditationinwilliamsburg.org</a>. There is an option to trial the program for one month ($15/class for non-members). To officially begin, you must be an active member.</p>

                  <h3>7. Key Contacts</h3>
                  <p>Main contact: <a href="mailto:fp@meditationinwilliamsburg.org">fp@meditationinwilliamsburg.org</a><br />
                  Study Program Coordinator: <a href="mailto:study@meditationinnewyork.org">study@meditationinnewyork.org</a><br />
                  Education Program Coordinator: <a href="mailto:epc@meditationinnewyork.org">epc@meditationinnewyork.org</a></p>
                </div>
              )}

              {/* CONTACTS TAB */}
              {activeTab === 'contacts' && (
                <div className="fp-doc">
                  <h2>FP Administration Team</h2>
                  <div className="fp-contact-cards">
                    <div className="fp-contact-card">
                      <h4>FP Coordinator</h4>
                      <p className="fp-contact-name">Deanna Morea</p>
                      <a href="mailto:fp@meditationinwilliamsburg.org">fp@meditationinwilliamsburg.org</a>
                      <ul>
                        <li>Primary point of contact for enrolled students</li>
                        <li>Monitors attendance</li>
                        <li>Tracks summaries</li>
                        <li>Enforces suspensions</li>
                        <li>Manages rota assignments</li>
                        <li>Manages discussion class partners list</li>
                      </ul>
                    </div>
                    <div className="fp-contact-card">
                      <h4>Education Program Coordinator</h4>
                      <p className="fp-contact-name">Simone Barker</p>
                      <a href="mailto:education@meditationinnewyork.org">education@meditationinnewyork.org</a>
                      <p>Oversees the running of study programs, administers exams</p>
                    </div>
                    <div className="fp-contact-card">
                      <h4>Membership Department</h4>
                      <a href="mailto:membership@meditationinnewyork.org">membership@meditationinnewyork.org</a>
                      <p>Contact regarding anything financial as pertaining to membership</p>
                    </div>
                  </div>

                  <h2 style={{ marginTop: '48px' }}>Student Contact List</h2>
                  <p className="fp-doc-note">The student contact list and discussion partners are maintained in a shared spreadsheet:</p>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1CigXrC90KgsQ8KcIn8dkVwRdU5djkIku4g9SCA7poFY/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fp-doc-link"
                  >
                    Open Student Contact List &rarr;
                  </a>
                </div>
              )}

              {/* RESOURCES TAB */}
              {activeTab === 'resources' && (
                <div className="fp-doc">
                  <h2>Resources & Templates</h2>

                  <div className="fp-resource-section">
                    <h3>Class Summary Template</h3>
                    <p>After missing a class, copy the questions below into an email and send to <a href="mailto:fp@meditationinwilliamsburg.org">fp@meditationinwilliamsburg.org</a>:</p>
                    <div className="fp-template-box">
                      <p><strong>Q1:</strong> Share three points or themes that the text section covered (skip if no new pages were covered):</p>
                      <p>1.<br />2.<br />3.</p>
                      <p><strong>Q2:</strong> Share three points from the Teacher's commentary that engaged you most (skip if the recording was not available):</p>
                      <p>1.<br />2.<br />3.</p>
                    </div>
                  </div>

                  <div className="fp-resource-section">
                    <h3>Requesting & Thanking Mandalas</h3>
                    <p>It is customary to offer a requesting mandala when beginning the study of a new book, and a thanking mandala during the final dedication prayers when finishing a book.</p>

                    <h4>Requesting Mandala</h4>
                    <p>Replace the mandala offering in the opening prayers with the <a href="https://drive.google.com/file/d/17XP1BBdclkq-M9930lFik5sn3lL3wycK/view?usp=sharing" target="_blank" rel="noopener noreferrer">requesting mandala verse</a>.</p>

                    <h4>Thanking Mandala (allow 25 minutes)</h4>
                    <ol>
                      <li>Teacher reads final dedication from book</li>
                      <li><a href="https://drive.google.com/file/d/1Hn5XSioKO5aiZsRusAr4l6vdg4fkHECh/view?usp=sharing" target="_blank" rel="noopener noreferrer">Mandala offering (thanking verse)</a></li>
                      <li>Dedication Prayer from sadhana</li>
                      <li>Long Life Prayer for Spiritual Guide</li>
                      <li>Request to the Holy Spiritual Guide from Faithful Disciples Sadhana</li>
                      <li>1-minute recitation of Geshe-la's name mantra</li>
                      <li>Virtuous Tradition</li>
                      <li>Nine Line Migtsema</li>
                    </ol>

                    <h4>Offering the Khatag</h4>
                    <p>For both requesting and thanking mandalas, a Khatag (ceremonial silk scarf, found in the storeroom behind the office) is offered by a student. At "the precious elephant" in the verse, the student stands and makes three prostrations. They take the folded Khatag, hold it across their hands, and move in front of the Teacher with a slight bow. At "the ground sprinkled with perfume," the Teacher takes the Khatag, touches crowns with the student, and places it around their neck. The student walks backwards to their seat with hands in prayer position.</p>
                  </div>


                  <div className="fp-resource-section">
                    <h3>Discussion Class Questions</h3>
                    <a
                      href="https://docs.google.com/spreadsheets/d/1ALFWy6ltXn3Vryut1v1E8CjDUAxS1FYLV4U85AcdmBw/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fp-doc-link"
                    >
                      Open Discussion Questions Spreadsheet &rarr;
                    </a>
                  </div>
                </div>
              )}

              {/* EXAMS TAB */}
              {activeTab === 'exams' && (
                <div className="fp-doc">
                  <h2>Exam Guidelines for FP & TTP</h2>
                  <ul className="fp-exam-list">
                    <li>Exams are conducted every 100–140 pages of a book being studied.</li>
                    <li>Students are required to complete each exam to continue on a study program.</li>
                    <li>To qualify, you must be up to date with all class summaries. Email your class coordinator to discuss your status.</li>
                    <li>On the morning of the exam, the class coordinator emails the EPC with the list of qualifying students.</li>
                    <li>The EPC emails the exam and candidate numbers early the day of the exam.</li>
                    <li>While it is encouraged to take the exam during regular class time (6:00–9:00pm), those who can't may take it earlier that day.</li>
                    <li>Students have up to <strong>three hours</strong> to complete the exam.</li>
                    <li>Exams are <strong>closed book</strong>.</li>
                    <li>In-person students can take the exam at the Center from 6:45pm (Center closes at 9:00pm).</li>
                    <li>In extenuating circumstances (sickness, work, family), students can request an extension but must complete the exam at least 48 hours before the next class.</li>
                    <li>Send completed exams to <a href="mailto:exam@meditationinnewyork.org">exam@meditationinnewyork.org</a> — email body or Word doc only (no PDFs).</li>
                  </ul>
                </div>
              )}

            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default FPResourcesPage
