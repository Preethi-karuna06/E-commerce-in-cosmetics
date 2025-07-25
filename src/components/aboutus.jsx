import React, { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card,
  Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import banner3 from '../assets/banner3.jpg';
import ProductDetail from './ProductDetail';
import TestimonialsSection from './TestimonialSection';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// Define animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: '#B37C42',
      light: '#D4A373', 
      dark: '#91581A',
    },
    secondary: {
      main: '#E6D4C3',
      light: '#F5EFE6',
      dark: '#B68973',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      default: '#F5EFE6',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontSize: '48px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '36px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '24px',
      fontWeight: 500,
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.7,
    }
  },
});


const testimonials = [
  {
    name: 'Waris Raza',
    rating: '5.0',
    img: '/images/waris.jpg',
    feedback:
      'I live near the coastal region, and sun tan is a big issue here. Thoori Ubtan Face Wash worked very well. My sun tan seems resolved too.',
  },
  {
    name: 'Manisha',
    rating: '5.0',
    img: '/images/manisha.jpg',
    feedback:
      'I always use natural products for my baby. Thoori Shampoo, Toothpaste, and Face Cream are toxin-free and effective.',
  },
  {
    name: 'Tanmay',
    rating: '5.0',
    img: '/images/tanmay.jpg',
    feedback:
      "I was facing hair fall. Thoori's Onion Shampoo, Serum, and Ubtan Face Wash really helped.",
  },
  {
    name: 'Ritika Singh',
    rating: '5.0',
    img: '/images/ritika.jpg',
    feedback:
      'Absolutely love the skin care range. They are gentle, natural, and leave a fresh glow on the skin. Would totally recommend!',
  },
  {
    name: 'Amit Verma',
    rating: '5.0',
    img: '/images/amit.jpg',
    feedback:
      'My dandruff issue was solved after using the tea tree shampoo. I am a fan of Thoori hair range now!',
  },
  {
    name: 'Sneha Kapoor',
    rating: '5.0',
    img: '/images/sneha.jpg',
    feedback:
      'Using Thoori face wash and moisturizer daily. Skin feels soft and nourished. Their packaging is eco-friendly too!',
  },
];

