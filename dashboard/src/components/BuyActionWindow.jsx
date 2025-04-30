import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyActionWindow.css";
import GeneralContext from "./GeneralContext";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeBuyWindow } = useContext(GeneralContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/stocks/${uid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStockPrice(res.data.currentPrice);
      } catch (err) {
        console.error("Failed to fetch stock price:", err);
      }
    };
    
    if (uid) {
      fetchStockPrice();
    }
  }, [uid]);
  
  const handleBuyClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token—please log in first");
      return;
    }
    
    try {
      await axios.post(
        "http://localhost:3002/api/transactions/buy",
        {
          symbol: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      closeBuyWindow();
      navigate("/holdings");
    } catch (error) {
      console.error("Order placement failed:", error.response || error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);  // <<< show the backend error message
      } else {
        alert("Something went wrong while buying the stock");
      }
    }
    
  };
  
  const handleCancelClick = () => {
    closeBuyWindow();
  };
  
  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              value={stockPrice}
              disabled // 👈 prevent manual typing
            />
          </fieldset>
        </div>
      </div>
      
      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <button className="btn btn-green" onClick={handleBuyClick}>Buy</button>
          <button className="btn btn-red" onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;