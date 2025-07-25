const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');
const protect = require('../middleware/auth');

// Create new order (for logged-in users)
router.post('/', protect, orderController.createOrder);

// Get all orders of the logged-in user
router.get('/my-orders', protect, orderController.getMyOrders);

// Admin: Get all orders (you can move this to adminRoutes if preferred)
router.get('/all', protect, orderController.getAllOrders);

// Admin/User: Update order status
router.put('/:id/status', protect, orderController.updateOrderStatus);

module.exports = router;
