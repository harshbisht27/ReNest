// src/components/NotFound.jsx
import React from 'react';
import './NotFound.css'; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! The page you're looking for does not exist.</p>
      <a href="/" className="back-home-link">Go Back Home</a>
    </div>
  );
};

export default NotFound;
