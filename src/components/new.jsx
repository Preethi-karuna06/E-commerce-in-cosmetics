import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  InputBase, 
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Stack,
  Select,
  FormControl,
  InputLabel,
  styled,
  alpha,
  useTheme
} from '@mui/material';

import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';

// Styled components
const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: '1px solid #ddd',
  display: 'flex',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  width: '100%',
}));

const CategoryButton = styled(Button)(({ theme, active }) => ({
  padding: '10px 20px',
  border: `2px solid #b37c42`,
  background: active ? '#b37c42' : 'transparent',
  color: active ? '#f5efe6' : '#b37c42',
  fontWeight: 'bold',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: active ? '#b37c42' : 'rgba(179, 124, 66, 0.1)',
  }
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  background: '#b37c42',
  color: 'white',
  padding: '10px',
  border: 'none',
  width: '100%',
  borderRadius: '15px',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: '#da912b',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.2)',
    transition: 'all 0.4s ease-in-out',
    zIndex: 1,
  },
  '&:hover::before': {
    left: '100%',
  }
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  display: 'inline-block',
  margin: '30px auto',
  padding: '12px 35px',
  backgroundColor: 'transparent',
  color: '#b37c42',
  fontWeight: 'bold',
  border: '2px solid #b37c42',
  borderRadius: '30px',
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  zIndex: 1,
  '&:hover': {
    color: '#fff',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: '#b37c42',
    transition: 'all 0.4s ease-in-out',
    zIndex: -1,
  },
  '&:hover::before': {
    left: 0,
  }
}));

