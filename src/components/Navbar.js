import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import "../App.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State for sidebar menu

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Toggle the sidebar menu
  };

  // Close the sidebar when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  let navbarClasses = ['navbar'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }

  return (
    <nav className={navbarClasses.join(' ')}>
      <div className="navbar-logo">
        <Link to="/">
          <img src="https://i.postimg.cc/66bLJbRs/remove-prev-ui.png" alt="nav"/>
        </Link>
      </div>
      
      {/* Hamburger icon for smaller screens */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>

      {/* Sidebar Menu */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/brand-campaigns" onClick={handleLinkClick}>Brand Campaigns</Link></li>
          <li><Link to="/get-involved" onClick={handleLinkClick}>Get Involved</Link></li>
          <li><Link to="/rewards" onClick={handleLinkClick}>Rewards</Link></li>
          <li><Link to="/about" onClick={handleLinkClick}>About Us</Link></li>
          <li><Link to="/contact" onClick={handleLinkClick}>Contact Us</Link></li>
        </ul>
      </div>

      <div className="navbar-actions">
        {/* You can include other actions here if needed */}
      </div>
    </nav>
  );
};

export default Navbar;
