import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-icon">
        ⚠️
      </div>
      <h1 className="error-title">404</h1>
      <h3 className="error-subtitle">Page Not Found</h3>
      <p className="error-text">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="error-actions">
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go Home
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;