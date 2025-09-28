import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  return (
    <>
      <style>
        {`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px;
          }

          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #4ECDC4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          .spinner.small {
            width: 30px;
            height: 30px;
          }

          .spinner.medium {
            width: 50px;
            height: 50px;
          }

          .spinner.large {
            width: 80px;
            height: 80px;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .loading-message {
            margin-top: 15px;
            color: #666;
            font-size: 16px;
          }
        `}
      </style>
      <div className="loading-container">
        <div className={`spinner ${size}`}></div>
        <p className="loading-message">{message}</p>
      </div>
    </>
  );
};

export default LoadingSpinner;
