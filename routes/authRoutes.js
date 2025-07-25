// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   POST /api/users/signup
// @desc    Register a user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, emailOrPhone, password } = req.body;

    // Basic validation
    if (!firstName || !lastName || !emailOrPhone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ emailOrPhone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email or phone" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      emailOrPhone,
      password: hashedPassword,
      role: 'customer' // Default role
    });

    await newUser.save();
    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // Basic validation
    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Special case for admin
    if (emailOrPhone === 'Preethi_k' && password === 'admin123') {
      const token = jwt.sign(
        { id: 'admin', role: 'admin' },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1d' }
      );

      return res.json({
        token,
        user: {
          id: 'admin',
          firstName: 'Preethi',
          lastName: 'K',
          emailOrPhone: 'Preethi_k',
          role: 'admin'
        }
      });
    }

    // Find regular user
    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role || 'customer' },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailOrPhone: user.emailOrPhone,
        role: user.role || 'customer'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   GET /api/users/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // Special case for admin
    if (req.user.id === 'admin') {
      return res.json({
        id: 'admin',
        firstName: 'Preethi',
        lastName: 'K',
        emailOrPhone: 'Preethi_k',
        role: 'admin'
      });
    }

    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   PUT /api/users/me
// @desc    Update user profile
// @access  Private
router.put('/me', auth, async (req, res) => {
  try {
    // Don't allow updates for the special admin account
    if (req.user.id === 'admin') {
      return res.status(403).json({ message: "Cannot update admin account" });
    }

    const { firstName, lastName, address } = req.body;
    
    // Build update object
    const updateFields = {};
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (address) updateFields.address = address;

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
