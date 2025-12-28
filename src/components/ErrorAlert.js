import React from 'react';

const ErrorAlert = ({ error, onRetry, retryText = "Try Again" }) => {
  return (
    <div className="container">
      <div className="alert alert-danger">
        <h4>Error!</h4>
        <p>{error}</p>
        {onRetry && (
          <button className="btn btn-danger" onClick={onRetry}>
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;