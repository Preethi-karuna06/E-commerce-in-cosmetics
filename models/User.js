const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  emailOrPhone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  address: {
    street: String, city: String, state: String,
    zipCode: String, country: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
