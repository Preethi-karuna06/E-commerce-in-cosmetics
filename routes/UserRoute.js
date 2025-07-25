const express = require('express');
const router = express.Router();

// Import Controller
const authorcontroller = require('../Controllers/Usercontroller');

// POST /signup
router.post('/signup', authorcontroller.signupUser);

// POST /login
router.post('/login', authorcontroller.loginUser);

router.post('/checkout', userController.placeOrder);

module.exports = router;
