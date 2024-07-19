import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Wrapper = ({ children, handleLoginClick, handleRegisterClick }) => {
  const location = useLocation();
  const noNavFooterRoutes = ['/userdashboard', '/admindashboard', '/register']; // Add '/settings' to exclude list

  return (
    <>
      {!noNavFooterRoutes.includes(location.pathname) && (
        <Navbar onLoginClick={handleLoginClick} />
      )}
      {children}
      {!noNavFooterRoutes.includes(location.pathname) && (
        <Footer
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
        />
      )}
    </>
  );
};

export default Wrapper;
