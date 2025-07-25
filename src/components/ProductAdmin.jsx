import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', image: '', category: '' });

  const fetchProducts = () => {
    fetch('http://localhost:3001/api/admin/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  const handleAdd = () => {
    fetch('http://localhost:3001/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(() => {
        setForm({ name: '', price: '', image: '', category: '' });
        fetchProducts();
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/admin/products/${id}`, {
      method: 'DELETE',
    }).then(fetchProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>Manage Products</Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextField label="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <TextField label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <TextField label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <Button variant="contained" onClick={handleAdd}>Add</Button>
      </Box>

      {products.map((p) => (
        <Box key={p._id} display="flex" alignItems="center" justifyContent="space-between" borderBottom="1px solid #ccc" py={1}>
          <Typography>{p.name} - ₹{p.price}</Typography>
          <Button color="error" onClick={() => handleDelete(p._id)}>Delete</Button>
        </Box>
      ))}
    </Box>
  );
};

export default ProductAdmin;
