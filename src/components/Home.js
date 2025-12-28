import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextType from './TextType';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="home-container">
      <div>
        <h1 className="home-title">Welcome to Document POD</h1>
        <TextType 
          text={[
            "Your documents, simplified.",
            "Smart storage for smart work.", 
            "From chaos to clarity.",
            "One place for everything.",
            "Work faster. Store smarter."
          ]}
          as="p"
          className="home-tagline"
          typingSpeed={80}
          pauseDuration={2500}
          deletingSpeed={40}
          showCursor={true}
          cursorCharacter="|"
        />
      </div>
      
      <div className="home-buttons">
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => navigate('/signup')}
              className="btn btn-primary"
            >
              Get Started
            </button>
            
            <button
              onClick={() => navigate('/login')}
              className="btn btn-secondary"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/documents')}
              className="btn btn-success"
            >
              View Documents
            </button>
            
            <button
              onClick={() => navigate('/upload')}
              className="btn btn-primary"
            >
              Add Document
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;