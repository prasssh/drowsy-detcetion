import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './UserDashboard.css';
import user1 from '../images/user1.png';
import sleep1 from '../images/sleep1.jpg';
import sleep2 from '../images/sleep2.jpg';
import sleep3 from '../images/sleep3.jpg';

const UserProfile = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [userData, setUserData] = useState({});
  const [settingsVisible, setSettingsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get('http://localhost:5000/profile', {
          withCredentials: true,
          params: { username }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleCameraAccess = () => {
    setCameraActive(true);
  };

  const handleCloseCamera = async () => {
    try {
      await fetch('http://127.0.0.1:5000/stop_camera', { method: 'POST' });
      setCameraActive(false);
    } catch (error) {
      console.error("Failed to stop the camera", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      localStorage.removeItem('username');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleSettingsClick = () => {
    setSettingsVisible(true);
  };

  const handleCloseSettings = () => {
    setSettingsVisible(false);
  };

  const Settings = ({ onClose }) => {
    const [formData, setFormData] = useState({
      Name: '',
      email: '',
      address: '',
      contactNumber: '',
      vehicleNumber: '',
      password: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSave = () => {
      console.log('Saving profile:', formData);
      alert('Profile updated successfully!');
      onClose();
    };

    return (
      <div className="settings-overlay">
        <div className="edit-profile">
          <h2>Edit profile</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="save-button" onClick={handleSave}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="profile">
          <img src={user1} alt="Profile" />
          <h2>{userData.username}</h2>
        </div>
        <nav className="menu">
          <Link to="/" className="menu-item">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <a href="" className="menu-item" onClick={handleSettingsClick}>
            <FontAwesomeIcon icon={faUserEdit} /> Edit Profile
          </a>
          <a href="/" className="menu-item" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </a>
        </nav>
      </aside>
      <main className="main-content">
        <section className="profile-details">
          <h2>User Profile</h2>
          <div className="profile-info">
            <div className="profile-item">
              <span className="label">Name:</span>
              <span className="value">{userData.username}</span>
            </div>
            <div className="profile-item">
              <span className="label">Email:</span>
              <span className="value">{userData.email}</span>
            </div>
            <div className="profile-item">
              <span className="label">Address:</span>
              <span className="value">{userData.address}</span>
            </div>
            <div className="profile-item">
              <span className="label">Phone Number:</span>
              <span className="value">{userData.contactNumber}</span>
            </div>
            <div className="profile-item">
              <span className="label">Vehicle Number:</span>
              <span className="value">{userData.vehicleNumber}</span>
            </div>
          </div>
        </section>
        <section className="sleep-records">
          <h2>Driver's Sleep Records</h2>
          <div className="records">
            <div className="record">
              <img src={sleep1} alt="Sleep Record 1" />
              <p>Date: 2023-10-01<br />Time: 00:00</p>
            </div>
            <div className="record">
              <img src={sleep2} alt="Sleep Record 2" />
              <p>Date: 2023-10-02<br />Time: 14:00</p>
            </div>
            <div className="record">
              <img src={sleep3} alt="Sleep Record 3" />
              <p>Date: 2023-10-03<br />Time: 10:15</p>
            </div>
          </div>
        </section>
        <section className="camera-section">
          <h2>Camera Access</h2>
          {cameraActive ? (
            <div>
              <button onClick={handleCloseCamera} className="btn">Close Camera</button>
              <img src="http://127.0.0.1:5000/video_feed" alt="Access Your Camera Here" />
            </div>
          ) : (
            <button onClick={handleCameraAccess} className="btn">Open Camera</button>
          )}
        </section>
      </main>
      {settingsVisible && <Settings onClose={handleCloseSettings} />}
    </div>
  );
};

export default UserProfile;
