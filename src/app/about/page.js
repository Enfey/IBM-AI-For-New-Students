"use client";

import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function AboutPage() {

    const { isLoggedIn, isInitialised } = useAuth();
    const router = useRouter();
    const [slideIndex, setSlideIndex] = useState(0)

    useEffect(() => {
        if (isInitialised && !isLoggedIn) {
            router.replace('/'); // could redirect to /login in future and separate / from its component parts
        }
    }, [isInitialised, isLoggedIn, router]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="about-container">
            <div className="slideshow-container">
                <div className="mySlides fade" style={{ display: slideIndex === 0 ? 'block' : 'none' }} align="center">
                    <div className="number-text">1 / 3</div>
                    <img src="https://www.jyshare.com/wp-content/uploads/2017/01/img_mountains_wide.jpg" style={{ width: "100%", height: "20vh"}} />
                    <div className="slider-text"></div>
                </div>

                <div className="mySlides fade" style={{ display: slideIndex === 1 ? 'block' : 'none' }} align="center">
                    <div className="number-text">2 / 3</div>
                    <img src="https://www.jyshare.com/wp-content/uploads/2017/01/img_fjords_wide.jpg" style={{ width: "100%", height: "20vh"}} />
                    <div className="slider-text"></div>
                </div>

                <div className="mySlides fade" style={{ display: slideIndex === 2 ? 'block' : 'none' }} align="center">
                    <div className="number-text">3 / 3</div>
                    <img src="https://www.jyshare.com/wp-content/uploads/2017/01/img_nature_wide.jpg" style={{ width: "100%", height: "20vh"}} />
                    <div className="slider-text"></div>
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                {[0, 1, 2].map((index) => (
                    <span key={index} className={`dot ${index === slideIndex ? 'active' : ''}`}></span>
                ))}
            </div>
        </div>
    );
}