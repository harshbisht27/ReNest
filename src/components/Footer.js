import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Importing the icons
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="social-icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
        <div className="credits">
          <p>Re-Nest</p>
          <p>Copyright © 2024</p>
          <a href="/terms-of-use">Terms Of Use</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
        <div className="whatsapp">
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" alt="WhatsApp" className="whatsapp-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
