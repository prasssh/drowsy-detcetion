import React from 'react';
import './Footer.css';

const Footer = ({ onLoginClick, onRegisterClick }) => {
  return (
    <footer className="footer">
      <section className="register">
        <button className="register-button" onClick={onRegisterClick}>Register Now</button>
        <p>If you are already a member <a href="#login" onClick={onLoginClick}>Login</a></p>
      </section>
    </footer>
  );
}

export default Footer;