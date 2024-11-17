import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Video from './components/Video';
import Footer from './components/Footer';
import Sign from './components/Sign'; // Ensure this is imported
import NGO from './components/NGO';
import NotFound from './components/NotFound'; // Import the NotFound component
import Contact from './components/Contact'; // Import the Contact component
import Chatbot from './components/Chatbot';

function App() {
  const location = useLocation(); // Get the current route

  return (
    <div className="App">
      <Navbar />
      
      <Routes>
        {/* Define routes for each section or page */}
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} /> {/* Add the Sign route */}
        <Route path="/contact" element={<Contact />} /> {/* Add the Contact route */}
        <Route path="/brand-campaigns" element={<NotFound />} />
        
        {/* Catch-all route for unmatched URLs */}
        <Route path="*" element={<NotFound />} /> {/* NotFound route */}
      </Routes>

      {/* Render other sections based on the current location */}
      {location.pathname !== '/sign' && location.pathname !== '/contact' && (
        <>
          <section id="about"><About /></section>
          <section id="services"><Services /></section>
          <Chatbot/>
          <section id="videoSection"><NGO /></section>
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
