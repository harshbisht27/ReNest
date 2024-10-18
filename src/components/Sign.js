import React, { useState, useEffect } from 'react';
// import './SignUp.css';
import './Form.css'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import axios from 'axios';
import L from 'leaflet'; // Import Leaflet for custom marker icon
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles

// Custom hook to change the map view
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom); // Zoom level provided as a prop
  }, [center, zoom, map]);

  return null;
};

// Main Sign component
const Sign = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [currentPosition, setCurrentPosition] = useState([20.5937, 78.9629]); // Default map position (centered on India)
  const [zoomLevel, setZoomLevel] = useState(5); // Set initial zoom level

  // Custom marker icon
  const customMarkerIcon = new L.Icon({
    iconUrl: require('./assets/619 (1).png'), // Ensure this path is correct
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Anchor point of the icon
    popupAnchor: [1, -34], // Popup anchor point
  });
  const [step1, setStep1] = useState(1);
  const [items, setItems] = useState({
    clothes: 0,
    shoes: 0,
    books: 0,
    toys: 0,
    blankets: 0,
    electronics: 0,
    food: 0,
  });
  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Geocode the address using OpenCage API
  const geocodeAddress = () => {
    if (!formData.address) {
      alert('Please enter an address first.');
      return;
    }

    const address = encodeURIComponent(formData.address);
    const apiKey = '2a6a9bb6cbdb48779d51670d01e60a25'; // Add your OpenCage API key here

    axios
      .get(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${apiKey}`)
      .then((response) => {
        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry;
          setCurrentPosition([lat, lng]); // Update map position
          setZoomLevel(13); // Zoom in to the location
        } else {
          alert('Address not found. Please enter a valid address.');
        }
      })
      .catch((error) => {
        console.error('Error fetching location:', error);
        alert('Failed to retrieve location.');
      });
  };

  // Fetch user's current location using Geolocation API
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]); // Set map to user's location
          setZoomLevel(15); // Zoom in to the user's location with more precision
        },
        (error) => {
          console.error('Error fetching location:', error);
          alert('Failed to retrieve your location. Please ensure location services are enabled.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  const addItem = (item) => {
    setItems({
      ...items,
      [item]: items[item] + 1,
    });
  };
   // Decrease item count
   const removeItem = (item) => {
    if (items[item] > 0) {
      setItems({
        ...items,
        [item]: items[item] - 1,
      });
    }
  };

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
    setStep1(step1 + 1);
  };

  // Go back to the previous step
  const prevStep = () => {
    setStep(step - 1);
    setStep1(step1 + 1);
  };

  // Render each step of the form
  switch (step) {
    case 1:
      return (
        <div className="step1">
          <h2 className='till'>HELP US WITH YOUR EXACT LOCATION</h2>
            <h3>This allows us to check if your area  <br/>is within our coverage</h3>
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
          </label>
          
          <button type="button" onClick={geocodeAddress}>
            Show on Map
          </button>
          <h3>OR</h3>
          <button type="button" onClick={fetchLocation}>
            Use My Location
          </button>

          {/* Map rendering based on current position */}
          <MapContainer center={currentPosition} zoom={zoomLevel} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={currentPosition} icon={customMarkerIcon}>
              <Popup>Your selected location</Popup>
            </Marker>
            <ChangeView center={currentPosition} zoom={zoomLevel} /> {/* Update map view when location changes */}
          </MapContainer>

          <button onClick={nextStep}>Next</button>
        </div>
      );

      case 2:
        return (
          <div className="step2">
            <h2>HOW DO YOU WISH TO DONATE?</h2>
            {/* Option for Pickup from Doorstep */}
            <label>
              <input 
                type="radio" 
                name="donationMethod" 
                value="pickup" 
                onChange={(e) => setFormData({ ...formData, donationMethod: e.target.value })}
              /> 
              Pickup from doorstep
            </label>
            
            {/* Calendar for Pickup Date */}
            {formData.donationMethod === 'pickup' && (
              <div>
                <label>
                  Pickup Date:
                  <DatePicker
                    selected={formData.pickupDate}
                    onChange={(date) => setFormData({ ...formData, pickupDate: date })}
                    dateFormat="yyyy/MM/dd"
                    minDate={new Date()} // Ensures only future dates are selectable
                    placeholderText="Select a pickup date"
                  />
                </label>
               
                <label>
            Preferred Time:
            <DatePicker
              selected={formData.pickupTime}
              onChange={(time) => setFormData({ ...formData, pickupTime: time })}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60} // Only show hour intervals
              timeFormat="hh:mm aa" // 12-hour format with AM/PM
              dateFormat="hh:mm aa" // Displays only time in 12-hour format
              placeholderText="Select a preferred time"
              filterTime={(time) => {
                // Allow only times from 9 AM to 9 PM
                const hours = time.getHours();
                return hours >= 9 && hours <= 21; // 9 AM (9) to 9 PM (21)
              }}
              // Use the following to show only 9 AM to 9 PM options
              minTime={new Date().setHours(9, 0, 0)} // 9 AM
              maxTime={new Date().setHours(21, 0, 0)} // 9 PM
            />
          </label>
              </div>
            )}
            <h2>OR</h2>


            {/* Option for Drop off Yourself */}
            <label>
              <input 
                type="radio" 
                name="donationMethod" 
                value="dropoff" 
                onChange={(e) => setFormData({ ...formData, donationMethod: e.target.value })}
              /> 
              Drop off yourself
            </label>
            {/* Dropdown for Drop off Location */}
            {formData.donationMethod === 'dropoff' && (
              <div>
                <label>
                  Drop-off Location:
                  <select 
                    name="dropoffLocation" 
                    value={formData.dropoffLocation || ''} 
                    onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                  >
                    <option value="">Select a location</option>
                    <option value="center1">Donation Center 1</option>
                    <option value="center2">Donation Center 2</option>
                    <option value="center3">Donation Center 3</option>
                  </select>
                </label>
              </div>
            )}
            <div className='btn'>
            <button className='btn1' onClick={prevStep}>Back</button>
            <button className='btn2' onClick={nextStep}>Next</button>
            </div>
            
          </div>
        );
        case 3:
          const hasSelectedItems = Object.values(items).some(count => count > 0); // Check if any items are selected
        
          return (
            <div className="step3-container">
              {/* Left side: Donation items */}
              <div className="donation-selection">
                <h2>Pick Your Donation Items</h2>
        
                <div className="donation-items">
                  {Object.keys(items).map((item) => (
                    <div key={item} className="item-row">
                      <span className="item-name">{item.charAt(0).toUpperCase() + item.slice(1)}:</span>
                      <div className="item-controls">
                        <button onClick={() => removeItem(item)} className="remove-btn">
                          -
                        </button>
                        <span className="item-count">{items[item]}</span>
                        <button onClick={() => addItem(item)} className="add-btn">
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
        
                <div className="navigation-buttons">
                  <button onClick={prevStep} className="back-btn">Back</button>
                </div>
              </div>
        
              {/* Right side: Note and Proceed Button */}
              <div className="donation-note">
                <h3>NOTE:</h3>
                <p>You'll be emailed a list of verified NGOs based on your location and donation items.</p>
                <p>Please call and confirm the requirements/timings with the NGO you choose from the drop off list before your visit.</p>
                
        
                {/* Conditionally change "No Items" button to "Proceed" and move it below the note */}
                <button 
                  onClick={hasSelectedItems ? nextStep : () => setItems({ clothes: 0, shoes: 0, books: 0, toys: 0, blankets: 0, electronics: 0, food: 0 })}
                  className={hasSelectedItems ? "proceed-btn" : "no-items-btn"}
                  style={{ marginTop: '20px' }} // Add margin to give spacing
                >
                  {hasSelectedItems ? "Proceed" : "No Items"}
                </button>
              </div>
            </div>
          );
            
          case 4:
  return (
    <div className="step4-container">
      <h2>Donor Details</h2>

      {/* Donor Information Form */}
      <form className="donor-details-form">
        <label>
          
          <input
          placeholder='Name'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        
        <label>
          
          <input
          placeholder='Email:'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
           
          <input
          placeholder=' Mobile No:'
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </label>
  
        <div className="form-group">
          <label>
            
            <input
            placeholder='Address:'
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
           
          <input
          placeholder='Postal Code:'
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
          />
           <input
            placeholder='
            City:'
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
             
          </label>
        </div>
      </form>

      {/* Selected Donation Items */}
      <div className="selected-items">
        <h3>Selected Donation Items</h3>
        <div className="donation-items-summary">
          {Object.keys(items).map((item) => {
            if (items[item] > 0) {
              return (
                <div key={item} className="item-summary-row">
                  <span className="item-name">{item.charAt(0).toUpperCase() + item.slice(1)}:</span>
                  <span className="item-quantity">{items[item]}</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="navigation-buttons">
        <button onClick={prevStep} className="back-btn">Back</button>
        <button onClick={nextStep} className="submit-btn">Submit</button>
      </div>
    </div>
  );

  case 5:
    return (
      <div className="thank-you-container">
        <h2>Thank You!</h2>
        <p>"The best way to find yourself is to lose yourself in the service of others." – Mahatma Gandhi</p>
        <p>We will contact you soon!</p>
        <button onClick={() => {
          // Redirect to main page, you can replace '/' with your main page route
          window.location.href = '/';
        }} className="redirect-btn">
          Go to Main Page
        </button>
      </div>
    );
  

    default:
      return (
        <div>
          <h2>Something went wrong!</h2>
        </div>
      );
  }
};

export default Sign;