const AboutUs = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    // Add animation on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        if (isVisible) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: '#fff8f0', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            color: 'white',
            textAlign: 'center',
            py: 15,
            mb: 8,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
            },
            '&:hover::before': {
              background: 'rgba(0,0,0,0.1)',
            }
          }}
        >
          <Container>
            <Typography 
              variant="h1" 
              gutterBottom
              sx={{
                transform: 'translateY(50px)',
                opacity: 0,
                animation: `${fadeIn} 1s forwards`,
              }}
            >
              Our Story
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                mb: 4,
                transform: 'translateY(50px)',
                opacity: 0,
                animation: `${fadeIn} 1s forwards 0.3s`,
              }}
            >
              Discover the journey of Thoori Cosmetics, from humble beginnings to becoming a trusted name in natural beauty products
            </Typography>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            py: 6, 
            mb: 8,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)',
              transition: 'opacity 0.3s ease',
              opacity: 0,
            },
            '&:hover::before': {
              opacity: 1,
            }
          }}
        >
          <Container>
            <Grid container justifyContent="space-around" textAlign="center">
              {[
                { number: '25,356', label: 'Happy Customers' },
                { number: '6,050', label: 'Followers' },
                { number: '851', label: 'Shops' },
                { number: '95%', label: 'Satisfaction Rate' }
              ].map((stat, index) => (
                <Grid 
                  item 
                  key={index} 
                  xs={6} 
                  md={3}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    }
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1">
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Why Thoori Section */}
        <Container sx={{ mb: 8 }}>
          <Typography 
            variant="h2" 
            align="center" 
            color="primary.main"
            sx={{ 
              mb: 6,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 3,
                bgcolor: 'primary.main',
                transition: 'width 0.3s ease',
              },
              '&:hover::after': {
                width: 150,
              }
            }}
          >
            WHY THOORI?
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: "https://cdn-icons-png.flaticon.com/512/2553/2553691.png",
                title: "Natural",
                description: "Made with pure natural ingredients"
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/2553/2553651.png",
                title: "No Side effect",
                description: "Clinically tested and proven safe"
              },
              {
                icon: "https://cdn-icons-png.flaticon.com/512/1828/1828743.png",
                title: "100% Organic",
                description: "Certified organic ingredients only"
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card 
                  className="animate-on-scroll"
                  sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    height: '100%',
                    backgroundColor: 'secondary.light',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    opacity: 0,
                    transform: 'translateY(20px)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                      '& img': {
                        transform: 'rotate(360deg) scale(1.1)',
                      }
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={feature.icon}
                    alt={feature.title}
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      mb: 2,
                      transition: 'all 0.5s ease',
                    }}
                  />
                  <Typography variant="h5" color="primary.main" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* About Content Section */}
        <Container sx={{ mb: 8, paddingTop:10}}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box className="animate-on-scroll" sx={{ opacity: 0, transform: 'translateY(20px)' }}>
                <Typography variant="h2" color="primary.main" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  Thoori Cosmetics was born out of a simple yet powerful vision: to create beauty products that harness the power of nature while respecting both human health and the environment.
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  Founded in 2015 by Priya Sharma, a skincare enthusiast with a background in Ayurvedic medicine, Thoori began as a small workshop crafting handmade soaps and creams from natural ingredients.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  size="large"
                  sx={{ 
                    mr: 2,
                    px: 4,
                    borderRadius: 50,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 5px 15px rgba(179,124,66,0.4)',
                    }
                  }}
                >
                  Learn More
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  size="large"
                  onClick={()=>Navigate('/contactus')}
                  sx={{ 
                    px: 4,
                    borderRadius: 50,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 5px 15px rgba(179,124,66,0.4)',
                    }
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                className="animate-on-scroll"
                sx={{ 
                  opacity: 0, 
                  transform: 'translateY(20px)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    right: -20,
                    bottom: -20,
                    background: 'linear-gradient(45deg, #B37C42 0%, #D4A373 100%)',
                    borderRadius: 4,
                    zIndex: -1,
                    opacity: 0.3,
                    transition: 'all 0.3s ease',
                  },
                  '&:hover::before': {
                    transform: 'translate(10px, 10px)',
                  }
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1624454002302-71a9af7c152e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Thoori Products"
                  sx={{
                    width: '100%',
                    borderRadius: 4,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Products Preview */}
        <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
          <Container>
            <Typography 
              variant="h2" 
              align="center" 
              color="primary.main"
              gutterBottom
              sx={{
                mb: 6,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100,
                  height: 3,
                  bgcolor: 'primary.main',
                  transition: 'width 0.3s ease',
                },
                '&:hover::after': {
                  width: 150,
                }
              }}
            >
              Our Products
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  name: 'Natural Cream',
                  image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                {
                  name: 'Vitamin Serum',
                  image: 'https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                {
                  name: 'Sunscreen',
                  image: 'https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                {
                  name: 'Moisturizer',
                  image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                },
                {
                  name: 'Facial Cleanser',
                  image: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                }
              ].map((product, index) => (
                <Grid item key={index} xs={6} sm={4} md={2.4}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        '& .product-image': {
                          transform: 'scale(1.1)',
                          boxShadow: '0 10px 20px rgba(179,124,66,0.3)',
                        },
                        '& .product-name': {
                          color: 'primary.main',
                        }
                      }
                    }}
                  >
                    <Box
                      className="product-image"
                      sx={{
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto 15px',
                        border: '3px solid',
                        borderColor: 'primary.light',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <Typography 
                      className="product-name"
                      variant="h6" 
                      sx={{ 
                        transition: 'all 0.3s ease',
                        fontSize: '1.1rem',
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

       {/* Testimonials Section */}
        {/* Newsletter Section */}
        <Box 
          sx={{ 
            bgcolor: 'secondary.light',
            py: 8,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container maxWidth="sm">
            <Box
              component="img"
              src={banner3}
              alt="Newsletter"
              sx={{
                width: 200,
                mb: 3,
                borderRadius: '50%',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'rotate(5deg) scale(1.05)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                }
              }}
            />
            <Typography 
              variant="h3" 
              color="primary.main" 
            
              gutterBottom
              sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60,
                  height: 3,
                  bgcolor: 'primary.main',
                  transition: 'width 0.3s ease',
                },
                '&:hover::after': {
                  width: 100,
                }
              }}
            >
              Experience the Thoori Difference
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Join thousands of satisfied customers who have discovered the power of natural beauty with Thoori. Our products are crafted with love, care, and the finest natural ingredients.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              onClick={()=> Navigate('/Products')}
              sx={{ 
                px: 4,
                borderRadius: 50,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(179,124,66,0.4)',
                }
              }}
            >
              Shop Now
            </Button>
          </Container>
        </Box>
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
  <Container maxWidth="xl">
    <Typography variant="h2" align="center" color="primary.main" gutterBottom>
      What Our Customers Say
    </Typography>
    <Box 
      sx={{ 
        mt: 4, 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          animation: 'scroll 30s linear infinite',
          '@keyframes scroll': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: `translateX(calc(-250px * ${testimonials.length / 2}))` }
          },
          '&:hover': {
            animationPlayState: 'paused'
          }
        }}
      >
        {/* Double the testimonials array to create seamless loop */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <Card key={index} sx={{ 
            p: 2,
            minWidth: '250px',
            maxWidth:'250px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
            transition: 'all 0.3s ease',
            mr: 2,
            flexShrink: 0,
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            }
          }}>
            <Typography 
              variant="body2"
              color="text.secondary" 
              sx={{ 
                mb: 2, 
                flexGrow: 1,
                fontSize: '0.8rem'
              }}
            >
              "{testimonial.feedback}"
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center',height:70, }}>
              <Box
                component="img"
                src={testimonial.img}
                alt={testimonial.name}
                sx={{ 
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  mr: 1,
                }}
              />
              <Box>
                <Typography 
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ fontSize: '0.8rem' }}
                >
                  {testimonial.name}
                </Typography>
                <Box sx={{ 
                  bgcolor: 'success.main', 
                  color: 'white',
                  px: 0.5,
                  borderRadius: 1,
                  display: 'inline-block',
                  fontSize: '0.7rem'
                }}>
                  {testimonial.rating} ★
                </Box>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  </Container>
</Box>


      </Box>
    </ThemeProvider>
  );
};

export default AboutUs;