import React from 'react';
import '../App.css';

const Video = () => {
  return (
    <div className="analysis-section">
      <h1 className="analysis-heading">Eco Friendly Delivery</h1>
      <div className="underline"></div>
      
      {/* Video Section */}
      <div className="video-container">
        <video
          className="delivery-video"
          src='https://download.shutterstock.com/gatekeeper/W3siZCI6ICJzaHV0dGVyc3RvY2stbWVkaWEiLCAiayI6ICJ2aWRlby8xMTA4NTc2NjU5L3ByZXZpZXcubXA0IiwgImUiOiAxNzI5MjczMTc0LCAibSI6IDF9LCAiOUp2T3JjRnVNZWJHcVZjY3NJQnhzcmh4T2FFIl0=/1108576659-preview.mp4'
          autoPlay
          loop
          muted
          controls
        />
      </div>
    </div>
  );
};

export default Video;
