import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/signin');
      return;
    }

    fetch(`http://localhost:3001/api/profile/${storedUser._id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData(data);
      });

    fetch(`http://localhost:3001/api/profile/${storedUser._id}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3001/api/profile/${user._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(updated => {
        setUser(updated);
        setEditing(false);
        alert('Profile updated!');
      });
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#fefaf4', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        My Profile
      </Typography>

      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#fff9f0' }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              disabled={!editing}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              disabled={!editing}
            />
            <TextField
              label="Email / Phone"
              name="emailOrPhone"
              value={formData.emailOrPhone || ''}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              disabled={!editing}
            />
            <TextField
              label="Address"
              name="address.street"
              value={formData.address?.street || ''}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, street: e.target.value }
                }))
              }
              fullWidth
              sx={{ mb: 2 }}
              disabled={!editing}
            />
            {editing ? (
              <Button variant="contained" onClick={handleUpdate} sx={{ bgcolor: '#4b2e1e' }}>
                Save
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setEditing(true)} sx={{ color: '#4b2e1e', borderColor: '#4b2e1e' }}>
                Edit Profile
              </Button>
            )}
          </Paper>
        </Grid>

        {/* Orders Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h6" mb={2}>
            My Orders
          </Typography>
          {orders.length === 0 ? (
            <Typography>No orders found.</Typography>
          ) : (
            orders.map(order => (
              <Paper key={order._id} sx={{ p: 2, mb: 3, bgcolor: '#fff' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Order #{order._id.slice(-6).toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {order.orderStatus} | Payment: {order.paymentStatus}
                </Typography>
                <Divider sx={{ my: 1 }} />
                {order.products.map((item, idx) => (
                  <Card key={idx} sx={{ display: 'flex', mb: 1 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 80, objectFit: 'contain' }}
                      image={`data:${item.product?.image?.contentType};base64,${btoa(
                        new Uint8Array(item.product?.image?.data?.data || []).reduce((data, byte) => data + String.fromCharCode(byte), '')
                      )}`}
                      alt={item.product?.title}
                    />
                    <CardContent>
                      <Typography>{item.product?.title}</Typography>
                      <Typography variant="body2">
                        Qty: {item.quantity} | ₹{item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Paper>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
