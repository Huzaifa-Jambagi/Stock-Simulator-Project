import React from 'react';

const Awards = () => {
  return (
    <div className='container'>
      <div className="row mt-5 align-items-center">
        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
          <img src='assets/largestBroker.PNG' alt="Largest Broker Award" className="img-fluid" />
        </div>
        <div className="col-lg-6 col-md-12">
          <h1 className="mb-3">Your Gateway to Smarter Trading</h1>
          <p className="lead mb-4">Trade stocks, options, and ETFs with real-time insights</p>
          <div className="row">
            <div className="col-md-6 mb-3">
              <ul className="list-unstyled">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Futures & Options-Trade F&O with live analytics</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Commodity Derivatives - Trade gold, silver, and more</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>AI Stock Predictions - Get AI-backed stock suggestions</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Portfolio Tracking - Track your investments in real-time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;