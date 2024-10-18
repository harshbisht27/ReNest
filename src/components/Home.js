import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css';

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handlePickupClick = () => {
    navigate('/sign'); // Navigate to the Sign component when clicked
  };

  return (
    <div className="home">
      {/* Parallax Banner Section */}
      <section className="parallax-banner">
        <div className="banner-text">
          <h1>Spreading Smiles, Inspiring Happiness.</h1>
          <h2 className="subtitle">Ensuring Your Donations Reach the Right Hands.</h2>
          <button className="cta-button" onClick={handlePickupClick}>Book a Pickup ➜</button>
        </div>
      </section>

      {/* Cards Section */}
      <section className="cards-section">
        <h2>How We Work</h2>
        <div className="underline"></div> {/* Orange underline */}
        <div className="cards-container">
          <div className="card">
            <img src="https://shareatdoorstep.com/wp-content/uploads/2018/07/icon1-300x250.png" alt="Schedule Pickup" className="card-img" />
            <h3>Schedule a Pickup</h3>
            <p>Enter your location, schedule a pickup, and we’ll take care of the rest.</p>
          </div>
          <div className="card">
            <img src="https://shareatdoorstep.com/wp-content/uploads/2018/07/iconvannew-1-300x200.png" alt="Donate Doorstep" className="card-img" />
            <h3>Donate at your Doorstep</h3>
            <p>Simply pack your items, schedule a pickup, and we’ll ensure your donations reach those in need, supporting NGOs and community initiatives.</p>
          </div>
          <div className="card">
            <img src="https://shareatdoorstep.com/wp-content/uploads/2018/07/icon3-300x250.png" alt="Get Rewards" className="card-img" />
            <h3>Get Rewards</h3>
            <p>Our partners reward donors with gifts to thank you for your contributions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
