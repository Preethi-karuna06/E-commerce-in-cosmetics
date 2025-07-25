import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import {
  VerifiedUser,
  Gavel,
  WarningAmber,
  ShoppingBag,
  LocalShipping,
  Cached,
  Security,
  Payment,
  ContactSupport,
  Update,
} from '@mui/icons-material';

const termsData = [
  {
    icon: <VerifiedUser sx={{ color: '#b1763c', mr: 1 }} />,
    title: '1. Acceptance of Terms',
    content:
      'By accessing THOORI Cosmetics, you agree to these Terms and Conditions. If you do not agree, please discontinue use of the site.',
  },
  {
    icon: <Gavel sx={{ color: '#b1763c', mr: 1 }} />,
    title: '2. Intellectual Property',
    content:
      'All content including logos, images, and designs belong to THOORI and may not be copied or reused without permission.',
  },
  {
    icon: <WarningAmber sx={{ color: '#b1763c', mr: 1 }} />,
    title: '3. Limitation of Liability',
    content:
      'We are not liable for any damages from using our products. Perform a patch test before applying to skin.',
  },
  {
    icon: <ShoppingBag sx={{ color: '#b1763c', mr: 1 }} />,
    title: '4. Product Descriptions',
    content:
      'We strive to provide accurate descriptions. However, we do not guarantee complete accuracy, reliability, or timeliness.',
  },
  {
    icon: <LocalShipping sx={{ color: '#b1763c', mr: 1 }} />,
    title: '5. Shipping Policy',
    content:
      'Orders are processed within 1-3 business days. Shipping times vary by location and courier.',
  },
  {
    icon: <Cached sx={{ color: '#b1763c', mr: 1 }} />,
    title: '6. Return & Refund Policy',
    content:
      'Products can be returned within 7 days if unopened and in original condition. Refunds will be issued post verification.',
  },
  {
    icon: <Security sx={{ color: '#b1763c', mr: 1 }} />,
    title: '7. Privacy Policy',
    content:
      'We value your privacy. Your personal data is used solely for order processing and won’t be shared with third parties.',
  },
  {
    icon: <Payment sx={{ color: '#b1763c', mr: 1 }} />,
    title: '8. Payment Terms',
    content:
      'All prices are listed in your local currency. We accept secure payments via credit/debit cards and verified gateways.',
  },
  {
    icon: <ContactSupport sx={{ color: '#b1763c', mr: 1 }} />,
    title: '9. Customer Support',
    content:
      'Our support team is available 9 AM – 6 PM, Mon–Sat. Reach out to us at support@thoori.com.',
  },
  {
    icon: <Update sx={{ color: '#b1763c', mr: 1 }} />,
    title: '10. Changes to Terms',
    content:
      'We may update these terms at any time. Continued use of the site after changes implies acceptance of the new terms.',
  },
];

const TermsAndConditions = () => {
  return (
    <Box sx={{ bgcolor: '#fdf8f3', minHeight: '100vh', pb: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#b1763c',
          py: 6,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Terms & Conditions
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          For a safe and delightful experience with THOORI Cosmetics
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 6 }}>
        {termsData.map((item, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ p: 4, mb: 4, backgroundColor: '#fffaf3' }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              {item.icon}
              <Typography variant="h6" fontWeight="bold" color="#9c6b34">
                {item.title}
              </Typography>
            </Box>
            <Typography variant="body1">{item.content}</Typography>
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

export default TermsAndConditions;

