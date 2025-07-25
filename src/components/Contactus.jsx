import React, { useState } from 'react';
import { 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Box,
  TextField,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';
import Produc from './ProductsSection';
import OrderTracking from './OrderTracing';
//import CartPage from './CartPage';

const Header = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(240, 206, 206, 0.5), rgba(240, 206, 206, 0.5)), url('https://img.freepik.com/premium-photo/cosmetics-background-skincare-flat-lay-makeup-background_744724-3367.jpg?w=2000') no-repeat center center/cover`,
  height: 300,
  color: '#5b340a',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}));

const InfoBox = styled(Box)(({ theme }) => ({
    background: '#c4935f',
  color: 'white',
  width:'230px',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  height: '100%',
  '&:hover': {
    transform: 'scale(1.1)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',}
  }));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: '60px',
  color: 'rgba(255, 255, 255, 0.7)',
  marginBottom: '20px',
}));

const ContactFormContainer = styled(Paper)(({ theme }) => ({
  padding: '30px,20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  height: '100%',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ddd',
  },
  '& .MuiOutlinedInput-input': {
    padding: '15px',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: '#b37c42',
  color: 'white',
  padding: '12px',
  borderRadius: '5px',
  '&:hover': {
    background: '#995a17',
  }
}));

const MapContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  minHeight: '450px',
  borderRadius: '8px',
  overflow: 'hidden',
  '& iframe': {
    border: 0,
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 500,
  color: '#333',
  textAlign: 'center',
  margin: '40px 0',
}));

const ContactSection = styled(Box)(({ theme }) => ({
  padding:'30px',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#fffaf3',
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: '60px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const MapSection = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down('md')]: {
    minHeight: '300px',
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: '30px',
  backgroundColor: 'white',
}));

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(($$[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$$)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {
      name: formData.name.trim() === '',
      email: !validateEmail(formData.email),
      subject: formData.subject.trim() === '',
      message: formData.message.trim() === ''
    };
    
    setErrors(newErrors);
    
    // If form is valid
    if (!Object.values(newErrors).some(error => error)) {
      // Here you would normally send the data to your backend
      console.log('Form submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      // Show error message
      setSnackbar({
        open: true,
        message: 'Please fill all required fields correctly.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Box sx={{ bgcolor: '#fffaf3', minHeight: '100vh' }}>
      {/* Header Section */}
      <Header>
        <Typography variant="h3" component="h1" gutterBottom>Contact Us</Typography>
        <Typography variant="h6">Get In Touch With Thoori Cosmetics</Typography>
      </Header>

      {/* Contact Information */}
      <Container maxWidth="lg">
        <SectionTitle variant="h2">Get in Touch</SectionTitle>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <InfoBox>
              <IconWrapper>
                <LocationOnIcon sx={{ fontSize: 'inherit' }} />
              </IconWrapper>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>Our Location</Typography>
              <Typography>29, Roja street, Chrompet,Chennai-14</Typography>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoBox>
              <IconWrapper>
                <PhoneIcon sx={{ fontSize: 'inherit' }} />
              </IconWrapper>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>Phone Number</Typography>
              <Typography>+91 9003775731</Typography>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoBox>
              <IconWrapper>
                <EmailIcon sx={{ fontSize: 'inherit' }} />
              </IconWrapper>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>Email Us</Typography>
              <Typography>support@thooricosmetic.com</Typography>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoBox>
              <IconWrapper>
                <AccessTimeIcon sx={{ fontSize: 'inherit' }} />
              </IconWrapper>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>Working Hours</Typography>
              <Typography>Mon - Sat: 9:00 - 5:00</Typography>
            </InfoBox>
          </Grid>
        </Grid>

        {/* Contact Form & Map - Side by Side in one row */}
        <ContactSection>
          <MapSection>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95592511531695!3d-37.81720997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1e287fd%3A0xbeb3a74931e7c9e2!2sFederation+Square!5e0!3m2!1sen!2sau!4v1552288540417"
              width="100%"
              height="100%"
              allowFullScreen
              title="map"
            ></iframe>
          </MapSection>
          <FormSection>
            <Typography variant="h3" component="h2" gutterBottom sx={{ 
              color: '#333', 
              fontWeight: 500,
              fontSize: '32px',
              mb: 3
            }}>
              Send Us a Message
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <StyledTextField
                required
                fullWidth
                id="name"
                placeholder="Your Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                helperText={errors.name ? "Name is required" : ""}
              />
              <StyledTextField
                required
                fullWidth
                id="email"
                placeholder="Your Email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email ? "Please enter a valid email address" : ""}
              />
              <StyledTextField
                required
                fullWidth
                id="subject"
                placeholder="Your Subject"
                name="subject"
                variant="outlined"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                helperText={errors.subject ? "Subject is required" : ""}
              />
              <StyledTextField
                required
                fullWidth
                name="message"
                placeholder="Your Message"
                id="message"
                multiline
                rows={4}
                variant="outlined"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                helperText={errors.message ? "Message is required" : ""}
              />
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ py: 1.5 }}
              >
                Send Message
              </SubmitButton>
            </Box>
          </FormSection>
        </ContactSection>
      </Container>

      {/* Snackbar for form submission feedback */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactUs;

