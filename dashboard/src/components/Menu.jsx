import { LogOut, Menu as MenuIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 850);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener
    window.addEventListener("resize", checkMobile);
    
    // Handle clicks outside the dropdown to close it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // JWT logout implementation
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Redirect to login page
    window.location.href = 'https://stock-simulator-project.vercel.app/';
    console.log("Logged out successfully");
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const ProfileDropdown = () => (
    <div className="dropdown-menu">
      <button onClick={handleLogout} className="logout-button">
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </div>
  );

  // Mobile navigation menu
  const MobileNavMenu = () => (
    <div ref={mobileMenuRef} className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <Link to="/" className="mobile-nav-link" onClick={() => handleMenuClick(0)}>
            <span className={selectedMenu === 0 ? activeMenuClass : menuClass}>
              Dashboard
            </span>
          </Link>
        </li>
        <li>
          <Link to="/analytics" className="mobile-nav-link" onClick={() => handleMenuClick(1)}>
            <span className={selectedMenu === 1 ? activeMenuClass : menuClass}>
              Analytics
            </span>
          </Link>
        </li>
        <li>
          <Link to="/holdings" className="mobile-nav-link" onClick={() => handleMenuClick(2)}>
            <span className={selectedMenu === 2 ? activeMenuClass : menuClass}>
              Holdings
            </span>
          </Link>
        </li>
        <li>
          <Link to="/stocks" className="mobile-nav-link" onClick={() => handleMenuClick(3)}>
            <span className={selectedMenu === 3 ? activeMenuClass : menuClass}>
              Stocks
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );

  // If mobile view
  if (isMobile) {
    return (
      <div className="mobile-menu">
        <div className="mobile-header-left">
          <button onClick={handleMobileMenuToggle} className="menu-toggle-button">
            <MenuIcon size={24} />
          </button>
          <img src="./Stockifylogo.png" className="logo-small" alt="Logo" />
        </div>
        <div className="page-title">Dashboard</div>
        <div className="profile" ref={dropdownRef}>
          <div className="profile-container" onClick={handleProfileClick}>
            <div className="avatar">SU</div>
            <p className="username">USERID</p>
          </div>
          {isProfileDropdownOpen && <ProfileDropdown />}
        </div>
        <MobileNavMenu />
      </div>
    );
  }

  // Desktop view
  return (
    <div className="menu-container">
      <img src="./Stockifylogo.png" className="logo" alt="Logo" />
      <div className="menus">
        <ul>
          <li>
            <Link to="/dashboard" className="nav-link" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="nav-link" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Analytics
              </p>
            </Link>
          </li>
          <li>
            <Link to="/holdings" className="nav-link" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" ref={dropdownRef}>
          <div className="profile-container" onClick={handleProfileClick}>
            <div className="avatar">SU</div>
            <p className="username">USERID</p>
          </div>
          {isProfileDropdownOpen && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Menu;
