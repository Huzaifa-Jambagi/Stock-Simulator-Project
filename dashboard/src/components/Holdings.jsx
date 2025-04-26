import axios from "axios";
import React, { useEffect, useState } from "react";

const Holdings = () => {
  const [allHoldings, setallHoldings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/holdings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setallHoldings(res.data);
      })
      .catch((error) => console.error("Error fetching holdings:", error));
  }, []);

  let totalInvestment = 0;
  let currentValue = 0;

  for (let i = 0; i < allHoldings.length; i++) {
    const qty = allHoldings[i].qty ?? 0;
    const avg = allHoldings[i].avg ?? 0;
    const price = allHoldings[i].price ?? 0;

    totalInvestment += qty * avg;
    currentValue += qty * price;
  }

  const profitLoss = currentValue - totalInvestment;
  let profitLossPercent = totalInvestment !== 0 ? (profitLoss / totalInvestment) * 100 : 0;

  const pnlClass = profitLoss >= 0 ? "profit" : "loss";

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const avg = stock.avg ?? 0;
              const price = stock.price ?? 0;
              const qty = stock.qty ?? 0;
              const currValue = price * qty;
              const isProfit = currValue - avg * qty >= 0.0;
              const netChange = avg !== 0 ? ((price - avg) / avg) * 100 : 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = netChange < 0 ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name || "N/A"}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{currValue.toFixed(2)}</td>
                  <td className={profClass}>{(currValue - avg * qty).toFixed(2)}</td>
                  <td className={dayClass}>{netChange.toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 📊 Proper dynamic values here */}
      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{currentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={pnlClass}>
            {profitLoss.toFixed(2)} ({profitLossPercent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
