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
          <p className="lead mb-4">Trade stocks to practice with real-time insights</p>
          <div className="row">
            <div className="col-md-6 mb-3">
              <ul className="list-unstyled">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Investment Simulator - Practice trading with ₹50,000 virtual funds</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Live Stock Watchlist - Monitor real-time stock prices</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Buy & Sell Stocks - Simulate real trades with a simple UI</li>
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
