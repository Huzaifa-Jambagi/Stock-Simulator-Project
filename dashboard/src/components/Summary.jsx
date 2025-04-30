import axios from "axios";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [user, setUser] = useState(null); // To store user data (name, balance)

  useEffect(() => {
    // Fetching holdings data
    axios
      .get('https://backend-stockify.onrender.com/api/holdings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setHoldings(res.data))
      .catch((err) => console.error("Error fetching holdings:", err));

    // Fetching user data (name and balance)
    axios
      .get(https://backend-stockify.onrender.com/api/users/details', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  let totalInvestment = 0;
  let currentValue = 0;

  for (let i = 0; i < holdings.length; i++) {
    const qty = holdings[i].qty ?? 0;
    const avg = holdings[i].avg ?? 0;
    const price = holdings[i].price ?? 0;

    totalInvestment += qty * avg;
    currentValue += qty * price;
  }

  const profit = currentValue - totalInvestment;
  const profitPercent = totalInvestment ? (profit / totalInvestment) * 100 : 0;
  const pnlClass = profit >= 0 ? "profit" : "loss";

  const doughnutData = {
    labels: holdings.map((h) => h.name),
    datasets: [
      {
        data: holdings.map((h) => (h.qty ?? 0) * (h.price ?? 0)),
        backgroundColor: [
         "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
        "#FFB6C1", "#FFD700", "#8A2BE2", "#A52A2A", "#5F9EA0", "#D2691E",
        "#6495ED", "#DC143C", "#00BFFF", "#FF1493", "#228B22", "#B8860B",
        "#8B008B", "#A9A9A9", "#32CD32", "#B0C4DE", "#800000", "#FFD700",
        "#ADFF2F", "#7B68EE"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {user && (
        <div className="username">
          <h6>Hi, {user.name}!</h6>
          <h6>Available Balance: ₹{user.balance.toFixed(2)}</h6> {/* Displaying balance */}
          <hr className="divider" />
        </div>
      )}

      <div className="holdings-section">
        <h3 className="title">Holdings ({holdings.length})</h3>

        <div className="row summary">
          <div className="col">
            <h5>₹{totalInvestment.toFixed(2)}</h5>
            <p>Investment</p>
          </div>
          <div className="col">
            <h5>₹{currentValue.toFixed(2)}</h5>
            <p>Current Value</p>
          </div>
          <div className="col">
            <h5 className={pnlClass}>
              ₹{profit.toFixed(2)} ({profitPercent.toFixed(2)}%)
            </h5>
            <p>P&L</p>
          </div>
        </div>

        <div className="donut-chart" style={{ maxWidth: "400px", margin: "20px auto" }}>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
