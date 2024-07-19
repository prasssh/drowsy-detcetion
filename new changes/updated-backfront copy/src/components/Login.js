import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/login',
      {username, password},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {
      if (response.data.message){
        console.log('Login Successful');
        navigate('/userdashboard');
        onClose();
      } else if(response.data.error){
        setError(response.data.error);
      }
    })
    .catch( error => {
      console.error('Error:', error);
      setError('Login failed. Please try again.');
    });


    // Simple example login logic
    if (username === 'user' && password === 'password') {
      // Successful login
      console.log('Login successful');
      navigate('/userdashboard');
      onClose(); // Close the login modal
    } else {
      // Invalid credentials
      setError('Invalid username or password');
    }
};


  return (
    <div className="login-overlay">
      <div className="login-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Enter your details here:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="loginn-button">Login</button>
        </form>
        <p className="register-prompt">
          Not a member? <a href="/register" className="register-link">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;