import React from "react";
import { Route, Routes } from "react-router-dom";

import Analytics from "./Analytics";
import { GeneralContextProvider } from "./GeneralContext";
import Holdings from "./Holdings";
import Summary from "./Summary";
import WatchList from "./WatchList";



const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Summary />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/stocks" element={<WatchList />} />
          </Routes>
        </div>
      </GeneralContextProvider>
    </div>
  );
};

export default Dashboard;