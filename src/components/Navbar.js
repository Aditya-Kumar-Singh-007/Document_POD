import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authAction';


const Navbar = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;
        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const toggleMenu = () => {
    const navEl = navRef.current;
    if (!navEl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      navEl.style.height = calculateHeight() + 'px';
      navEl.querySelector('.card-nav-content').style.visibility = 'visible';
      navEl.querySelector('.card-nav-content').style.pointerEvents = 'auto';
    } else {
      setIsHamburgerOpen(false);
      setIsExpanded(false);
      navEl.style.height = '60px';
      navEl.querySelector('.card-nav-content').style.visibility = 'hidden';
      navEl.querySelector('.card-nav-content').style.pointerEvents = 'none';
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  useLayoutEffect(() => {
    const navEl = navRef.current;
    if (navEl) {
      navEl.style.height = '60px';
      navEl.style.overflow = 'hidden';
    }
  }, []);

  const navItems = [
    {
      label: 'Documents',
      bgColor: '#007bff',
      textColor: 'white',
      links: isAuthenticated ? [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'View All', href: '/documents' },
        { label: 'Upload New', href: '/upload' }
      ] : []
    },
    {
      label: 'Account',
      bgColor: '#28a745',
      textColor: 'white',
      links: isAuthenticated ? [
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/profile' }
      ] : [
        { label: 'Login', href: '/login' },
        { label: 'Sign Up', href: '/signup' }
      ]
    },
    {
      label: 'About',
      bgColor: '#6c757d',
      textColor: 'white',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ]
    }
  ];

  return (
    <>
      <div className="card-nav-container">
        <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`}>
          <div className="card-nav-top">
            <div
              className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              role="button"
              aria-label={isExpanded ? 'Close menu' : 'Open menu'}
              tabIndex={0}
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>

            <div className="logo-container">
              <Link to="/" style={{ textDecoration: 'none' , color: 'inherit'}}><span className="logo">Document POD</span></Link>
            </div>

            <div className="nav-top-actions">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="card-nav-cta-button">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="card-nav-cta-button" style={{marginRight: '0.5rem'}}>
                    Login
                  </Link>
                  <Link to="/signup" className="card-nav-cta-button">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="card-nav-content" aria-hidden={!isExpanded}>
            {isMobile ? (
              // Mobile unified card
              <div className="nav-unified-card">
                {navItems.map((item, idx) => (
                  <div key={`${item.label}-${idx}`} className="nav-section">
                    <div className="nav-section-header">{item.label}</div>
                    <div className="nav-section-links">
                      {item.links?.map((lnk, i) => (
                        <Link 
                          key={`${lnk.label}-${i}`} 
                          className="nav-section-link" 
                          to={lnk.href}
                          onClick={() => toggleMenu()}
                        >
                          {lnk.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop original cards
              navItems.slice(0, 3).map((item, idx) => (
                <div
                  key={`${item.label}-${idx}`}
                  className="nav-card"
                  ref={setCardRef(idx)}
                  style={{ backgroundColor: item.bgColor, color: item.textColor }}
                >
                  <div className="nav-card-label">{item.label}</div>
                  <div className="nav-card-links">
                    {item.links?.map((lnk, i) => (
                      <Link 
                        key={`${lnk.label}-${i}`} 
                        className="nav-card-link" 
                        to={lnk.href}
                        onClick={() => toggleMenu()}
                      >
                        ↗ {lnk.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </nav>
      </div>
      
      
    </>
  );
};

export default Navbar;