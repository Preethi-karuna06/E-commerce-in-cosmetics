import React, { useState } from 'react';
import {
  Box, Button, Typography, Grid, IconButton, Accordion, AccordionSummary,
  AccordionDetails, Rating, LinearProgress, Divider, Select, MenuItem,
  TextField, Dialog, DialogTitle, DialogContent, DialogActions, Badge,
  AppBar, Toolbar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import primer from './../assets/primer.jpg'
const Produ = () => {
  const [quantity, setQuantity] = useState(1);
  const [sortBy, setSortBy] = useState('Most Recent');
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [newReview, setNewReview] = useState({
    rating: 5,
    name: '',
    review: ''
  });
  
  const [reviewList, setReviewList] = useState([
    {
      author: 'Monika S',
      isVerified: true,
      date: '03/08/2025',
      rating: 5,
      review: 'This is amazing product'
    },
    {
      author: 'Ajee',
      isVerified: false,
      date: '02/13/2025',
      rating: 5,
      review: 'Please provide refill pack for saffron oil also'
    },
    {
      author: 'Mahalakshmi V', 
      isVerified: true,
      date: '01/13/2025',
      rating: 5,
      review: "I used the saffron oil, it's a game changer for my skin ❤️"
    }
  ]);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    setCartCount(prev => prev + quantity);
  };

  const handleSubmitReview = () => {
    const currentDate = new Date().toLocaleDateString();
    const review = {
      author: newReview.name,
      isVerified: true,
      date: currentDate,
      rating: newReview.rating,
      review: newReview.review
    };

    setReviewList([review, ...reviewList]);
    setOpenReviewForm(false);
    setNewReview({ rating: 5, name: '', review: '' });
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: '#4b2e1e' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Store</Typography>
          <IconButton color="inherit">
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4 }}>
        <Grid container spacing={4}>
          {/* Left side */}
          <Grid item xs={12} md={6}>
            <Box>
              {/* Product Image */}
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <img
                  src= {primer}
                  alt="Main product"
                  style={{ width: '100%', maxWidth: 250, height :200, borderRadius: 8 }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <img src={primer}  alt="thumb1" width={80} />
                <img src="/thumb2.jpg" alt="thumb2" width={80} />
              </Box>

              {/* Product Info */}
              <Box mt={4}>
                <Typography variant="body2" color="text.secondary">BABY OIL</Typography>
                <Typography variant="h4" sx={{ color: '#4b2e1e', mb: 2 }}>
                  Saffron Baby Massage Oil-100ml
                </Typography>

                <Box display="flex" alignItems="center" mb={1}>
                  <Typography sx={{ textDecoration: 'line-through', mr: 1 }} color="text.secondary">
                    Rs. 890.00
                  </Typography>
                  <Typography variant="h6" color="#4b2e1e">Rs. 799.00</Typography>
                  <Button size="small" sx={{ ml: 2, bgcolor: '#7e4c74', color: '#fff' }}>Sale</Button>
                </Box>
                <Typography variant="caption" color="text.secondary">Tax included.</Typography>

                {/* Quantity */}
                <Box mt={3} mb={2}>
                  <Typography>Quantity ({quantity} in cart)</Typography>
                  <Box display="flex" alignItems="center" mt={1} sx={{ border: '1px solid #ddd', width: 'fit-content', borderRadius: 1 }}>
                    <IconButton onClick={handleDecrement}><RemoveIcon /></IconButton>
                    <Typography mx={2}>{quantity}</Typography>
                    <IconButton onClick={handleIncrement}><AddIcon /></IconButton>
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleAddToCart}
                  sx={{
                    mb: 1,
                    color: '#4b2e1e',
                    borderColor: '#4b2e1e',
                    '&:hover': {
                      borderColor: '#4b2e1e',
                      bgcolor: 'rgba(75, 46, 30, 0.04)'
                    }
                  }}
                >
                  Add to cart
                </Button>
                
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mb: 2,
                    bgcolor: '#4b2e1e',
                    '&:hover': {
                      bgcolor: '#3a2518'
                    }
                  }}
                >
                  Buy it now
                </Button>

                <Button startIcon={<ShareIcon />} sx={{ color: '#4b2e1e', mb: 3 }}>
                  Share
                </Button>

                {/* Accordions */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Product description details...</Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Key Ingredients</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Key ingredients details...</Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Benefits</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Product benefits...</Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Grid>

          {/* Right side - Reviews */}
          <Grid item xs={12} md={6}>
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Customer Reviews</Typography>
                <Button 
                  variant="contained"
                  onClick={() => setOpenReviewForm(true)}
                  sx={{ 
                    bgcolor: '#4b2e1e',
                    '&:hover': { bgcolor: '#3a2518' }
                  }}
                >
                  Write a review
                </Button>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <Rating value={5} readOnly />
                <Typography>5.00 out of 5</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Based on {reviewList.length} reviews
              </Typography>

              {/* Review List */}
              <Box mt={4}>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="Most Recent">Most Recent</MenuItem>
                    <MenuItem value="Highest Rating">Highest Rating</MenuItem>
                    <MenuItem value="Lowest Rating">Lowest Rating</MenuItem>
                  </Select>
                </Box>

                {reviewList.map((review, index) => (
                  <Box key={index} mb={3}>
                    <Rating value={review.rating} readOnly size="small" />
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <Typography fontWeight={600}>{review.author}</Typography>
                      {review.isVerified && (
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            bgcolor: '#4b2e1e', 
                            color: 'white', 
                            px: 1, 
                            py: 0.5, 
                            borderRadius: 1 
                          }}
                        >
                          Verified
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="caption" color="text.secondary">{review.date}</Typography>
                    <Typography mt={1}>{review.review}</Typography>
                    {index !== reviewList.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Review Form Dialog */}
      <Dialog open={openReviewForm} onClose={() => setOpenReviewForm(false)}>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box py={2}>
            <Box mb={2}>
              <Typography mb={1}>Rating</Typography>
              <Rating
                value={newReview.rating}
                onChange={(_, value) => setNewReview(prev => ({ ...prev, rating: value }))}
              />
            </Box>
            <TextField
              fullWidth
              label="Name"
              value={newReview.name}
              onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Review"
              value={newReview.review}
              onChange={(e) => setNewReview(prev => ({ ...prev, review: e.target.value }))}
              margin="dense"
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReviewForm(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitReview}
            variant="contained"
            sx={{ bgcolor: '#4b2e1e', '&:hover': { bgcolor: '#3a2518' } }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Produ;