import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-4">
            <i className="fas fa-exclamation-triangle fa-5x text-warning"></i>
          </div>
          <h1 className="display-4 text-muted">404</h1>
          <h3 className="mb-3">Page Not Found</h3>
          <p className="text-muted mb-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Go Home
            </button>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;