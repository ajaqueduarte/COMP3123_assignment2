const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path as necessary

// Signup route
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });

  newUser.save()
    .then(() => res.status(201).json({ message: 'User account created successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password }).exec();
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'User authenticated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
