import React, { useState, useEffect } from 'react';
import "../App.css"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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

  let navbarClasses = ['navbar'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }

  return (
    <nav className={navbarClasses.join(' ')}>
      <div className="navbar-logo">
      <img src="https://i.postimg.cc/66bLJbRs/remove-prev-ui.png" alt="nav"/>
      </div>
      <ul className="navbar-links">
        <li><a href="#">Brand Campaigns</a></li>
        <li><a href="#">Get Involved</a></li>
        <li><a href="#">Rewards</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
      <div className="navbar-actions">
        <a href="#" className="book-now-button">Book Now</a>
        <div className="user-icon">
          <i className="fas fa-user"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
