import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Box, 
  Button,
  Rating,
  Chip,
  useMediaQuery,
  useTheme,
  Fade,
  CardActions,
  CardActionArea
} from '@mui/material';
import { styled } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { AddShoppingCart } from '@mui/icons-material';
import {products} from './Products.jsx';
import { useCart } from '../context/CartContext';

// Color palette
const colors = {
  primary: '#b37c42',       // Rich brown
  secondary: '#f8f3e9',     // Cream
  accent: '#e8a87c',        // Peach
  highlight: '#d8b4a0',     // Dusty rose
  dark: '#3a2518',          // Dark brown
  light: '#faf7f2',         // Off-white
};

// Styled components for enhanced design
const BannerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '40vh',
  width: '100%',
  overflow: 'hidden',
  marginBottom: theme.spacing(6),
  borderRadius: theme.spacing(1),
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('sm')]: {
    height: '30vh',
  },
}));

const BannerImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundImage: 'url(https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(to right, ${colors.primary}CC 0%, ${colors.primary}66 100%)`,
  }
}));

const BannerContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  width: '80%',
  color: colors.secondary,
  zIndex: 2,
}));

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  backgroundColor: colors.light,
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
  },
}));

const ProductImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: '100%', // 1:1 aspect ratio
  overflow: 'hidden',
  backgroundColor: colors.secondary,
}));

const StyledProductImage = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain', // This ensures the image fits properly within the container
  padding: theme.spacing(2),
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const SaleChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: colors.accent,
  color: colors.primary,
  fontWeight: 'bold',
  zIndex: 2,
}));

const SkincareProductsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [animatedProducts, setAnimatedProducts] = useState([]);
  
  // Filter only skincare products
  const skincareProducts = products.filter(product => 
    product.category && product.category.toLowerCase() === 'skin care'
  );
  
  useEffect(() => {
    // Animation effect for products to appear one by one
    const timer = setTimeout(() => {
      setAnimatedProducts(skincareProducts);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    addToCart({
      ...product,
      quantity: 1
    });
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: colors.secondary, py: 4 }}>
      <Fade in={true} timeout={1000}>
        <BannerContainer>
          <BannerImage />
          <BannerContent>
            <Typography variant="h2" component="h1" gutterBottom sx={{ 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: isMobile ? '2rem' : '3.5rem'
            }}>
              Thoori Skincare Collection
            </Typography>
            <Typography variant="h5" sx={{ 
              maxWidth: '800px', 
              margin: '0 auto',
              fontSize: isMobile ? '1rem' : '1.5rem',
              mb: 3
            }}>
              Discover premium products formulated for radiant, healthy skin
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                borderRadius: '25px', 
                padding: '10px 30px',
                fontWeight: 'bold',
                backgroundColor: colors.highlight,
                color: colors.primary,
                '&:hover': {
                  backgroundColor: colors.accent,
                }
              }}
            >
              Shop Now
            </Button>
          </BannerContent>
        </BannerContainer>
      </Fade>

      <Box mb={4}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: colors.primary }}>
          Our Skincare Products
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Each product is carefully formulated with the finest ingredients to nourish and revitalize your skin.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {animatedProducts.map((product, index) => (
          <Fade 
            in={true} 
            style={{ transitionDelay: `${index * 100}ms` }}
            key={product.id}
          >
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{height:'100%',width:300}}>
              <ProductCard elevation={2}>
                <CardActionArea onClick={() => handleProductClick(product.id)}>
                  <ProductImageContainer>
                    {product.onSale && (
                      <SaleChip label="SALE" />
                    )}
                    <StyledProductImage
                      src={product.image}
                      alt={product.name}
                    />
                  </ProductImageContainer>
                  <CardContent sx={{ flexGrow: 1, bgcolor: colors.light }}>
                    <Typography variant="h6" component="h3" gutterBottom noWrap sx={{ color: colors.primary }}>
                      {product.name}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Rating 
                        value={product.rating || 0} 
                        precision={0.5} 
                        readOnly 
                        size="small"
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: colors.primary,
                          }
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" ml={1}>
                        ({product.reviewCount || 0})
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      height: '40px'
                    }}>
                      {product.description}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        {product.oldPrice && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ textDecoration: 'line-through' }}
                          >
                            {product.oldPrice}
                          </Typography>
                        )}
                        <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 'bold' }}>
                          {product.price}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'center', pt: 0, pb: 2, bgcolor: colors.light }}>
                  <Button 
                    variant="contained" 
                    size="medium"
                    startIcon={<AddShoppingCart />}
                    onClick={(e) => handleAddToCart(product, e)}
                    sx={{
                      borderRadius: '20px',
                      width: '80%',
                      backgroundColor: colors.primary,
                      color: colors.secondary,
                      '&:hover': {
                        backgroundColor: colors.dark,
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </ProductCard>
            </Grid>
          </Fade>
        ))}
      </Grid>
      
      {skincareProducts.length === 0 && (
        <Box textAlign="center" py={8} sx={{ bgcolor: colors.light, borderRadius: 2 }}>
          <Typography variant="h5" color="text.secondary">
            No skincare products found.
          </Typography>
        </Box>
      )}
       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button
              variant="contained"
              background='#b37c42'
              size="large"
              sx={{
                minWidth: 200,
                textTransform: 'uppercase',
                letterSpacing: 1,
                py: 1.5,
                boxShadow: '0 4px 12px rgba(179, 124, 66, 0.2)',
                '&:hover': { boxShadow: '0 6px 16px rgba(179, 124, 66, 0.3)' }
              }}
              onClick={() => navigate('/Products')}
            >
              View All Products
            </Button>
            </Box>
    </Container>
  );
};

export default SkincareProductsPage;
