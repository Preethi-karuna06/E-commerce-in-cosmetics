import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton
} from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';import CategoriesSection from './CategoriesSection';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // 👈 for navigation
import skincare from './../assets/skincare.png';
import perfume from './../assets/perfume.jpg';
import haircare from './../assets/haircare.jpg';
import makeup from './../assets/makeup.jpg';
import charcoal from './../assets/charcoalface.png';
import facemask from './../assets/facemask.webp';
import faceserum from './../assets/faceserum.webp';
import moisturizer from './../assets/moisturizer.webp';
import BannerCarousel from './BannerCarousel';
import ScrollingText from './scrollingtext';
import lipstick from './../assets/lipstick.webp';
import concealer from './../assets/concealer.webp';
import eyeliner from './../assets/eyeliner.webp';
import toner from './../assets/toner.webp';
import eyescream from './../assets/eyecream.webp';
import mascara from './../assets/mascara.webp';
import highlighter from './../assets/highlighter.webp';
import primer from './../assets/primer.jpg';
import OrderTracking from './OrderTracing';
//import OrderManagement from './OrderManagent';

const theme = createTheme({
  palette: {
    primary: { main: '#b37c42' },
    secondary: { main: '#f5efe6' },
    background: { default: '#fff8f0' }
  }
});

const categories = [
  { id: 1, name: 'Skin Care', image: skincare, link: '/skincare' },
  { id: 2, name: 'Hair Care', image: haircare, link: '/haircare' },
  { id: 3, name: 'Perfume', image: perfume, link: '/perfume' },
  { id: 4, name: 'Makeup', image: makeup, link: '/makeup' },
];

const products = {
  new: [
    { id: 1, title: 'Charcoal Face Wash', description: 'Controls oil & cleanses deeply', price: 229, oldPrice: 269, discount: '15% off', image: charcoal },
    { id: 2, title: 'Face Serum', description: 'Hydrating & nourishing', price: 299, oldPrice: 349, discount: '15% off', image: faceserum},
    { id: 3, title: 'Face Mask', description: 'Deep cleansing & purifying', price: 199, oldPrice: 249, discount: '20% off', image: facemask },
    { id: 4, title: 'Moisturizer', description: 'All-day hydration', price: 399, oldPrice: 449, discount: '11% off', image: moisturizer },
    { id: 5, title: 'Toner', description: 'Balances pH levels', price: 189, oldPrice: 229, discount: '17% off', image:toner},
    { id: 6, title: 'Eye Cream', description: 'Reduces dark circles', price: 349, oldPrice: 399, discount: '13% off', image: eyescream }
  ],
  best: [
    { id: 1, title: 'Eyeliner', description: 'Long-lasting & waterproof', price: 199, oldPrice: 249, discount: '20% off', image: eyeliner },
    { id: 2, title: 'Lipstick', description: 'Matte finish', price: 299, oldPrice: 399, discount: '25% off', image: lipstick },
    { id: 3, title: 'Highlighter', description: 'Shimmer & glow', price: 799, oldPrice: 899, discount: '11% off', image:highlighter},
    { id: 4, title: 'Primer', description: 'Smooth base for makeup', price: 650, oldPrice: 700, discount: '7% off', image: primer },
    { id: 5, title: 'Mascara', description: 'Volumizing & lengthening', price: 449, oldPrice: 499, discount: '10% off', image: mascara },
    { id: 6, title: 'Concealer', description: 'Full coverage', price: 349, oldPrice: 399, discount: '13% off', image:concealer}
  ]
};


const Home = ({ cartCount, setCartCount }) => {
  const [activeTab, setActiveTab] = useState('new');
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const productRefs = useRef([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  };
const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  const handleScroll = (direction) => {
    const container = document.getElementById('products-container');
    if (container) {
      const scrollAmount = 300;
      container.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

    const handleAddToCart = (product) => {
      if (!user) {
    alert('Please sign in to add items to cart.');
    navigate('/signin');
    return;
  }
    addToCart(product); // 👈 Add actual product
  };

  const handleLike = (productId) => {
    setLikedProducts(prevLiked => 
      prevLiked.includes(productId)
        ? prevLiked.filter(id => id !== productId)
        : [...prevLiked, productId]
    );
  };

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.2 });

    productRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <BannerCarousel />
        <ScrollingText/>
        {/* Category Section */}
        <CategoriesSection categories={categories} />

        {/* Product Section */}
        <Container sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Trending Now
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Button
              variant={activeTab === 'new' ? 'contained' : 'outlined'}
              onClick={() => setActiveTab('new')}
            >
              New Arrivals
            </Button>
            <Button
              variant={activeTab === 'best' ? 'contained' : 'outlined'}
              onClick={() => setActiveTab('best')}
            >
              Best Sellers
            </Button>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={() => handleScroll('left')}
              sx={{
                position: 'absolute',
                left: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper'
              }}
            >
              <ArrowBack />
            </IconButton>

            <Box
              id="products-container"
              sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 2,
                pb: 2,
                px: 1,
                '::-webkit-scrollbar': { display: 'none' },
                scrollBehavior: 'smooth'
              }}
            >
              {products[activeTab].map((product, index) => (
                <Card
                  key={product.id}
                  ref={(el) => (productRefs.current[index] = el)}
                  sx={{
                    minWidth: 280,
                    maxWidth: 280,
                    position: 'relative',
                    opacity: 0,
                    transform: 'translateY(20px)',
                    transition: 'opacity 1s ease, transform 1s ease',
                    '&.fade-in': {
                      opacity: 1,
                      transform: 'translateY(0)'
                    },
                    '&:hover': { transform: 'translateY(-10px)' }
                  }}
                >
                  {/* Like Button */}
                  <IconButton
  sx={{
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#f5efe6', // slight hover effect
    }
  }}
  onClick={() => handleLike(product.id)}
>
  <FavoriteIcon
    sx={{
      color: likedProducts.includes(product.id) ? '#b37c42' : 'gray', // use your requested color
      transition: 'color 0.3s',
    }}
  />
</IconButton>


                  {/* Clickable Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.title}
                    onClick={() => handleImageClick(product.id)}
                    sx={{
                      objectFit: 'contain',
                      width: '100%',
                      bgcolor: '#f9f9f9',
                      cursor: 'pointer'
                    }}
                  />

                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{product.description}</Typography>

                    <Box sx={{ mt: 1 }}>
                      <Typography component="span" variant="h6">₹{product.price}</Typography>
                      <Typography component="span" sx={{ textDecoration: 'line-through', color: 'grey', mx: 1 }}>
                        ₹{product.oldPrice}
                      </Typography>
                      <Typography component="span" sx={{ bgcolor: '#d4a373', color: 'white', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.8rem' }}>
                        {product.discount}
                      </Typography>
                    </Box>

                    <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => handleAddToCart(product)}>
                      ADD TO CART
                    </Button>

                  </CardContent>
                </Card>
              ))}
            </Box>

            <IconButton
              onClick={() => handleScroll('right')}
              sx={{
                position: 'absolute',
                right: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper'
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>

          {/* View All Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button
              variant="contained"
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
      </Box>
    </ThemeProvider>
  );
};

export default Home;
