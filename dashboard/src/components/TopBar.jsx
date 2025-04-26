import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="sensex">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{`24,039.2`}</p>
          <p className="percent"></p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{`79,212.5`}</p>
          <p className="percent"></p>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default TopBar;