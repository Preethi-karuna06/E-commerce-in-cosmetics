import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = ({ userId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
  });
  const [error, setError] = useState('');

  // Fetch user data for the given userId
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`http://localhost:3001/api/users/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data);
      } catch (err) {
        setError('Error fetching user details');
      }
    };

    fetchUser();
  }, [userId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle form submission to update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:3001/api/users/admin/users/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onSave(formData); // Pass updated user data back to parent component
    } catch (err) {
      setError('Error updating user');
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="emailOrPhone"
          value={formData.emailOrPhone}
          onChange={handleChange}
          placeholder="Email or Phone"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditUser;
