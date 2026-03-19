import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchAnnouncements } from '../utils/sheetsApi';
import type { Announcement } from '../utils/sheetsApi';

const bannerStyles: React.CSSProperties = {
  background: '#1a1a1a',
  color: 'white',
  padding: '14px 20px',
  textAlign: 'center',
  fontSize: '15px',
  fontWeight: 500,
  position: 'relative',
};

const textStyles: React.CSSProperties = {
  margin: 0,
  lineHeight: 1.6,
};

const linkStyles: React.CSSProperties = {
  color: '#ccc',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
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

// Parse markdown-style links [text](url) and line breaks
function parseAnnouncementText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Split by line breaks first
  const lines = text.split(/\\n|\n/);

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      parts.push(<br key={`br-${lineIndex}`} />);
    }

    // Match markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(line)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }

      const linkText = match[1];
      const url = match[2];

      // Use React Router Link for internal links, <a> for external
      if (url.startsWith('/')) {
        parts.push(
          <Link key={`link-${lineIndex}-${match.index}`} to={url} style={linkStyles}>
            {linkText}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={`link-${lineIndex}-${match.index}`}
            href={url}
            style={linkStyles}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last link
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }
  });

  return parts;
}

function updateBannerOffset(height: number) {
  document.documentElement.style.setProperty('--announcement-height', `${height}px`);
}

function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const measureHeight = useCallback(() => {
    if (containerRef.current) {
      updateBannerOffset(containerRef.current.offsetHeight);
    }
  }, []);

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

  // Measure banner height whenever active announcements change
  useEffect(() => {
    const activeCount = announcements.filter(a => !dismissed.has(a.id)).length;
    if (activeCount === 0) {
      updateBannerOffset(0);
      return;
    }
    // Measure after render
    requestAnimationFrame(measureHeight);
    window.addEventListener('resize', measureHeight);
    return () => window.removeEventListener('resize', measureHeight);
  }, [announcements, dismissed, measureHeight]);

  // Reset offset on unmount
  useEffect(() => {
    return () => updateBannerOffset(0);
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
    <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001 }}>
      {activeAnnouncements.map(announcement => (
        <div key={announcement.id} style={bannerStyles}>
          <p style={textStyles}>{parseAnnouncementText(announcement.text)}</p>
          <button
            style={closeButtonStyles}
            onClick={() => handleDismiss(announcement.id)}
            aria-label="Dismiss announcement"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}

export default AnnouncementBanner;
