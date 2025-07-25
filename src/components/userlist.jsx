import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, TextField, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editedUser, setEditedUser] = useState(null);  // To manage user being edited
  const [newUserDetails, setNewUserDetails] = useState({
    firstName: '',
    lastName: '',
    emailOrPhone: ''
  });

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/users');
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user action
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId)); // Remove user from the state
    } catch (err) {
      setError('Error deleting user');
    }
  };

  // Handle edit user action
  const handleEditClick = (user) => {
    setEditedUser(user);
    setNewUserDetails({
      firstName: user.firstName,
      lastName: user.lastName,
      emailOrPhone: user.emailOrPhone
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setNewUserDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditSave = async () => {
    try {
      const updatedUser = {
        firstName: newUserDetails.firstName,
        lastName: newUserDetails.lastName,
        emailOrPhone: newUserDetails.emailOrPhone
      };

      const response = await axios.put(`http://localhost:3001/api/admin/users/${editedUser._id}`, updatedUser);
      setUsers(users.map(user => user._id === editedUser._id ? response.data : user));
      setEditedUser(null); // Clear the edit state after saving
    } catch (err) {
      setError('Error updating user');
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      {error && <p>{error}</p>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan="3">No users found</TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.emailOrPhone}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(user)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user._id)} color="secondary">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {editedUser && (
        <div style={{ marginTop: '20px' }}>
          <h3>Edit User</h3>
          <TextField
            label="First Name"
            name="firstName"
            value={newUserDetails.firstName}
            onChange={handleEditChange}
            style={{ marginBottom: '10px', width: '200px' }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={newUserDetails.lastName}
            onChange={handleEditChange}
            style={{ marginBottom: '10px', width: '200px' }}
          />
          <TextField
            label="Mobile Number"
            name="emailOrPhone"
            value={newUserDetails.emailOrPhone}
            onChange={handleEditChange}
            style={{ marginBottom: '20px', width: '200px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditSave}
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
