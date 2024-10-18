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
          src="https://www.shutterstock.com/shutterstock/videos/1108576655/preview/stock-footage-home-delivery-by-application-motorcycle-delivering-a-home-on-the-map.webm"
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