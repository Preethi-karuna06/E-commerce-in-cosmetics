const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    street: String, city: String, state: String,
    zipCode: String, country: String
  },
  paymentMethod: { type: String, enum: ['Cash on Delivery','Online'], required: true },
  paymentStatus: { type: String, enum: ['Pending','Completed','Failed'], default: 'Pending' },
  orderStatus: { type: String, enum: ['Placed','Processing','Shipped','Delivered','Cancelled'], default: 'Placed' },
  trackingNumber: String,
  trackingHistory: [{ status: String, location: String, timestamp: { type: Date, default: Date.now } }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
