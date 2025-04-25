import { useState, useEffect } from "react";
import { images } from "./data/data";
import "./image-slider.scss";

/**
 * Image Slider Component
 * 
 * Renders an automatic slideshow of images
 * @todo add further comment 
 * 
 * @returns {JSX.Element} The image slider component
 */
export default function ImageSlider() {
  const [slideIndex, setSlideIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div 
          key={index}
          className={`mySlides fade ${index === slideIndex ? 'active' : ''}`}
        >
          <div className="number-text">{index + 1} / {images.length}</div>
          <img className="slide-image" src={image.src} alt={image.alt} />
        </div>
      ))}
      
      <div className="dots-container">
        {images.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === slideIndex ? 'active' : ''}`}
            onClick={() => setSlideIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}