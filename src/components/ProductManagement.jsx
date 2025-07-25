import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Select, MenuItem, InputLabel, FormControl,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

const AdminProductManager = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', price: '', oldPrice: '',
    discount: '', category: '', rating: '', inStock: true, image: null
  });
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/admin/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpen = (product = null) => {
    if (product) {
      setForm({ ...product, image: null });
      setEditingProduct(product);
    } else {
      setForm({
        title: '', description: '', price: '', oldPrice: '',
        discount: '', category: '', rating: '', inStock: true, image: null
      });
      setEditingProduct(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const key in form) {
      if (form[key] !== null) formData.append(key, form[key]);
    }
    if (editingProduct) formData.append('_id', editingProduct._id);

    try {
      const res = await axios.post('http://localhost:3001/api/admin/products', formData);
      const newProduct = res.data;
      setProducts((prev) =>
        editingProduct
          ? prev.map((p) => (p._id === editingProduct._id ? newProduct : p))
          : [...prev, newProduct]
      );
      handleClose();
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const renderImage = (imageObj, title) => {
    if (!imageObj?.data?.data || !imageObj.contentType) return 'No Image';

    try {
      const base64String = btoa(
        new Uint8Array(imageObj.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      return (
        <img
          src={`data:${imageObj.contentType};base64,${base64String}`}
          alt={title}
          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
        />
      );
    } catch (err) {
      console.error('Image render error:', err);
      return 'Error';
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Product Management</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Product
      </Button>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Old Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>In Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((prod) => (
              <TableRow key={prod._id}>
                <TableCell>{renderImage(prod.image, prod.title)}</TableCell>
                <TableCell>{prod.title}</TableCell>
                <TableCell>{prod.category}</TableCell>
                <TableCell>₹{prod.price}</TableCell>
                <TableCell>₹{prod.oldPrice}</TableCell>
                <TableCell>{prod.discount}</TableCell>
                <TableCell>{prod.rating}</TableCell>
                <TableCell>{prod.inStock ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpen(prod)}
                    style={{ marginBottom: 4 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(prod._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} margin="dense" />
          <TextField fullWidth label="Description" name="description" value={form.description} onChange={handleChange} margin="dense" />
          <TextField fullWidth label="Price" name="price" type="number" value={form.price} onChange={handleChange} margin="dense" />
          <TextField fullWidth label="Old Price" name="oldPrice" type="number" value={form.oldPrice} onChange={handleChange} margin="dense" />
          <TextField fullWidth label="Discount" name="discount" value={form.discount} onChange={handleChange} margin="dense" />
          <TextField fullWidth label="Rating" name="rating" type="number" value={form.rating} onChange={handleChange} margin="dense" />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select name="category" value={form.category} onChange={handleChange}>
              <MenuItem value="Skin Care">Skin Care</MenuItem>
              <MenuItem value="Hair Care">Hair Care</MenuItem>
              <MenuItem value="Makeup">Makeup</MenuItem>
              <MenuItem value="Perfume">Perfume</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>In Stock</InputLabel>
            <Select name="inStock" value={form.inStock} onChange={handleChange}>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <input type="file" name="image" accept="image/*" onChange={handleChange} style={{ marginTop: 10 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            {editingProduct ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminProductManager;
