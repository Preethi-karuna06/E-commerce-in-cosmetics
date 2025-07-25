import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Typography, Button, Paper, Container, Grid, Divider
} from '@mui/material';
import { useCart } from '../context/CartContext';

const OrderForm = () => {
  const { cartItems, getTotal } = useCart();
  const [step, setStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [customer, setCustomer] = useState({
    firstName: '',
    phone: '',
    address: '',
    pin: ''
  });

  // Side effect for logging or future actions
  useEffect(() => {
    if (step === 2) {
      console.log("Customer confirmed details:", customer);
    }
  }, [step]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!customer.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!customer.phone.match(/^\d{10}$/)) newErrors.phone = 'Enter valid 10-digit phone number';
    if (!customer.address.trim()) newErrors.address = 'Address is required';
    if (!customer.pin.match(/^\d{6}$/)) newErrors.pin = 'Enter valid 6-digit PIN code';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validateForm()) return;
    setStep(2);
    setIsEditing(false);
  };

  const renderCustomerFields = () => (
    <>
      <TextField
        label="First Name"
        name="firstName"
        fullWidth
        sx={{ mb: 2 }}
        value={customer.firstName}
        onChange={handleChange}
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label="Phone Number"
        name="phone"
        fullWidth
        sx={{ mb: 2 }}
        value={customer.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
      />
      <TextField
        label="Address"
        name="address"
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
        value={customer.address}
        onChange={handleChange}
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        label="PIN Code"
        name="pin"
        fullWidth
        sx={{ mb: 2 }}
        value={customer.pin}
        onChange={handleChange}
        error={!!errors.pin}
        helperText={errors.pin}
      />
    </>
  );

  return (
    <Container maxWidth="sm" sx={{ py: 4}}>
      {step === 1 && (
        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fefaf4' }}>
          <Typography variant="h5" gutterBottom>
            Order Details
          </Typography>
          {renderCustomerFields()}
          <Button
            variant="contained"
            fullWidth
            onClick={handleConfirm}
            sx={{background:"#b37c42"}}
          >
            Confirm
          </Button>
        </Paper>
      )}

      {step === 2 && (
        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fff8f0' }}>
          <Typography variant="h5" gutterBottom>
            Review Order
          </Typography>

          {!isEditing ? (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography><strong>Name:</strong> {customer.firstName}</Typography>
                <Typography><strong>Phone:</strong> {customer.phone}</Typography>
                <Typography><strong>Address:</strong> {customer.address}</Typography>
                <Typography><strong>PIN:</strong> {customer.pin}</Typography>
                <Button
                  variant="text"
                  onClick={() => setIsEditing(true)}
                  sx={{ mt: 1 }}
                >
                  Edit Address
                </Button>
              </Box>
            </>
          ) : (
            <>
              {renderCustomerFields()}
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 2 }}
                onClick={handleConfirm}
              >
                Save
              </Button>
            </>
          )}

          <Divider sx={{ my: 2 }} />

          {cartItems.map(item => (
            <Box key={item.id} sx={{ mb: 1 }}>
              <Grid container justifyContent="space-between">
                <Grid item xs={6}>{item.name} × {item.quantity}</Grid>
                <Grid item>Rs. {(item.quantity * item.price).toFixed(2)}</Grid>
              </Grid>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" align="right">
            Total: Rs. {getTotal().toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => alert('Redirect to payment')}
          >
            Proceed to Payment
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default OrderForm;
