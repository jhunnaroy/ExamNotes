import { useState, useEffect } from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear all user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Optional: Call logout API to invalidate token
    // API.post("/auth/logout").catch(console.error);
    
    // Redirect to home/login page
    window.location.href = "/login";
  };

  const handleLogoClick = () => {
    window.location.href = "/dashboard";
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={handleLogoClick}>
          <span className="logo-icon"></span>
          <span className="logo-text">Task Manager</span>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {user && (
            <div className="user-info">
              <span className="user-name">
                <span className="user-icon">👤</span>
                {user.name || user.email?.split('@')[0]}
              </span>
            </div>
          )}
          
          <div className="nav-links">
            <button onClick={handleLogout} className="logout-btn">
              <span className="logout-icon">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;