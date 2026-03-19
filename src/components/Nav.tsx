import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavProps {
  variant?: 'default' | 'about';
}

const Nav: React.FC<NavProps> = ({ variant = 'default' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [logoWrapped, setLogoWrapped] = useState(false);
  const logoMainRef = useRef<HTMLSpanElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const checkLogoWrap = useCallback(() => {
    const el = logoMainRef.current;
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || el.offsetHeight;
      setLogoWrapped(el.scrollHeight > lineHeight * 1.5);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    const ro = new ResizeObserver(checkLogoWrap);
    if (logoMainRef.current) ro.observe(logoMainRef.current);
    checkLogoWrap();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ro.disconnect();
    };
  }, [checkLogoWrap]);

  const handleScheduleClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('classes');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      e.preventDefault();
      navigate('/#classes');
    }
  };

  const navClass = variant === 'about'
    ? `nav about-nav${scrolled ? ' scrolled' : ''}`
    : `nav${scrolled ? ' scrolled' : ''}`;

  return (
    <nav className={navClass}>
      <Link to="/" className={`logo${logoWrapped ? ' logo-wrapped' : ''}`}>
        <span className="logo-main" ref={logoMainRef}>KADAMPA MEDITATION CENTER</span>
        <span className="logo-sub">Williamsburg</span>
      </Link>
      <div className="nav-links">
        <Link to="/about" className={`nav-link${location.pathname === '/about' ? ' nav-link-active' : ''}`}>About</Link>
        <Link to="/membership" className={`nav-link${location.pathname === '/membership' ? ' nav-link-active' : ''}`}>Membership</Link>
        <Link to="/classes" className={`nav-link${location.pathname === '/classes' ? ' nav-link-active' : ''}`}>Classes</Link>
        <a href="/#classes" className="cta-button-white" onClick={handleScheduleClick}>Schedule</a>
      </div>
    </nav>
  );
};

export default Nav;
