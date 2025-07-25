// SignUp.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Alert,
  styled,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import {
  Visibility,
  VisibilityOff,
  Email,
  Phone,
  Person
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// Styled Components
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e6d4c3',
    },
    '&:hover fieldset': {
      borderColor: '#b37c42',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#b37c42',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#b37c42',
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: '#b37c42',
  color: 'white',
  padding: '12px 0',
  '&:hover': {
    backgroundColor: '#91581a',
  },
});

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get the previous location from state or default to home
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: ''
  });

  // Retrieve data from localStorage on component mount
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    if (storedFormData) {
      setFormData(storedFormData);
    }
  }, []);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.firstName) {
      tempErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName) {
      tempErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.emailOrPhone) {
      tempErrors.emailOrPhone = 'Email or phone number is required';
      isValid = false;
    } else if (formData.emailOrPhone.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.emailOrPhone)) {
        tempErrors.emailOrPhone = 'Invalid email format';
        isValid = false;
      }
    } else {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.emailOrPhone)) {
        tempErrors.emailOrPhone = 'Invalid phone number format';
        isValid = false;
      }
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send the FormData to the backend
      const response = await axios.post('http://localhost:3001/api/users/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailOrPhone: formData.emailOrPhone,
        password: formData.password
      });
  
      // Show success message
      setSnackbarMessage('Successfully Registered! Redirecting to sign in...');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Clear local storage after successful registration
      localStorage.removeItem('formData');
      
      // Navigate to sign in page after 2 seconds
      setTimeout(() => navigate('/signin'), 2000);
    } catch (error) {
      console.error(error);
      
      // Show error message
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      setSnackbarMessage(errorMsg);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const updatedData = { ...prevState, [name]: value };
      // Store form data in localStorage every time it changes
      localStorage.setItem('formData', JSON.stringify(updatedData));
      return updatedData;
    });
    
    // Clear the error for this field when the user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5efe6', display: 'flex', alignItems: 'center', py: 4 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2, bgcolor: 'white' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#b37c42', fontWeight: 600, mb: 4 }}>
            Create Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <StyledTextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#b37c42' }} />
                    </InputAdornment>
                  ),
                }}
                disabled={isSubmitting}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <StyledTextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#b37c42' }} />
                    </InputAdornment>
                  ),
                }}
                disabled={isSubmitting}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <StyledTextField
                fullWidth
                label="Email or Phone Number"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                error={Boolean(errors.emailOrPhone)}
                helperText={errors.emailOrPhone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {formData.emailOrPhone.includes('@') ? <Email sx={{ color: '#b37c42' }} /> : <Phone sx={{ color: '#b37c42' }} />}
                    </InputAdornment>
                  ),
                }}
                disabled={isSubmitting}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <StyledTextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" disabled={isSubmitting}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={isSubmitting}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <StyledTextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" disabled={isSubmitting}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={isSubmitting}
              />
            </Box>

            <SubmitButton 
              fullWidth 
              type="submit" 
              variant="contained" 
              sx={{ mt: 4, mb: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </SubmitButton>

            <Typography align="center" sx={{ color: '#666' }}>
              Already have an account?{' '}
              <Button 
                onClick={() => navigate('/signin')} 
                sx={{ 
                  color: '#b37c42', 
                  textTransform: 'none', 
                  '&:hover': { 
                    backgroundColor: 'transparent', 
                    textDecoration: 'underline' 
                  } 
                }}
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </Typography>
          </form>
        </Paper>

        <Typography align="center" sx={{ mt: 3, color: '#666', fontSize: '0.875rem' }}>
          By signing up, you agree to our{' '}
          <Button sx={{ color: '#b37c42', textTransform: 'none', padding: 0, minWidth: 'auto', fontWeight: 'normal', fontSize: 'inherit', '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}>
            Terms of Service
          </Button>{' '}
          and{' '}
          <Button sx={{ color: '#b37c42', textTransform: 'none', padding: 0, minWidth: 'auto', fontWeight: 'normal', fontSize: 'inherit', '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}>
            Privacy Policy
          </Button>
        </Typography>
      </Container>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUp;
