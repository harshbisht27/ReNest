import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const images = [
  {
    url: 'https://www.nest.ngo/images/banner3.jpg',
  },
  {
    url: 'https://i.pinimg.com/564x/c2/37/26/c2372669289d396504010d13fccad28c.jpg',
  },
  {
    url: 'https://static.wixstatic.com/media/f0ceae_67c94f86abce426a91553d372d5289da~mv2.jpg',
  },
  {
    url: 'https://samarthfoundation.org/assets/img/slidercolor.jpg',
  },
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = images.length;

  // Clone the first and last slides for infinite loop effect
  const clonedImages = [images[totalSlides - 1], ...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(totalSlides);
    } else if (currentIndex === totalSlides + 1) {
      setCurrentIndex(1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="about-container">
      <div className="about-box">
        <h1 className="about-heading">What We Offer</h1>
        <div className="underline"></div>

        <p>
          ReNest believes we all have that inner voice that makes us feel guilty whenever we throw away or abandon something we no longer use, but which could benefit someone in need. Whether it's clothes that no longer fit, childhood storybooks, or outdated furniture, we ensure these items find new homes where they can be given a second life.
        </p>

        <div className="carousel-container">
          <div className="carousel-wrapper">
            <button onClick={goToPrevious} className="left-arrow">
              &#10094;
            </button>
            <div className="carousel-content-wrapper">
              <div
                className="carousel-content"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {clonedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Slide ${index + 1}`}
                    className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
            <button onClick={goToNext} className="right-arrow">
              &#10095;
            </button>
          </div>
          <div className="carousel-thumbnails">
            {images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${index + 1 === currentIndex ? 'active-thumbnail' : ''}`}
                onClick={() => goToSlide(index + 1)}
              >
                <img src={image.url} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
