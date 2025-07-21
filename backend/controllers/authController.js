// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email.endsWith('@gmail.com')) {
    return res.status(403).json({ error: 'Only @gmail.com users allowed' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ error: 'User already exists' });

  const user = await User.create({ email, password });
  res.status(201).json({ msg: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET
  );
  res.json({ token });
};