const app = () => {
  const theme = useTheme();
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);
  const [activeCategory, setActiveCategory] = useState('new');
  
  const handleCategoryMenuOpen = (event) => {
    setCategoryMenuAnchor(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setCategoryMenuAnchor(null);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5efe6', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          {/* Logo */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src="/logo.jpeg" alt="Logo" style={{ height: '55px' }} />
          </Box>
          
          {/* Search Box - Centered */}
          <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
            <SearchContainer>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton 
                type="submit" 
                sx={{ 
                  p: '10px', 
                  bgcolor: '#b37c42',
                  color: 'white',
                  borderRadius: '0 4px 4px 0',
                  '&:hover': {
                    bgcolor: '#a36d33'
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            </SearchContainer>
          </Box>
          
          {/* Navigation Links - Right Side */}
          <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="inherit" sx={{ color: '#b37c42' }}>Home</Button>
            <Button color="inherit" sx={{ color: '#b37c42' }}>About</Button>
            <Button 
              color="inherit" 
              sx={{ color: '#b37c42' }}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleCategoryMenuOpen}
            >
              Category
            </Button>
            <Menu
              anchorEl={categoryMenuAnchor}
              open={Boolean(categoryMenuAnchor)}
              onClose={handleCategoryMenuClose}
            >
              <MenuItem onClick={handleCategoryMenuClose}>Skincare</MenuItem>
              <MenuItem onClick={handleCategoryMenuClose}>Haircare</MenuItem>
              <MenuItem onClick={handleCategoryMenuClose}>Makeup</MenuItem>
              <MenuItem onClick={handleCategoryMenuClose}>Body Care</MenuItem>
            </Menu>
            <Button 
              color="inherit" 
              startIcon={<ShoppingCartIcon />}
              sx={{ color: '#b37c42' }}
            >
              Cart
            </Button>
            <Button 
              color="inherit" 
              startIcon={<PersonIcon />}
              sx={{ color: '#b37c42' }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Banner Carousel */}
      <Box sx={{ position: 'relative' }}>
        <img 
          src="/banner.jpg" 
          alt="Banner" 
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} 
        />
        <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
          <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.5)', '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' } }}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.5)', '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' } }}>
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              '&::before, &::after': {
                content: '""',
                flexGrow: 1,
                height: '2px',
                bgcolor: 'black',
                maxWidth: '100px'
              }
            }}
          >
            SHOP BY CATEGORIES
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#777', mt: 1 }}>
            Find your perfect cosmetic match
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {['Skin Care', 'Hair Care', 'Perfume', 'Makeup', 'Offer'].map((category, index) => (
            <Grid item key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  component="img" 
                  src={`/${category.toLowerCase().replace(' ', '')}.jpg`} 
                  alt={category}
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: '50%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.2) rotate(10deg)'
                    }
                  }}
                />
                <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {category.toUpperCase()}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trending Products Section */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              '&::before, &::after': {
                content: '""',
                flexGrow: 1,
                height: '2px',
                bgcolor: 'black',
                maxWidth: '100px'
              }
            }}
          >
            TRENDING NOW
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#777', mt: 1 }}>
            Your favourite Lakme makeup and skin care
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <CategoryButton 
            active={activeCategory === 'new' ? 1 : 0}
            onClick={() => handleCategoryChange('new')}
          >
            NEW ARRIVALS
          </CategoryButton>
          <CategoryButton 
            active={activeCategory === 'best' ? 1 : 0}
            onClick={() => handleCategoryChange('best')}
          >
            BESTSELLERS
          </CategoryButton>
        </Box>

        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={item}>
              <Card 
                sx={{ 
                  bgcolor: '#fff', 
                  borderRadius: 2, 
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image="/menhairfallcream.webp"
                  alt="Product"
                  sx={{ 
                    borderRadius: '10px 10px 0 0',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    Charcoal Face Wash
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Controls oil & cleanses deeply
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body1" sx={{ color: '#a35e4e', fontWeight: 'bold' }}>
                      ₹229
                    </Typography>
                    <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'gray', mx: 1 }}>
                      ₹269
                    </Typography>
                    <Box sx={{ bgcolor: '#d4a373', color: 'white', px: 0.5, py: 0.2, borderRadius: 0.5, fontSize: '0.75rem' }}>
                      15% off
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <AddToCartButton fullWidth>ADD TO CART</AddToCartButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <ViewAllButton>View All Products</ViewAllButton>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#e6d4c3', color: '#b37c42', mt: 8, pt: 5, pb: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ mb: 2 }}>
                <img src="/logo.jpeg" alt="Logo" style={{ width: '200px', height: '200px' }} />
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: 16 }}>Policies</Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2" component="a" sx={{ color: '#b37c42', textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                    Privacy Policy
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2" component="a" sx={{ color: '#b37c42', textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                    Return & Refund Policy
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2" component="a" sx={{ color: '#b37c42', textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                    Terms & Conditions
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: 16 }}>Quick Links</Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2" component="a" sx={{ color: '#b37c42', textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                    Shop Now
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2" component="a" sx={{ color: '#b37c42', textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                    FAQ
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2" component="a" sx={{ color: '#b37c42', textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                    About Us
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2" component="a" sx={{ color: '#b37c42', textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                    Contact Us
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: 16 }}>Contact</Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>09:00 AM - 06:00 PM</Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>+91 95970 89437</Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>customercare@thoori.in</Typography>
              
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <IconButton sx={{ color: '#d4a373' }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: '#d4a373' }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton sx={{ color: '#d4a373' }}>
                  <YouTubeIcon />
                </IconButton>
                <IconButton sx={{ color: '#d4a373' }}>
                  <TwitterIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <Select
                defaultValue="india"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              >
                <MenuItem value="india">India | INR ₹</MenuItem>
                <MenuItem value="usa">USA | USD $</MenuItem>
                <MenuItem value="uk">UK | GBP £</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Container>
      </Box>
      
      <Box sx={{ bgcolor: '#b37c42', color: 'white', py: 2, textAlign: 'center' }}>
        <Container>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2025 Thoori Cosmetics · 
            <Box component="span" sx={{ mx: 1 }}>
              <Typography component="a" variant="body2" sx={{ color: 'white', textDecoration: 'none' }}>
                Refund Policy
              </Typography>
            </Box> · 
            <Box component="span" sx={{ mx: 1 }}>
              <Typography component="a" variant="body2" sx={{ color: 'white', textDecoration: 'none' }}>
                Privacy Policy
              </Typography>
            </Box> · 
            <Box component="span" sx={{ mx: 1 }}>
              <Typography component="a" variant="body2" sx={{ color: 'white', textDecoration: 'none' }}>
                Terms of Service
              </Typography>
            </Box>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default app;
