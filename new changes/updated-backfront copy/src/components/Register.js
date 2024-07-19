import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous errors
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    axios.post('http://localhost:5000/register', 
      { username, email, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        console.log('Success:', response.data);
        if (response.data.message) {
          alert(response.data.message);
          onClose();
        } else if (response.data.error) {
          handleBackendErrors(response.data.error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Registration Failed. Please try again.');
      });
  };

  const handleBackendErrors = (errorResponse) => {
    if (errorResponse.includes('Username must be')) {
      setUsernameError(errorResponse);
    } else if (errorResponse.includes('Invalid email')) {
      setEmailError(errorResponse);
    } else if (errorResponse.includes('Password must be')) {
      setPasswordError(errorResponse);
    } else {
      setError(errorResponse);
    }
  };

  return (
    <div className="Register-overlay">
      <div className="Register-content">
        <button className="Rclose-button" onClick={onClose}>X</button>
        <h2>Register Here!</h2>
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
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
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
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="Register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
