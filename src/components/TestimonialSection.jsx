import { Box, Container, Typography, Card, Avatar } from '@mui/material';
import { keyframes } from '@mui/system';

// Create scroll animation
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-250px * 6))} // Adjust based on card width
`;

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Waris Raza',
      rating: '5.0',
      feedback: 'I live near the coastal region, and sun tan is a big issue here. Mamaearth Ubtan Face Wash worked very well. My sun tan seems resolved too.',
      img: '/images/waris.jpg'
    },
    {
      name: 'Manisha',
      rating: '5.0',
      feedback: 'I always use natural products for my baby. Mamaearth Baby Shampoo, Toothpaste, and Face Cream are toxin-free and effective.',
      img: '/images/manisha.jpg'
    },
    {
      name: 'Tanmay',
      rating: '5.0',
      feedback: "I was facing hair fall. Mamaearth's Onion Shampoo, Serum, and Ubtan Face Wash really helped.",
      img: '/images/tanmay.jpg'
    },
    {
      name: 'Ritika Singh',
      rating: '5.0',
      feedback: 'Absolutely love the skin care range. They are gentle, natural, and leave a fresh glow on the skin. Would totally recommend!',
      img: '/images/ritika.jpg'
    },
    {
      name: 'Amit Verma',
      rating: '5.0',
      feedback: 'My dandruff issue was solved after using the tea tree shampoo. I am a fan of Mamaearths hair range now!',
      img: '/images/amit.jpg'
    },
    {
      name: 'Sneha Kapoor',
      rating: '5.0',
      feedback: 'Using Mamaearth face wash and moisturizer daily. Skin feels soft and nourished. Their packaging is eco-friendly too!',
      img: '/images/sneha.jpg'
    }
  ];

  return (
    <Box sx={{ 
      bgcolor: 'background.paper',
      py: 8,
      background: 'linear-gradient(rgba(240, 206, 206, 0.5),rgba(247, 223, 189, 0.5))'
    }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h2" 
          align="center" 
          color="primary.main" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          What Our Customers Say
        </Typography>

        <Box sx={{ 
          position: 'relative',
          overflow: 'hidden',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            width: '200px',
            height: '100%',
            zIndex: 2,
          },
          '&::before': {
            left: 0,
            background: 'linear-gradient(90deg, #FFFFFF 0%, transparent 100%)',
          },
          '&::after': {
            right: 0,
            background: 'linear-gradient(90deg, transparent 0%, #FFFFFF 100%)',
          }
        }}>
          <Box sx={{
            display: 'flex',
            width: 'calc(250px * 12)', // Double the cards for infinite scroll
            animation: `${scroll} 30s linear infinite`,
            '&:hover': {
              animationPlayState: 'paused'
            }
          }}>
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                sx={{
                  width: '250px',
                  m: 1,
                  p: 2,
                  borderRadius: 4,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  bgcolor: 'white',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    height: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  "{testimonial.feedback}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={testimonial.img}
                    sx={{
                      width: 48,
                      height: 48,
                      mr: 2,
                      border: '2px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {testimonial.name}
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: '#68B84C',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '0.75rem'
                      }}
                    >
                      {testimonial.rating} ★
                    </Box>
                  </Box>
                </Box>
              </Card>
            ))}

            {/* Duplicate testimonials for seamless scroll */}
            {testimonials.map((testimonial, index) => (
              <Card
                key={`duplicate-${index}`}
                sx={{
                  width: '250px',
                  m: 1,
                  p: 2,
                  borderRadius: 4,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  bgcolor: 'white',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    height: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  "{testimonial.feedback}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={testimonial.img}
                    sx={{
                      width: 78,
                      height: 48,
                      mr: 2,
                      border: '2px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {testimonial.name}
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: '#68B84C',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '0.75rem'
                      }}
                    >
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
  );
};

export default TestimonialsSection;
