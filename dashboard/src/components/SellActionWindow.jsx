import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeSellWindow } = useContext(GeneralContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/stocks/${uid}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setStockPrice(res.data.currentPrice);
      } catch (error) {
        console.error("Failed to fetch stock price:", error);
      }
    };
    fetchStockPrice();
  }, [uid]);

  const handleSellClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token—please log in first");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3002/api/transactions/sell",
        {
          stockName: uid,
          quantity: Number(stockQuantity),
          sellPrice: Number(stockPrice),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      closeSellWindow();
      navigate("/holdings");
    } catch (error) {
      console.error("Order placement failed:", error.response || error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);  // <<< show the backend error message
      } else {
        alert("Something went wrong while selling the stock");
      }
    }
    
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
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
              disabled // 👈🏼 making it static (user can't change manually)
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Proceeds ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <button className="btn btn-green" onClick={handleSellClick}>
            Sell
          </button>
          <button className="btn btn-red" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
