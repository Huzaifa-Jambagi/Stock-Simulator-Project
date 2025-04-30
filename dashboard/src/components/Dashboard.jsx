import React, { useEffect, useState } from "react";
import { Route, Routes,useNavigate,useLocation } from "react-router-dom";

import Analytics from "./Analytics";
import { GeneralContextProvider } from "./GeneralContext";
import Holdings from "./Holdings";
import Summary from "./Summary";
import WatchList from "./WatchList";

const Dashboard = () => {
  // track viewport width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const breakpoint = 850;

  const navigate = useNavigate();  
   const location = useLocation();

  useEffect(() => {
    // Only redirect to /dashboard if the path is exactly "/"
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [location, navigate]); 
  
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
