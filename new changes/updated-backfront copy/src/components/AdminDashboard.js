import React, { useState } from 'react';
import './AdminDashboard.css';
import AdminProfile from '../images/AdminProfile.png';
import sleep1 from '../images/sleep1.jpg';
import sleep2 from '../images/sleep2.jpg';
import sleep3 from '../images/sleep3.jpg';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    name: 'John Doe',
    address: '1234 Main St, Anytown, USA',
    contactNumber: '555-1234',
    password: 'password'
  });

  const handleAddUser = (user) => {
    setUsers([...users, user]);
    setIsModalOpen(false);
  };

  const handleProfileUpdate = (details) => {
    setAdminDetails(details);
    setIsEditProfileOpen(false);
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="logo">
          <img src={AdminProfile} alt="Admin Logo" className="logo-image" />
        </div>
        <ul>
          <li className="active"><a href="#">Dashboard</a></li>
          <li><a href="#" onClick={() => setIsEditProfileOpen(true)}>Edit profile</a></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </nav>
      <main className="main-content">
        <header>
          <div className="header-content">
            <h1>Welcome, Admin</h1>
            <div className="user-profile" onClick={() => setIsProfilePopupOpen(true)}>
              <img src={AdminProfile} alt="John Doe" />
              <span></span>
            </div>
          </div>
        </header>
        <section className="user-list">
          <div className="user-list-content">
            <h2>Existing Users list</h2>
            <ul>User1</ul>
            <ul>User2</ul>
            <ul>User3</ul>
            <ul>
              {users.map((user, index) => (
                <li key={index}>{user.name} ({user.email})</li>
              ))}
            </ul>
            <button onClick={() => setIsModalOpen(true)}>Add Users</button>
          </div>
        </section>
        <section className="sleep-records">
          <h2>User's Sleep Records</h2>
          <div className="records">
            <div className="record">
              <h1>User1</h1>
              <img src={sleep1} alt="Sleep Record 1" />
              <p>Date: 2023-10-01<br />Time: 00:00</p>
            </div>
            <div className="record">
              <h1>User2</h1>
              <img src={sleep2} alt="Sleep Record 2" />
              <p>Date: 2023-10-02<br />Time: 14:00</p>
            </div>
            <div className="record">
              <h1>User3</h1>
              <img src={sleep3} alt="Sleep Record 3" />
              <p>Date: 2023-10-03<br />Time: 10:15</p>
            </div>
          </div>
        </section>
      </main>
      {isModalOpen && (
        <UserFormModal onClose={() => setIsModalOpen(false)} onAddUser={handleAddUser} />
      )}
      {isEditProfileOpen && (
        <EditProfileForm onClose={() => setIsEditProfileOpen(false)} onSave={handleProfileUpdate} adminDetails={adminDetails} />
      )}
      {isProfilePopupOpen && (
        <ProfilePopup onClose={() => setIsProfilePopupOpen(false)} adminDetails={adminDetails} />
      )}
    </div>
  );
};

const UserFormModal = ({ onClose, onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({ name, email, address, contactNumber, vehicleNumber, password });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Vehicle Number</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="login-button">Add User</button>
            <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditProfileForm = ({ onClose, onSave, adminDetails }) => {
  const [name, setName] = useState(adminDetails.name);
  const [address, setAddress] = useState(adminDetails.address);
  const [contactNumber, setContactNumber] = useState(adminDetails.contactNumber);
  const [password, setPassword] = useState(adminDetails.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, address, contactNumber, password });
  };

  return (
    <div className="modal-overlay">
      <div className="modal edit-profile">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="login-button">Save</button>
            <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfilePopup = ({ onClose, adminDetails }) => {
  return (
    <div className="modal-overlay">
      <div className="modal profile-popup">
        <h2>Admin Details</h2>
        <p><strong>Name:</strong> {adminDetails.name}</p>
        <p><strong>Address:</strong> {adminDetails.address}</p>
        <p><strong>Contact Number:</strong> {adminDetails.contactNumber}</p>
        <p><strong>Password:</strong> {adminDetails.password}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
