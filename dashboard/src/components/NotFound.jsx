import React from "react";
import "./NotFound.css"; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <div className="not-found-message">
          <h2>Page Not Found</h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
        </div>
        <button 
          onClick={() => window.location.href = "/dashboard"}
          className="not-found-button"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
