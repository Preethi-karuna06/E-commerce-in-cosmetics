import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import {
  Visibility,
  Lock,
  Share,
  Gavel,
  Security,
  Sync,
  Email,
  LocationOn,
  AccessTime,
  ContactSupport,
} from '@mui/icons-material';

const policyPoints = [
  {
    icon: <Visibility sx={{ color: '#b1763c', mr: 1 }} />,
    title: '1. Information We Collect',
    content: 'We collect your name, email, phone number, shipping address, and order details when you use our site.',
  },
  {
    icon: <Lock sx={{ color: '#b1763c', mr: 1 }} />,
    title: '2. Data Protection',
    content: 'We take data security seriously. Your information is encrypted and stored securely.',
  },
  {
    icon: <Share sx={{ color: '#b1763c', mr: 1 }} />,
    title: '3. Information Sharing',
    content: 'We do not sell or share your data with third parties, except when required for order fulfillment or legal compliance.',
  },
  {
    icon: <Gavel sx={{ color: '#b1763c', mr: 1 }} />,
    title: '4. Consent',
    content: 'By using our services, you agree to the collection and use of your data as outlined in this policy.',
  },
  {
    icon: <Security sx={{ color: '#b1763c', mr: 1 }} />,
    title: '5. Cookies',
    content: 'We use cookies to enhance user experience and track website analytics. You can disable cookies in your browser settings.',
  },
  {
    icon: <Sync sx={{ color: '#b1763c', mr: 1 }} />,
    title: '6. Data Retention',
    content: 'We retain your personal data only as long as necessary for processing orders and maintaining records.',
  },
  {
    icon: <Email sx={{ color: '#b1763c', mr: 1 }} />,
    title: '7. Email Communications',
    content: 'We may send order updates or promotions. You can unsubscribe anytime using the link in our emails.',
  },
  {
    icon: <LocationOn sx={{ color: '#b1763c', mr: 1 }} />,
    title: '8. Location Data',
    content: 'We may collect general location data to improve our service experience and shipping accuracy.',
  },
  {
    icon: <AccessTime sx={{ color: '#b1763c', mr: 1 }} />,
    title: '9. Policy Updates',
    content: 'We may update this policy as needed. Continued use of our site signifies your agreement to the new terms.',
  },
  {
    icon: <ContactSupport sx={{ color: '#b1763c', mr: 1 }} />,
    title: '10. Contact Us',
    content: 'For questions or concerns about your data, contact us at support@thoori.com.',
  },
];

const PrivacyPolicy = () => {
  return (
    <Box sx={{ bgcolor: '#fdf8f3', minHeight: '100vh', pb: 10 }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: '#b1763c',
          py: 6,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Your privacy is important to us at THOORI Cosmetics
        </Typography>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ mt: 6 }}>
        {policyPoints.map((section, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              p: 4,
              mb: 4,
              backgroundColor: '#fffaf3',
              transition: '0.3s ease',
              border: '1px solid #e0d4c0',
              '&:hover': {
                backgroundColor: '#f1e9df',
                borderColor: '#b1763c',
                boxShadow: 6,
                transform: 'scale(1.02)',
              },
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              {section.icon}
              <Typography variant="h6" fontWeight="bold" color="#9c6b34">
                {section.title}
              </Typography>
            </Box>
            <Typography variant="body1">{section.content}</Typography>
          </Paper>
        ))}

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © 2025 THOORI Cosmetics. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
