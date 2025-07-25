const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  price: Number,
  oldPrice: Number,
  description: String,
  image: {
  data: Buffer,
  contentType: String
},

  rating: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);
