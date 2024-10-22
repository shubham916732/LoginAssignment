import './Profile.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId'); 

    const fetchUser = async () => {
      if (!userId) {
        navigate('/'); 
        return;
      }
      
      try {
        const response = await axios.get(`http://localhost:5000/user?userId=${userId}`);
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        navigate('/'); 
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); 

    try {
      await axios.put(`http://localhost:5000/user?userId=${userId}`, { ...formData, password: newPassword });
      setUser({ ...formData, password: newPassword }); 
      setIsEditing(false);
      setNewPassword(''); 
      alert('User details updated successfully!');
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update details. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId'); 
    navigate('/'); 
  };

  return (
    <div className='wrapper'>
      <h1>User Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div className="input-box">
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className="input-box">
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className="input-box">
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="input-box">
            <input 
              type="password" 
              placeholder="New Password" 
              value={newPassword} 
              onChange={handlePasswordChange} 
            />
          </div>
          <button type='submit'>Save Changes</button>
        </form>
      ) : (
        <div>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className='edit' onClick={() => setIsEditing(true)}>Edit Details</button>
        </div>
      )}
      <button className='logout' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
