// filepath: /C:/Users/frile/team32_project/src/components/Home/Home.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../LoginForm/LoginForm';
import { useAuth } from '../../hooks/useAuth';
import './home.scss';

const Home = () => {
  const { isLoggedIn, isInitialised } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();
  
  // splash screen triggers a redirect after 4.5 seconds for logged in users
  useEffect(() => {
    let timer;
    if (isLoggedIn) {
      setShowSplash(true);
      timer = setTimeout(() => {
        setShowSplash(false);
        router.push('/chat');
      }, 4500);
    }
    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  if (!isInitialised) {
    return null;
  }

  if (!isLoggedIn) {
    return <LoginForm />;
  }

  
  return (
    <div className="container">
      {showSplash ? (
        <div className="splash-screen">
          {/* background */}
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  '--size': `${Math.random() * 10 + 5}px`,
                  '--delay': `${Math.random() * 2}s`,
                  '--duration': `${2 + Math.random() * 3}s`,
                  '--posX': `${Math.random() * 100}%`,
                  '--posY': `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* main elements */}
          <div className="content">
            <p className="subtitle animate-subtitle">
              Nottingham Watsonx Assistant
            </p>
            <div className="progress-bar animate-progress">
              <div className="progress-fill" />
            </div>
            <div className="team animate-team">Powered by Team 32</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;