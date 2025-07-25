import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Paper,
  Grid,
  Container,
  Divider,
  CardMedia,
  Snackbar,
  Alert
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const steps = ['Review', 'Address', 'Payment'];

const CheckoutPage = () => {
  const { cartItems, getTotal, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [customer, setCustomer] = useState({
    firstName: '',
    phone: '',
    address: '',
    city: '',
    pin: '',
  });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  const validateAddress = () => {
    const newErrors = {};
    if (!customer.firstName.trim()) newErrors.firstName = 'Name is required';
    if (!/^\d{10}$/.test(customer.phone)) newErrors.phone = 'Valid 10-digit phone required';
    if (!customer.address.trim()) newErrors.address = 'Address is required';
    if (!customer.city.trim()) newErrors.city = 'City is required';
    if (!/^\d{6}$/.test(customer.pin)) newErrors.pin = 'Valid 6-digit PIN required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    console.log('Step:', activeStep);
    if (activeStep === 1 && !validateAddress()) return;
    if (activeStep === 2) {
      handlePlaceOrder();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePlaceOrder = async () => {
    console.log('Placing order...');

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      setSnackbar({ open: true, message: 'Please sign in first', severity: 'warning' });
      setTimeout(() => navigate('/signin'), 1500);
      return;
    }

    if (cartItems.length === 0) {
      setSnackbar({ open: true, message: 'Cart is empty. Please add items.', severity: 'warning' });
      return;
    }

    const payload = {
      products: cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: {
        street: customer.address,
        city: customer.city,
        state: 'N/A',
        zipCode: customer.pin,
        country: 'India',
      },
      paymentMethod: 'Cash on Delivery'
    };

    console.log('Payload:', payload);

    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        clearCart();
        setOrderPlaced(true);
        setSnackbar({ open: true, message: 'Order placed successfully!', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: data.message || 'Order failed', severity: 'error' });
      }
    } catch (err) {
      setLoading(false);
      console.error('Error placing order:', err);
      setSnackbar({ open: true, message: 'Something went wrong. Please try again.', severity: 'error' });
    }
  };

  const renderReview = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">🛒 Order Summary</Typography>
      <Divider sx={{ my: 2 }} />
      {cartItems.map((item, i) => (
        <Grid container spacing={2} alignItems="center" key={i} sx={{ mb: 2 }}>
          <Grid item xs={3}>
            <CardMedia
              component="img"
              height="60"
              image={item.image}
              alt={item.name}
              sx={{ objectFit: 'contain', borderRadius: 1, border: '1px solid #ccc' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>{item.name}</Typography>
            <Typography variant="body2">Qty: {item.quantity}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography align="right">₹{(item.price * item.quantity).toFixed(2)}</Typography>
          </Grid>
        </Grid>
      ))}
      <Divider sx={{ my: 2 }} />
      <Typography align="right" fontWeight="bold">
        Total: ₹{getTotal().toFixed(2)}
      </Typography>
    </Paper>
  );

  const renderAddress = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">📍 Delivery Address</Typography>
      <TextField
        label="Name"
        value={customer.firstName}
        onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
        error={!!errors.firstName}
        helperText={errors.firstName}
        fullWidth sx={{ my: 1 }}
      />
      <TextField
        label="Phone"
        value={customer.phone}
        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        error={!!errors.phone}
        helperText={errors.phone}
        fullWidth sx={{ my: 1 }}
      />
      <TextField
        label="Address"
        multiline
        rows={2}
        value={customer.address}
        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
        error={!!errors.address}
        helperText={errors.address}
        fullWidth sx={{ my: 1 }}
      />
      <TextField
        label="City"
        value={customer.city}
        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
        error={!!errors.city}
        helperText={errors.city}
        fullWidth sx={{ my: 1 }}
      />
      <TextField
        label="PIN Code"
        value={customer.pin}
        onChange={(e) => setCustomer({ ...customer, pin: e.target.value })}
        error={!!errors.pin}
        helperText={errors.pin}
        fullWidth sx={{ my: 1 }}
      />
    </Paper>
  );

  const renderPayment = () => (
    <Paper sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6">💵 Payment Method</Typography>
      <Typography sx={{ mt: 2 }}>Cash on Delivery</Typography>
    </Paper>
  );

  return (
    <Container sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      {orderPlaced ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            🎉 Order Placed!
          </Typography>
          <Typography variant="h6">Thank you for your purchase!</Typography>
          <Button onClick={() => navigate('/profile')} variant="contained" sx={{ mt: 3 }}>
            View My Orders
          </Button>
        </Paper>
      ) : (
        <Box>
          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            Current Step: {steps[activeStep]}
          </Typography>

          {activeStep === 0 && renderReview()}
          {activeStep === 1 && renderAddress()}
          {activeStep === 2 && renderPayment()}

          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {activeStep === steps.length - 1
              ? loading ? 'Placing...' : 'Place Order'
              : 'Continue'}
          </Button>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CheckoutPage;
