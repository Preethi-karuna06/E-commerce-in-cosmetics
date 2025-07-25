import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import {
  Cached,
  LocalMall,
  AssignmentTurnedIn,
  Cancel,
  Schedule,
  ErrorOutline,
  WarningAmber,
  Email,
  GppGood,
  Info,
} from '@mui/icons-material';

const refundSections = [
  {
    icon: <Cached sx={{ color: '#b1763c', mr: 1 }} />,
    title: '1. Return Window',
    content:
      'Returns must be initiated within 7 days of delivery. Items returned after this period may not be accepted.',
  },
  {
    icon: <LocalMall sx={{ color: '#b1763c', mr: 1 }} />,
    title: '2. Eligibility Criteria',
    content:
      'Products must be unused, sealed, and in original packaging. Items showing signs of tampering are ineligible.',
  },
  {
    icon: <AssignmentTurnedIn sx={{ color: '#b1763c', mr: 1 }} />,
    title: '3. Refund Process',
    content:
      'Once your return is approved and received, refunds will be processed within 5–7 business days to your original payment method.',
  },
  {
    icon: <Cancel sx={{ color: '#b1763c', mr: 1 }} />,
    title: '4. Non-Returnable Items',
    content:
      'Used products, opened containers, free gifts, and items on clearance are not eligible for return or refund.',
  },
  {
    icon: <Schedule sx={{ color: '#b1763c', mr: 1 }} />,
    title: '5. Late or Missing Refunds',
    content:
      'If you haven’t received a refund after 7 business days, check your bank or contact your card provider before reaching out to us.',
  },
  {
    icon: <ErrorOutline sx={{ color: '#b1763c', mr: 1 }} />,
    title: '6. Damaged or Wrong Items',
    content:
      'In case of damaged or incorrect items, email us within 48 hours of delivery with photos and order details for a replacement or refund.',
  },
  {
    icon: <WarningAmber sx={{ color: '#b1763c', mr: 1 }} />,
    title: '7. Exchange Policy',
    content:
      'We only replace items if they are defective or damaged. Exchanges must be requested within 7 days of receipt.',
  },
  {
    icon: <Email sx={{ color: '#b1763c', mr: 1 }} />,
    title: '8. Return Authorization',
    content:
      'Do not send products back without contacting support. Unauthorized returns will not be accepted or refunded.',
  },
  {
    icon: <GppGood sx={{ color: '#b1763c', mr: 1 }} />,
    title: '9. Hygiene & Safety',
    content:
      'Due to hygiene concerns, we cannot accept returns for any products that have been opened or used, even partially.',
  },
  {
    icon: <Info sx={{ color: '#b1763c', mr: 1 }} />,
    title: '10. Contact Information',
    content:
      'To request a return or refund, email us at support@thoori.com with your order ID, issue, and clear product photos.',
  },
];

const RefundPolicy = () => {
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
          Refund & Return Policy
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Because your peace of mind matters.
        </Typography>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ mt: 6 }}>
        {refundSections.map((section, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ p: 4, mb: 4, backgroundColor: '#fffaf3' }}
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

export default RefundPolicy;
