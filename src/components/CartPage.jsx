// src/pages/CartPage.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField,
  Card,
  CardMedia,
  Paper,
  Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const [orderInstructions, setOrderInstructions] = useState('');
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  return (
    <Box sx={{ bgcolor: '#fff8f0', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            🛒 Your Cart
          </Typography>
          <Button
            component={Link}
            to="/products"
            sx={{
              color: '#b37c42',
              fontWeight: 'bold',
              textDecoration: 'underline',
              '&:hover': {
                textDecoration: 'none',
                background: 'transparent'
              }
            }}
          >
            Continue Shopping
          </Button>
        </Box>

        {cartItems.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary">
            Your cart is empty. Add something!
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Box>
                {cartItems.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: 'center',
                      gap: 2,
                      mb: 3,
                      p: 2,
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      backgroundColor: '#ffffff',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                  >
                    <Card sx={{ width: 100, height: 100, flexShrink: 0 }}>
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.name}
                        sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </Card>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight="bold" fontSize={16}>
                        {item.name}
                      </Typography>
                      <Typography color="text.secondary" fontSize={14}>
                        Rs. {Number(item.price).toFixed(2)}
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                          <AddIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => removeFromCart(item.id)}>
                          <DeleteOutlineIcon color="error" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography fontWeight="bold" sx={{ minWidth: 80 }}>
                      Rs. {(Number(item.price) * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Order Instructions */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6">📝 Special Instructions</Typography>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="E.g., Leave at door, call before delivery"
                  value={orderInstructions}
                  onChange={(e) => setOrderInstructions(e.target.value)}
                />
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: '#f5efe6', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  🧾 Order Summary
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Subtotal</Typography>
                  <Typography fontWeight="bold">Rs. {getTotal().toFixed(2)}</Typography>
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                  Tax included. Shipping calculated at checkout.
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  component={Link}
                  to="/order"
                  sx={{
                    bgcolor: '#b37c42',
                    color: '#fff',
                    py: 1.5,
                    fontWeight: 'bold',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                    '&:hover': {
                      bgcolor: '#9c6233'
                    }
                  }}
                >
                  Order Now
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
