import React, { useEffect, useState } from "react";
import { Route, Routes,useNavigate } from "react-router-dom";

import Analytics from "./Analytics";
import { GeneralContextProvider } from "./GeneralContext";
import Holdings from "./Holdings";
import Summary from "./Summary";
import WatchList from "./WatchList";

const Dashboard = () => {
  // track viewport width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const breakpoint = 850;

  const navigate = useNavigate();  // Move this line outside the second useEffect

  useEffect(() => {
    // Redirect to /dashboard when the page loads
    navigate('/dashboard');
  }, [navigate]);  // This will run once when the component mounts
  
  useEffect(() => {
    //  update state when window resizes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    

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
        {/*  render WatchList when screen width is above breakpoint */}
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
