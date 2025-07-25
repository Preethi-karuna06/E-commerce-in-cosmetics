// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Rating } from '@mui/material';
import axios from 'axios';

const Profile = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;
      const res = await axios.get(`/api/users/${user._id}/orders`);
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>My Orders</Typography>
      {orders.map(order => (
        <Card key={order._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Order ID: {order._id}</Typography>
            <Typography>Total: ₹{order.totalAmount}</Typography>
            <Typography>Status: {order.orderStatus}</Typography>

            {order.products.map(p => (
              <Box key={p.product._id} mt={2}>
                <Typography>{p.product.name} x {p.quantity}</Typography>
                <Typography>Price: ₹{p.price}</Typography>
                {order.orderStatus === 'Delivered' && (
                  <Box mt={1}>
                    <Typography variant="body2">Write a review:</Typography>
                    <Rating />
                    <Button variant="outlined" size="small" sx={{ ml: 2 }}>Submit Review</Button>
                  </Box>
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Profile;
