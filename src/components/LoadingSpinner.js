import React from 'react';

const LoadingSpinner = ({ message = "Loading...", size = "md" }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h4>{message}</h4>
    </div>
  );
};

export default LoadingSpinner;