// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
// -------------------- MULTER CONFIG --------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

// -------------------- PRODUCT ROUTES --------------------

// Create or update product
router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const {
      _id,
      title,
      description,
      price,
      oldPrice,
      discount,
      category,
      rating,
      inStock
    } = req.body;

    const productData = {
      title,
      description,
      price,
      oldPrice,
      discount,
      category,
      rating,
      inStock: inStock === 'true' || inStock === true,
    };

    if (req.file) {
      productData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    let product;
    if (_id) {
      product = await Product.findByIdAndUpdate(_id, productData, { new: true });
    } else {
      product = new Product(productData);
      await product.save();
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Product save failed', message: err.message });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed', message: err.message });
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Delete product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed', message: err.message });
  }
});

// -------------------- ORDER ROUTES --------------------

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('products.product', 'title price image');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status
router.put('/orders/:id/status', async (req, res) => {
  const { orderStatus } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Add tracking info to order
router.post('/orders/:id/tracking', async (req, res) => {
  const { status, location } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    order.trackingHistory.push({ status, location });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add tracking info' });
  }
});

// Update payment status
router.put('/orders/:id/payment-status', async (req, res) => {
  const { paymentStatus } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Delete order
router.delete('/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// -------------------- USER ROUTES --------------------

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', message: err.message });
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  try {
    const { firstName, lastName, emailOrPhone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, emailOrPhone },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', message: err.message });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', message: err.message });
  }
});


module.exports = router;