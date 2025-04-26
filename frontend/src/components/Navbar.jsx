import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
        !event.target.classList.contains('hamburger-btn')) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <nav className="navbar navbar-light border-bottom border-1">
      {/* Hamburger Menu Button - Fixed at Top Right */}
      <button
        className="hamburger-btn d-md-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        ☰
      </button>

      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Left Logo */}
        <Link style={{textDecoration:'none'}}to='/'>
        <div className="d-flex align-items-center">
          <img
            src="/Stockifylogo.png"
            alt="Stockify Logo"
            className="logo"
          />
          <span className="brand-name">Stockify</span>
        </div>
        </Link>

        {/* Desktop Login/Register Buttons */}
        <div className="d-none d-md-flex">
          <Link to='/register'>       
               <button className="login-btn me-2">Signup</button>
          </Link>
          <Link to='/login'>
          <button className="login-btn">Login</button>
          </Link>
        </div>
      </div>

      {/* Collapsible Mobile Menu - Appears from the right */}
      {isOpen && (
        <div className="mobile-menu right-menu" ref={menuRef}>
          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✖
          </button>
          <div className="mobile-menu-content">
          <Link to='/register'>       
               <button className="login-btn me-2">Signup</button>
          </Link>
          <Link to='/login'>
          <button className="login-btn">Login</button>
          </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;