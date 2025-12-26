import React from 'react';

const ErrorAlert = ({ error, onRetry, retryText = "Try Again" }) => {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
        {onRetry && (
          <button 
            className="btn btn-outline-danger"
            onClick={onRetry}
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;