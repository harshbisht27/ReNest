import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Video from './components/Video';
import Footer from './components/Footer';
import Sign from './components/Sign'; // Import the Sign component
import NGO from './components/NGO.js';

function App() {
  const location = useLocation(); // Get the current route

  return (
    <div className="App">
      {/* Always render the Navbar */}
      <Navbar />
      
      <Routes>
        {/* Define routes for each section or page */}
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} /> {/* Route for Sign component */}
      </Routes>

      {/* Only render other sections if the route is not /sign */}
      {location.pathname !== '/sign' && (
        <>
          <section id="about"><About /></section>
          {/* <ImageCarousel /> */}
          <section id="services"><Services /></section>
          <section id="videoSection"><NGO/></section>
          <section id="analysis"><Video /></section>
          <section id="contactUs"><Footer /></section>
        </>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}