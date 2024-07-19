import React, { useState } from 'react';
import './Home.css';
import backgroundImage from '../images/bgg.png'; // Ensure this path is correct
import hoveredImage from '../images/bggg.png'; // Path to the hovered image
import Navbar from './Navbar'; // Import Navbar component
import Login from './Login'; // Import Login component

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <header
      className="header"
      style={{
        backgroundImage: `url(${isHovered ? hoveredImage : backgroundImage})`
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Navbar onLoginClick={handleLoginClick} transparent={true} /> 
      <h1 className="header-title"></h1>
      {showLogin && <Login onClose={handleCloseLogin} />}
    </header>
  );
};

export default Header;
