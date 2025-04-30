import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home"; // Ensure this path is correct

function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      // Optional: Clean URL after storing token
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
