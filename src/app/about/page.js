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
        <div className="about-inner-container">
            <div className="slideshow-container">
                <div className="mySlides fade" style={{ display: slideIndex === 0 ? 'block' : 'none' }} align="center">
                    <div className="number-text">1 / 3</div>
                    <img className="slide-image" src="https://q8.itc.cn/images01/20240407/308db82405b547849a205cce9ec145b6.jpeg" style={{ width: "100%", height: "20vh"}} />
                </div>

                <div className="mySlides fade" style={{ display: slideIndex === 1 ? 'block' : 'none' }} align="center">
                    <div className="number-text">2 / 3</div>
                    <img className="slide-image" src="https://p5.itc.cn/images01/20231101/08fd94843fbd458591cecad5248a4bff.jpeg" style={{ width: "100%", height: "20vh"}} />
                </div>

                <div className="mySlides fade" style={{ display: slideIndex === 2 ? 'block' : 'none' }} align="center">
                    <div className="number-text">3 / 3</div>
                    <img className="slide-image" src="https://picx.zhimg.com/100/v2-f3758da8b7896ce36f2b886da5409af7_r.jpg" style={{ width: "100%", height: "20vh"}} />
                </div>

                <div style={{ textAlign: "center" }}>
                    {[0, 1, 2].map((index) => (
                        <span key={index} className={`dot ${index === slideIndex ? 'active' : ''}`}></span>
                    ))}
                </div>
            </div>

            <br/>
            <br/>

            <div className="about-us">
                <h2>About Us</h2>
                <p>
                    We are <strong>Team 32</strong>, a dedicated group of developers and AI enthusiasts working together to create innovative solutions for real-world problems. Our team is composed of talented individuals with diverse skill sets, united by a passion for technology and a commitment to excellence.
                </p>
                <br/>
                <div className="team-members">
                    <h3>Our Team</h3>
                    <ul>
                        <li><strong>Team Leader:</strong> Roberto Da Silva</li>
                        <li><strong>Group Admin:</strong> Oliver Fines</li>
                        <li><strong>Git Lead:</strong> Zefei Xie</li>
                        <li><strong>Core Members:</strong> Connor Saxton, Trey Kilian Alcantara, Felix Riley-Kay, Jeshuran Jebanesan, Parth Amreliya</li>
                    </ul>
                </div>
            </div>

            <br/>
            <br/>

            <div className="about-products">
                <h2>About Our Project</h2>
                <p>
                    <strong>AI for New Students</strong> is an intelligent chatbot designed to help freshmen quickly adapt to campus life. Developed by Team 32, this project leverages cutting-edge technologies to provide a seamless and personalized experience for new students.
                </p>
                <br/>
                <div className="project-details">
                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Personalized Assistance:</strong> Answers common questions about campus life, academics, and extracurricular activities.</li>
                        <li><strong>Smart Recommendations:</strong> Provides tailored suggestions based on individual preferences and needs.</li>
                        <li><strong>24/7 Availability:</strong> Always ready to help, day or night.</li>
                    </ul>
                </div>
                <br/>
                <div className="technology-stack">
                    <h3>Technology Stack</h3>
                    <ul>
                        <li><strong>AI Platform:</strong> Watsonx API</li>
                        <li><strong>Natural Language Processing (NLP):</strong> For understanding and generating human-like responses.</li>
                        <li><strong>Machine Learning:</strong> To improve recommendations and adapt to user behavior over time.</li>
                    </ul>
                </div>
                <p>
                    Our goal is to make the transition to university life as smooth as possible for new students, empowering them with the information and support they need to thrive.
                </p>
            </div>

            <br/>
        </div>
        </div>
    );
}