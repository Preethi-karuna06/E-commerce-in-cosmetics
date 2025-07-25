// SignIn.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Apple,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Navbar color
const primaryColor = '#b37c42';

// Styled Components
const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: primaryColor,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: primaryColor,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: primaryColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: primaryColor,
    },
  },
});

const SignInButton = styled(Button)({
  backgroundColor: primaryColor,
  color: '#fff',
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#a76e34',
  },
});

const SocialButton = styled(Button)({
  borderColor: primaryColor,
  color: primaryColor,
  textTransform: 'none',
  fontWeight: 500,
  marginRight: '8px',
  '&:hover': {
    backgroundColor: 'rgba(179, 124, 66, 0.08)',
    borderColor: primaryColor,
  },
});

const UserTypeContainer = styled(Box)({
  marginTop: '16px',
  marginBottom: '16px',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  backgroundColor: '#f9f9f9'
});

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [userType, setUserType] = useState('user');
  
  // Get the previous location from state or default to home
  const from = location.state?.from?.pathname || '/';
  
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    emailOrPhone: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    emailOrPhone: false,
    password: false,
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
    const storedUserType = localStorage.getItem('userType');

    if (storedEmail && storedPassword) {
      setFormData({
        emailOrPhone: storedEmail,
        password: storedPassword,
        rememberMe: storedRememberMe,
      });
    }
    
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const validateEmail = (emailOrPhone) => {
    if (!emailOrPhone) return 'Email or Phone is required';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    return '';
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    const newValue = name === 'rememberMe' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (touched[name]) {
      if (name === 'emailOrPhone') {
        setErrors((prev) => ({
          ...prev,
          emailOrPhone: validateEmail(value),
        }));
      } else if (name === 'password') {
        setErrors((prev) => ({
          ...prev,
          password: validatePassword(value),
        }));
      }
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    
    // If admin is selected, pre-fill with admin credentials
    if (event.target.value === 'admin') {
      setFormData(prev => ({
        ...prev,
        emailOrPhone: '',
        password: ''  // Leave password empty for security
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    if (field === 'emailOrPhone') {
      setErrors((prev) => ({
        ...prev,
        emailOrPhone: validateEmail(formData.emailOrPhone),
      }));
    } else if (field === 'password') {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(formData.password),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailError = validateEmail(formData.emailOrPhone);
    const passwordError = validatePassword(formData.password);

    setErrors({
      emailOrPhone: emailError,
      password: passwordError,
    });

    setTouched({
      emailOrPhone: true,
      password: true,
    });

    if (emailError || passwordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Handle admin login (hardcoded credentials)
      if (userType === 'admin') {
        // Check if the admin credentials match
        if (formData.emailOrPhone === 'Preethi_k' && formData.password === 'admin123') {
          // Create admin user object
          const adminUser = {
            id: 'admin',
            firstName: 'Preethi',
            lastName: 'K',
            emailOrPhone: 'Preethi_k',
            role: 'admin'
          };
          
          // Store admin info
          localStorage.setItem('token', 'admin-token');
          localStorage.setItem('user', JSON.stringify(adminUser));
          
          if (formData.rememberMe) {
            localStorage.setItem('email', formData.emailOrPhone);
            localStorage.setItem('password', formData.password);
            localStorage.setItem('rememberMe', formData.rememberMe.toString());
            localStorage.setItem('userType', userType);
          }
          
          // Show success message
          setSnackbarMessage('Admin login successful! Redirecting...');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          
          // Navigate to admin dashboard after 1.5 seconds
          setTimeout(() => {
            navigate('/admin');
          }, 1500);
        } else {
          throw new Error('Invalid admin credentials');
        }
      } else {
        // Regular user login via API
        console.log('Attempting login with:', {
          emailOrPhone: formData.emailOrPhone,
          password: formData.password
        });
        
        const response = await axios.post('http://localhost:3001/api/users/login', {
          emailOrPhone: formData.emailOrPhone,
          password: formData.password
        });

        console.log('Login response:', response.data);

        // Handle successful login
        if (formData.rememberMe) {
          localStorage.setItem('email', formData.emailOrPhone);
          localStorage.setItem('password', formData.password);
          localStorage.setItem('rememberMe', formData.rememberMe.toString());
          localStorage.setItem('userType', userType);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('userType');
        }

        // Store the authentication token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        console.log('Stored token:', response.data.token);
        console.log('Stored user:', response.data.user);

        // Show success message
        setSnackbarMessage('Login successful! Redirecting...');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        // Navigate to the previous page or home after 1.5 seconds
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Show error message
      const errorMsg = error.response?.data?.message || error.message || 'Login failed. Please check your credentials.';
      setSnackbarMessage(errorMsg);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#f5efe6',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            bgcolor: 'white',
          }}
        >
          {/* Logo */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <img 
              src="/path-to-your-logo.png" 
              alt="Logo" 
              style={{ height: '50px' }}
            />
          </Box>

          {/* Welcome Text */}
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              color: '#333',
              fontWeight: 600,
              mb: 3
            }}
          >
            Welcome Back
          </Typography>
          
          {/* User Type Selection */}
          <UserTypeContainer>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: primaryColor, fontWeight: 500 }}>
                Login as
              </FormLabel>
              <RadioGroup 
                row 
                name="userType" 
                value={userType} 
                onChange={handleUserTypeChange}
              >
                <FormControlLabel 
                  value="user" 
                  control={
                    <Radio 
                      sx={{
                        color: primaryColor,
                        '&.Mui-checked': {
                          color: primaryColor,
                        },
                      }}
                    />
                  } 
                  label="User" 
                />
                <FormControlLabel 
                  value="admin" 
                  control={
                    <Radio 
                      sx={{
                        color: primaryColor,
                        '&.Mui-checked': {
                          color: primaryColor,
                        },
                      }}
                    />
                  } 
                  label="Admin" 
                />
              </RadioGroup>
            </FormControl>
          </UserTypeContainer>

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate>
            <StyledTextField
              fullWidth
              label={userType === 'admin' ? "Admin Username" : "Email Address or Phone"}
              name="emailOrPhone"
              type="text"
              value={formData.emailOrPhone}
              onChange={handleChange}
              onBlur={() => handleBlur('emailOrPhone')}
              error={touched.emailOrPhone && Boolean(errors.emailOrPhone)}
              helperText={touched.emailOrPhone && errors.emailOrPhone}
              margin="normal"
              required
              sx={{ mb: 2 }}
              disabled={isSubmitting}
              placeholder={userType === 'admin' ? "Enter admin username" : "Enter email or phone"}
            />

            <StyledTextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              required
              disabled={isSubmitting}
              placeholder={userType === 'admin' ? "Enter admin password" : "Enter your password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={isSubmitting}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                my: 2
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    sx={{
                      color: primaryColor,
                      '&.Mui-checked': {
                        color: primaryColor,
                      },
                    }}
                  />
                }
                label="Remember me"
              />
              <Button 
                sx={{ 
                  color: primaryColor,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  }
                }}
                disabled={isSubmitting}
              >
                Forgot Password?
              </Button>
            </Box>

            <SignInButton 
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mb: 3 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </SignInButton>

            {userType === 'user' && (
              <>
                <Divider sx={{ mb: 3 }} />

                {/* Social Login Buttons */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 1,
                    mb: 3
                  }}
                >
                  <SocialButton variant="outlined" startIcon={<Google />} disabled={isSubmitting}>Google</SocialButton>
                  <SocialButton variant="outlined" startIcon={<Facebook />} disabled={isSubmitting}>Facebook</SocialButton>
                  <SocialButton variant="outlined" startIcon={<Apple />} disabled={isSubmitting}>Apple</SocialButton>
                </Box>
              </>
            )}

            <Typography 
              align="center" 
              sx={{ color: '#666' }}
            >
              {userType === 'user' ? "Don't have an account?" : "Need a regular account?"}{' '}
              {userType === 'user' ? (
                <Button 
                  component={Link}
                  to="/Signup"
                  sx={{ 
                    color: primaryColor,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    }
                  }}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              ) : (
                <Button 
                  onClick={() => setUserType('user')}
                  sx={{ 
                    color: primaryColor,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    }
                  }}
                  disabled={isSubmitting}
                >
                  Switch to User Login
                </Button>
              )}
            </Typography>
          </form>
        </Paper>

        {/* Footer Text */}
        <Typography 
          align="center" 
          sx={{ 
            mt: 3,
            color: '#666',
            fontSize: '0.875rem'
          }}
        >
          By continuing, you agree to our{' '}
          <Button 
            component={Link}
            to="/termsandcondition"
            sx={{ 
              color: primaryColor,
              textTransform: 'none',
              padding: 0,
              minWidth: 'auto',
              fontWeight: 'normal',
              fontSize: 'inherit',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              }
            }}
          >
            Terms of Service
          </Button>
          {' '}and{' '}
          <Button 
            component={Link}
            to="/privacypolicy"
            sx={{ 
              color: primaryColor,
              textTransform: 'none',
              padding: 0,
              minWidth: 'auto',
              fontWeight: 'normal',
              fontSize: 'inherit',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              }
            }}
          >
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
      </Snackbar>*
    </Box>
  );
};

export default SignIn;
