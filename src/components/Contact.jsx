import React, { useState } from 'react';
import './Contact.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert('Email sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Error sending email: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending email: ' + error.message);
    }
  };

  return (
    <div className="contact-section">
      <h1 className="main-title">Feel Free To Join Us</h1>
      <span className="title-underline"></span>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch With Us</h2>
          <p>We are the best NGO in Delhi NCR, India. We endeavor for holistic growth of the Nation and its people. We are the best Social Organisation in Delhi NCR, India.</p>

          {/* Social Media Icons */}
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-square" style={{ fontSize: '36px', color: '#3b5998' }}></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter-square" style={{ fontSize: '36px', color: '#1da1f2' }}></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram" style={{ fontSize: '36px', color: '#e1306c' }}></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin" style={{ fontSize: '36px', color: '#0077b5' }}></i>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Your Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">SEND</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
