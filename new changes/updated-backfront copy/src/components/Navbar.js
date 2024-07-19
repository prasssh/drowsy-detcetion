import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../images/logo.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onLoginClick, customstyle }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust this value as needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${!isScrolled ? '' : 'navbar-solid'} ${customstyle}`}>
      <img src={logo} alt="Logo" className="navbar-logo" />
      <h1>   DriveEasy</h1>
      <div className="nav-links">
        <a href="/"><FontAwesomeIcon icon={faHome} /> Home</a>
        <a href="/about"><FontAwesomeIcon icon={faInfoCircle} /> About Us</a>
        <a href="#login" onClick={onLoginClick}><FontAwesomeIcon icon={faSignInAlt} /> Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
