import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Analytics from "./Analytics";
import { GeneralContextProvider } from "./GeneralContext";
import Holdings from "./Holdings";
import Summary from "./Summary";
import WatchList from "./WatchList";

const Dashboard = () => {
  // State to track viewport width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const breakpoint = 850;

  useEffect(() => {
    // Handler to update state when window resizes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Check if screen width is above breakpoint
  const showWatchList = windowWidth >= breakpoint;

  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        {/* Only render WatchList when screen width is above breakpoint */}
        {showWatchList && <WatchList />}
        
        <div className={`content ${!showWatchList ? "full-width" : ""}`}>
          <Routes>
            <Route exact path="/dashboard" element={<Summary />} />
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