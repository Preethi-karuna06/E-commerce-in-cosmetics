const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { firstName, lastName, emailOrPhone, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ firstName, lastName, emailOrPhone, password: hashed });
  res.json({ message: 'User created' });
};

exports.login = async (req, res) => {
  const { emailOrPhone, password } = req.body;
  const user = await User.findOne({ emailOrPhone });
  if(!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, firstName: user.firstName, role: user.role } });
};
