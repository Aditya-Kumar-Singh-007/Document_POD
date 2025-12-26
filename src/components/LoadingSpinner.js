import React from 'react';

const LoadingSpinner = ({ message = "Loading...", size = "md" }) => {
  const sizeClass = size === "lg" ? "spinner-border-lg" : size === "sm" ? "spinner-border-sm" : "";
  
  return (
    <div className="container mt-5 text-center">
      <div className={`spinner-border text-primary ${sizeClass}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h4 className="mt-3">{message}</h4>
    </div>
  );
};

export default LoadingSpinner;