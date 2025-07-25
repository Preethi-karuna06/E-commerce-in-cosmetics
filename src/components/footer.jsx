
import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  Button, 
  Container,
  Grid,
  FormControl,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { 
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import logo from './../assets/images/logo.png';
const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5efe6',
  color: '#b37c42',
  padding: theme.spacing(5, '10%'),
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}));

const FooterColumn = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 200,
  marginBottom: theme.spacing(2),
}));

const FooterLogo = styled('img')(({ theme }) => ({
  width: 200,
  height: 200,
  display: 'block',
  marginBottom: theme.spacing(1),
}));

const FooterText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  opacity: 0.8,
  marginBottom: 5,
}));

const SocialIconsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 15,
  marginTop: 10,
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#d4a373',
  fontSize: 20,
  opacity: 0.8,
  '&:hover': {
    opacity: 1,
  },
}));

const CountrySelection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: 10,
}));

const CountrySelect = styled(Select)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: 5,
  fontSize: 14,
  '& .MuiSelect-select': {
    padding: theme.spacing(1),
  },
}));

const BottomFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#b37c42',
  textAlign: 'center',
  padding: theme.spacing(2, '10%'),
  fontSize: 14,
  color: 'white',
  opacity: 0.8,
}));

const FooterLink = styled(Button)(({ theme }) => ({
  color: 'inherit',
  opacity: 0.8,
  fontSize: 14,
  justifyContent: 'flex-start',
  padding: 0,
  textTransform: 'none',
  '&:hover': {
    opacity: 1,
    backgroundColor: 'transparent',
  },
}));

const Footer = () => {
  return (
    <Box>
      <FooterWrapper>
        {/* Logo Section */}
        <FooterColumn>
          <FooterLogo src={logo} alt="thoori Logo" />
        </FooterColumn>
        
        {/* Policies */}
        <FooterColumn>
          <Typography variant="h6" gutterBottom>Policies</Typography>
          <List disablePadding>
            <ListItem disableGutters disablePadding>
              <FooterLink href="/privacypolicy">Privacy Policy</FooterLink>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <FooterLink href="/refundpolicy">Return & Refund Policy</FooterLink>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <FooterLink href="/termsandcondition">Terms & Conditions</FooterLink>
            </ListItem>
          </List>
        </FooterColumn>
        <FooterColumn>
          <Typography variant="h6" gutterBottom>Quick Links</Typography>
          <List disablePadding>
            <ListItem disableGutters disablePadding>
              <FooterLink href="#">Shop Now</FooterLink>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <FooterLink href="#">Combo Offer</FooterLink>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <FooterLink href="/faq">FAQ</FooterLink>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <FooterLink href="about.html">About Us</FooterLink>
            </ListItem>
          </List>
        </FooterColumn>
        
        {/* Contact Info */}
        <FooterColumn>
          <Typography variant="h6" gutterBottom>Contact</Typography>
          <FooterText>09:00 AM - 06:00 PM</FooterText>
          <FooterText>+91 95970 89437</FooterText>
          <FooterText>customercare@ayrame.in</FooterText>
          
          {/* Social Icons */}
          <SocialIconsContainer>
            <SocialIcon href="#" aria-label="Facebook">
              <FacebookIcon />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Instagram">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon href="#" aria-label="YouTube">
              <YouTubeIcon />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Twitter">
              <TwitterIcon />
            </SocialIcon>
          </SocialIconsContainer>
        </FooterColumn>
      </FooterWrapper>

      {/* Country Selection */}
      <CountrySelection>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <CountrySelect
            defaultValue="india"
            inputProps={{ 'aria-label': 'country' }}
          >
            <MenuItem value="india">India | INR ₹</MenuItem>
            <MenuItem value="usa">USA | USD $</MenuItem>
            <MenuItem value="uk">UK | GBP £</MenuItem>
          </CountrySelect>
        </FormControl>
      </CountrySelection>

      {/* Bottom Footer */}
      <BottomFooter>
        © 2025. AyraMe Website Created by Riobizsola Pvt Ltd · 
        <FooterLink href="refundpolicy.html" sx={{ color: 'white', mx: 0.5 }}>
          Refund Policy
        </FooterLink> · 
        <FooterLink href="privacy&policy.html" sx={{ color: 'white', mx: 0.5 }}>
          Privacy Policy
        </FooterLink> · 
        <FooterLink href="termsandcondition.html" sx={{ color: 'white', mx: 0.5 }}>
          Terms of Service
        </FooterLink>
      </BottomFooter>
    </Box>
  );
};

export default Footer;
