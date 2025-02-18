"use client";

import { useState, useEffect } from 'react';
import ChatPage from '../../app/chat/page';
import LoginForm from '../LoginForm/LoginForm';
import { useAuth } from '../../hooks/useAuth';
import './home.scss';

const Home = () => {
  const { isLoggedIn } = useAuth();
  const [showChat, setShowChat] = useState(false);

  // Show chat after 4.5 seconds
  useEffect(() => {
    let timer;
    if (isLoggedIn) {
      // Reset chat view on new login
      setShowChat(false);
      timer = setTimeout(() => {
        setShowChat(true);
      }, 4500);
    }
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
        <LoginForm />
    );
  }

  return (
        <div className="container">
          {!showChat ? (
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
          ) : (
              <div className="chat-container animate-chat">
                <ChatPage />
              </div>
          )}
        </div>
    );
}

export default Home;