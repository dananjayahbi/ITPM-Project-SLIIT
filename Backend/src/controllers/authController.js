const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Login Function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Email or User not Found' });
    }
    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // Send token in the Authorization header with Bearer scheme
    res.status(200).json({ message: 'Login successful',userId:user._id,role: user.role ,token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { loginUser };