import { useState, useEffect } from 'react';
import { fetchAnnouncements, Announcement } from '../utils/sheetsApi';

const bannerStyles: React.CSSProperties = {
  background: '#1a1a1a',
  color: 'white',
  padding: '12px 20px',
  textAlign: 'center',
  fontSize: '15px',
  fontWeight: 500,
  position: 'relative',
  zIndex: 1000,
};

const textStyles: React.CSSProperties = {
  margin: 0,
  lineHeight: 1.5,
};

const closeButtonStyles: React.CSSProperties = {
  position: 'absolute',
  right: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '4px 8px',
  lineHeight: 1,
};

function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load dismissed announcements from sessionStorage
    const savedDismissed = sessionStorage.getItem('dismissedAnnouncements');
    if (savedDismissed) {
      setDismissed(new Set(JSON.parse(savedDismissed)));
    }

    fetchAnnouncements()
      .then(setAnnouncements)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDismiss = (id: string) => {
    const newDismissed = new Set(dismissed);
    newDismissed.add(id);
    setDismissed(newDismissed);
    sessionStorage.setItem('dismissedAnnouncements', JSON.stringify([...newDismissed]));
  };

  if (loading) return null;

  // Filter out dismissed announcements
  const activeAnnouncements = announcements.filter(a => !dismissed.has(a.id));

  if (activeAnnouncements.length === 0) return null;

  return (
    <>
      {activeAnnouncements.map(announcement => (
        <div key={announcement.id} style={bannerStyles}>
          <p style={textStyles}>{announcement.text}</p>
          <button
            style={closeButtonStyles}
            onClick={() => handleDismiss(announcement.id)}
            aria-label="Dismiss announcement"
          >
            &times;
          </button>
        </div>
      ))}
    </>
  );
}

export default AnnouncementBanner;
