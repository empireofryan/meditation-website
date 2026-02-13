import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavProps {
  variant?: 'default' | 'about';
}

const Nav: React.FC<NavProps> = ({ variant = 'default' }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = variant === 'about'
    ? `nav about-nav${scrolled ? ' scrolled' : ''}`
    : `nav${scrolled ? ' scrolled' : ''}`;

  return (
    <nav className={navClass}>
      <Link to="/" className="logo">
        <span className="logo-main">KADAMPA MEDITATION CENTER</span>
        <span className="logo-sub">Williamsburg</span>
      </Link>
      <div className="nav-links">
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/membership" className="nav-link">Membership</Link>
        <Link to="/classes" className="nav-link">Classes</Link>
        <Link to="/#classes" className="cta-button-white">Schedule</Link>
      </div>
    </nav>
  );
};

export default Nav;
