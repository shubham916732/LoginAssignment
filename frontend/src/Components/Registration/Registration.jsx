import React, { useState } from 'react';
import './Registration.css';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', formData);
      alert('Registration successful! Redirecting to login...');
      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Registration</h1>
        <div className="input-box">
          <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
          <FaUserAlt className='icon' />
        </div>
        <div className="input-box">
          <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
          <FaUserAlt className='icon' />
        </div>
        <div className="input-box">
          <input type="text" name="phoneNumber" placeholder="Phone Number" required onChange={handleChange} />
          <FaUserAlt className='icon' />
        </div>
        <div className="input-box">
          <input type="text" name="email" placeholder="Email" required onChange={handleChange} />
          <FaUserAlt className='icon' />
        </div>
        <div className="input-box">
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <FaLock className='icon' />
        </div>
        <button type='submit'>Register</button>
        <div className="login-link">
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Registration;
