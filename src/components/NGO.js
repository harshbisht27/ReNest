import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

const NGO = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set to true when the component is in view
          observer.disconnect(); // Stop observing once it's in view
        }
      });
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="ngo-section" ref={sectionRef}>
      <div className={`ngo-image-wrapper ${isVisible ? 'animate-left' : ''}`}>
        <img
          src="https://www.urmeengo.org/wp-content/uploads/2019/08/Best-out-of-Waste-1.jpg"
          alt="Child Education"
          className="ngo-image"
        />
      </div>
      <div className={`ngo-text-wrapper ${isVisible ? 'animate-right' : ''}`}>
        <h2>Best NGO for CSR in India: Mendu Rural Development Society</h2>
        <p>
          We are the best NGO in Delhi NCR and best NGO website India. We endeavor for holistic growth of the Nation and its people. We are the best Social Organization in Delhi NCR, India. Support by Donate to NGO or Donate to Poor. We mainly focus on poverty in India, Child Development, Women Empowerment, Skill Development, Education for poor & Street Children, Health programs, Environment protection, Consumer awareness, Elderly care, Rural development programs, Slum development, Donate for Livelihood, etc.
        </p>
        <p>
          We believe that each and every person is entitled to a worthy, meaningful, and dignified life just as mentioned under Article 21 (Right to life and personal liberty) of the Indian constitution.
        </p>
      </div>
    </section>
  );
};

export default NGO;
