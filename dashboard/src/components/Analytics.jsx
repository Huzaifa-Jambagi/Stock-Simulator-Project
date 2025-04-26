import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Analytics.css"; // ✅ make sure to create and import this CSS file
import GeneralContext from "./GeneralContext";

const Analytics = () => {
  const { analyticsData } = useContext(GeneralContext);

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Stock Analytics</h2>
      {!analyticsData ? (
        <p className="no-selection">No stock selected. Go to Available Stocks and click Analytics.</p>
      ) : (
        <div className="analytics-card">
          <h3 className="stock-symbol">{analyticsData.symbol}</h3>
          <div className="analytics-grid">
            <p><strong>Current Price:</strong> ₹{analyticsData.currentPrice}</p>
            <p><strong>Previous Price:</strong> ₹{analyticsData.previousPrice}</p>
            <p><strong>Daily Change:</strong> {analyticsData.dailyChangePercent}</p>
            <p><strong>High / Low:</strong> {analyticsData.highLow}</p>
            <p><strong>Book Value:</strong> ₹{analyticsData.bookValue}</p>
            <p><strong>PE Ratio:</strong> {analyticsData.peRatio}</p>
            <p><strong>ROE:</strong> {analyticsData.roe}</p>
            <p><strong>Market Cap:</strong> {analyticsData.marketCap}</p>
          </div>
        </div>
      )}
      <Link to={"/"} className="btn btn-green back-btn">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default Analytics;
