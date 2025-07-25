// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  const { firstName, lastName, emailOrPhone, address } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, emailOrPhone, address },
      { new: true }
    ).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Get all orders of a user
router.get('/:id/orders', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id })
      .populate('products.product', 'title price image')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
});

module.exports = router;
