import { useState, useEffect } from "react";
import { images } from "./data/data";
import "./image-slider.scss";

/**
 * Image Slider Component
 *
 * Renders an automatic slideshow of images
 * *  This component displays a series of images in a slideshow format. 
 *  * The images automatically transition every 3 seconds via setInterval .
 *  * Users can also manually navigate through the slides using navigation dots.
 * Note: A small amount of state is used to track the current slide index.
 *
 * @returns {JSX.Element} The image slider component
 */
export default function ImageSlider() {
    const [slideIndex, setSlideIndex] = useState(0); // State to track the current slide index

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    
    return (
        <div className="slideshow-container">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`mySlides fade ${
                        index === slideIndex ? "active" : ""
                    }`} // Apply active class (visible) to the current slide
                >
                    <div className="number-text">
                        {index + 1} / {images.length} {/* Display slide number based on number of images */}
                    </div>
                    <img
                        className="slide-image"
                        src={image.src}
                        alt={image.alt}
                    />
                </div>
            ))}

            <div className="dots-container">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${
                            index === slideIndex ? "active" : ""
                        }`} // Apply active class (visible) to the current slide
                        onClick={() => setSlideIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}
