// client/src/components/OrderTracking.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Card,
  CardContent,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  LocalShipping,
  Inventory,
  CheckCircle,
  Home
} from '@mui/icons-material';
import axios from 'axios';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Define steps based on order status
  const getSteps = () => {
    return ['Placed', 'Processing', 'Shipped', 'Delivered'];
  };
  
  // Get current step number based on status
  const getStepNumber = (status) => {
    const steps = getSteps();
    return steps.indexOf(status);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get icon for status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Placed':
        return <Inventory />;
      case 'Processing':
        return <Inventory />;
      case 'Shipped':
        return <LocalShipping />;
      case 'Delivered':
        return <Home />;
      default:
        return <CheckCircle />;
    }
  };
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        // Get auth token from local storage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`/api/orders/${orderId}/track`, {
          headers: {
            'x-auth-token': token
          }
        });
        
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError(error.response?.data?.message || 'Failed to load order details');
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#4b2e1e' }}>
        Track Your Order
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Order Date
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {formatDate(orderDetails.orderDate)}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Current Status
              </Typography>
              <Chip
                label={orderDetails.orderStatus}
                color={
                  orderDetails.orderStatus === 'Delivered' ? 'success' :
                  orderDetails.orderStatus === 'Shipped' ? 'primary' :
                  orderDetails.orderStatus === 'Processing' ? 'warning' : 'default'
                }
                sx={{ fontWeight: 'bold' }}
              />
            </Grid>
            
            {orderDetails.trackingNumber && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tracking Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {orderDetails.trackingNumber}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Order Status Stepper */}
        {orderDetails.orderStatus !== 'Cancelled' && (
          <Stepper 
            activeStep={getStepNumber(orderDetails.orderStatus)} 
            alternativeLabel
            sx={{ mb: 4 }}
          >
            {getSteps().map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
        
        {/* Tracking History */}
        <Typography variant="h6" gutterBottom sx={{ color: '#4b2e1e' }}>
          Tracking History
        </Typography>
        
        <List>
          {orderDetails.trackingHistory.map((event, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                <Box sx={{ mr: 2, color: '#4b2e1e' }}>
                  {getStatusIcon(event.status)}
                </Box>
                <ListItemText
                  primary={event.status}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {event.location}
                      </Typography>
                      <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'block' }}>
                        {formatDate(event.timestamp)}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < orderDetails.trackingHistory.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: '#4b2e1e' }}>
            Delivery Information
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your order will be delivered according to the selected shipping method. You will receive a notification when your order is out for delivery.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            For any questions about your delivery, please contact our customer service.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderTracking;
