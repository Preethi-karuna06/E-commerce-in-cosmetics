import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Typography, Card, CardContent, CardMedia, Rating, Button, Switch, Slider,
  TextField, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const categories = ['Skin Care', 'Hair Care', 'Perfume', 'Makeup'];

const FacialCreams = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategory = location.state?.selectedCategory || null;
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 799]);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch products from backend
  useEffect(() => {
    fetch('http://localhost:3001/api/admin/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      alert('Please sign in to add items to cart.');
      navigate('/signin');
      return;
    }
    addToCart(product);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const renderImage = (imageObj) => {
  try {
    if (
      imageObj &&
      imageObj.data &&
      imageObj.data.data &&
      Array.isArray(imageObj.data.data)
    ) {
      const byteArray = new Uint8Array(imageObj.data.data);
      const base64 = btoa(String.fromCharCode(...byteArray));
      return `data:${imageObj.contentType};base64,${base64}`;
    }
  } catch (err) {
    console.error('Error decoding image:', err);
  }

  return '/no-image.jpg'; // fallback
};

  const filteredProducts = products.filter((product) => {
    const price = parseFloat(product.price) || 0;
    const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
    const inStock = inStockOnly ? product.inStock : true;
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const titleMatch = product.title?.toLowerCase().includes(searchQuery.toLowerCase());

    return inPriceRange && inStock && categoryMatch && titleMatch;
  });

  return (
    <Box p={{ xs: 2, md: 4 }} sx={{ backgroundColor: '#fefaf4', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" mb={4} fontWeight="bold">
        Products
      </Typography>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        {/* Filters Sidebar */}
        <Box flexShrink={0} width={{ xs: '100%', md: 280 }}>
          <Typography variant="h6" mb={1}>Filter:</Typography>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Availability</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" alignItems="center" gap={1}>
                <Switch checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                <Typography>In stock only</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box px={1}>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={799}
                  sx={{ color: '#b37c42' }}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <TextField
                    value={priceRange[0]}
                    size="small"
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    InputProps={{ startAdornment: <span>₹</span> }}
                  />
                  <Typography mx={2}>to</Typography>
                  <TextField
                    value={priceRange[1]}
                    size="small"
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    InputProps={{ startAdornment: <span>₹</span> }}
                  />
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {categories.map((category) => (
                <ListItem
                  key={category}
                  disableGutters
                  sx={{ py: 0.5, cursor: 'pointer' }}
                  onClick={() => handleCategoryChange(category)}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    style={{ marginRight: 8 }}
                  />
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Product Display Grid */}
        <Box flexGrow={1}>
          <Typography variant="body1" mb={2}>
            {filteredProducts.length} products found
          </Typography>

          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card
                  sx={{
                    height: 450,
                    width: 250,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: '0.3s',
                    '&:hover': { boxShadow: 8, transform: 'scale(1.02)' },
                  }}
                >
                  <Box sx={{ cursor: 'pointer' }} onClick={() => navigate(`/products/${product._id}`)}>
                    <CardMedia
                      component="img"
                      height="100"
                      image={renderImage(product.image)}
                      alt={product.title}
                      sx={{ height: 200, width: '100%', objectFit: 'contain', p: 1 }}
                    />
                  </Box>

                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {product.title}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="body2">₹{product.price}</Typography>
                      {product.oldPrice && (
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'gray' }}>
                          ₹{product.oldPrice}
                        </Typography>
                      )}
                    </Box>
                    <Rating value={product.rating} readOnly size="small" />
                  </CardContent>

                  <Box p={2} display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#b37c42',
                        '&:hover': { backgroundColor: '#a1662f' },
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 3,
                      }}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default FacialCreams;
