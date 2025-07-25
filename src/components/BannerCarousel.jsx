import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import banner from './../assets/banner3.jpg';
import banner1 from './../assets/banner1.jpg';
import banner2 from './../assets/bann1.jpeg';
import banner3 from './../assets/bann2.jpeg';

const BannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const bannerImages = [
    { id: 1, image: banner, alt: 'Special Offer Banner 1' },
    { id: 2, image: banner1, alt: 'Special Offer Banner 2' },
    { id: 3, image: banner2, alt: 'Special Offer Banner 3' },
    { id: 4, image: banner3, alt: 'Special Offer Banner 3' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handlePrevious = () => {
    setCurrentBanner((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: { xs: '300px', sm: '400px', md: '500px' },
      overflow: 'hidden',
      m: 0,
      p: 0,
      borderRadius: 0,
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)', // light soft shadow
    }}>
      {bannerImages.map((banner, index) => (
        <Box
          key={banner.id}
          component="img"
          src={banner.image}
          alt={banner.alt}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: currentBanner === index ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
          }}
        />
      ))}

      {/* Previous Button */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.6)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.9)',
          },
          boxShadow: 2,
        }}
      >
        <ArrowBackIosNew />
      </IconButton>

      {/* Next Button */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.6)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.9)',
          },
          boxShadow: 2,
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* Dots Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        {bannerImages.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: currentBanner === index ? 'primary.main' : 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onClick={() => setCurrentBanner(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BannerCarousel;
