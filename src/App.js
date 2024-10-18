import React from 'react';
import './App.css';
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import NGO from './components/NGO';
import Video from './components/Video';
import Footer from './components/Footer';



function App() {
  return (
    <div className="App">
      <Navbar /> {/* Add Navbar component here */}

      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      {/* <ImageCarousel /> */}
      <section id="services"><Services /></section>
      <section id="videoSection"><NGO/></section>
      <section id="analysis"><Video /></section>
      
      <section id="contactUs"><Footer /></section>
    </div>
  );
}

export default App;
