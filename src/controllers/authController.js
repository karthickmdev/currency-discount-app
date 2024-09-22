// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { UserTypes } = require('../models/userModel');

// Mock user data (In real applications, use a database)
const users = [
  {
    id: 1,
    username: 'employee1',
    password: bcrypt.hashSync('password123', 8),
    userType: UserTypes.EMPLOYEE,
    tenure: 1,
  },
];

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, userType: user.userType, tenure: user.tenure },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
};

module.exports = { login };
