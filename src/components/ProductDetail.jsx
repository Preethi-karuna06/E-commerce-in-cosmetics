import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  AddShoppingCart,
  Share,
  Add,
  Remove,
  ExpandMore,
  CloudUpload
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState('Most Recent');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    name: '',
    review: '',
    images: []
  });

  useEffect(() => {
    fetch(`http://localhost:3001/api/admin/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setReviews(data.reviews || []);
      });
  }, [productId]);

  const handleQuantityChange = (type) => {
    setQuantity(prev => type === 'increase' ? prev + 1 : Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const readers = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(images => {
      setUploadedImages(prev => [...prev, ...images]);
      setPreviewImages(prev => [...prev, ...images]);
    });
  };

  const handleSubmitReview = () => {
    if (!newReview.name || !newReview.review) return;

    const reviewData = {
      ...newReview,
      date: new Date().toLocaleDateString(),
      verified: true,
      images: uploadedImages
    };

    fetch(`http://localhost:3001/api/admin/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    })
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setOpenReviewForm(false);
        setNewReview({ rating: 5, name: '', review: '', images: [] });
        setUploadedImages([]);
        setPreviewImages([]);
      });
  };

  const sortReviews = (reviewsToSort) => {
    switch (sortBy) {
      case 'Highest Rating':
        return [...reviewsToSort].sort((a, b) => b.rating - a.rating);
      case 'Lowest Rating':
        return [...reviewsToSort].sort((a, b) => a.rating - b.rating);
      default:
        return [...reviewsToSort].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 400, bgcolor: '#f0f0f0', display: 'flex', justifyContent: 'center' }}>
            <img
              src={`data:${product.image.contentType};base64,${btoa(String.fromCharCode(...new Uint8Array(product.image.data.data)))}`}
              alt={product.title}
              style={{ objectFit: 'contain', maxHeight: '100%' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="h6" color="primary">₹{product.price}</Typography>
          <Rating value={product.rating} readOnly sx={{ my: 1 }} />
          <Typography variant="body1" paragraph>{product.description}</Typography>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => handleQuantityChange('decrease')}><Remove /></IconButton>
            <Typography>{quantity}</Typography>
            <IconButton onClick={() => handleQuantityChange('increase')}><Add /></IconButton>
          </Box>
          <Button startIcon={<AddShoppingCart />} onClick={handleAddToCart} sx={{ mt: 2 }} variant="contained">
            Add to Cart
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Customer Reviews ({reviews.length})</Typography>
            <Box display="flex" gap={2}>
              <Select size="small" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="Most Recent">Most Recent</MenuItem>
                <MenuItem value="Highest Rating">Highest Rating</MenuItem>
                <MenuItem value="Lowest Rating">Lowest Rating</MenuItem>
              </Select>
              <Button onClick={() => setOpenReviewForm(true)} variant="contained">Write Review</Button>
            </Box>
          </Box>
          <Box mt={2}>
            {sortReviews(reviews).map((review, idx) => (
              <Box key={idx} p={2} bgcolor="#f9f9f9" my={2} borderRadius={2}>
                <Rating value={review.rating} readOnly size="small" />
                <Typography fontWeight="bold">{review.name}</Typography>
                <Typography variant="body2">{review.date}</Typography>
                <Typography>{review.review}</Typography>
                {review.images && review.images.length > 0 && (
                  <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                    {review.images.map((img, i) => (
                      <img key={i} src={img} alt="review-img" width={80} height={80} style={{ objectFit: 'cover' }} />
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openReviewForm} onClose={() => setOpenReviewForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Rating
            value={newReview.rating}
            onChange={(e, newValue) => setNewReview(prev => ({ ...prev, rating: newValue }))}
          />
          <TextField
            label="Name"
            fullWidth
            sx={{ mt: 2 }}
            value={newReview.name}
            onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
          />
          <TextField
            label="Review"
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
            value={newReview.review}
            onChange={(e) => setNewReview(prev => ({ ...prev, review: e.target.value }))}
          />
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            <CloudUpload sx={{ mr: 1 }} /> Upload Photos
            <input hidden multiple type="file" accept="image/*" onChange={handleImageUpload} />
          </Button>
          <Box mt={2} display="flex" gap={1} flexWrap="wrap">
            {previewImages.map((img, i) => (
              <img key={i} src={img} alt="preview" width={80} height={80} style={{ objectFit: 'cover' }} />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReviewForm(false)}>Cancel</Button>
          <Button onClick={handleSubmitReview} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetail;
