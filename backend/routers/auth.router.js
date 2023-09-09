const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'MySecretKey MySecretKey 12345.';
const options = {
  expiresIn: '1d',
};

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    user._id = uuidv4();
    user.createdDate = new Date();
    user.isAdmin = false;

    await user.save();
    const token = jwt.sign({}, secretKey, options);
    let model = { token: token, user: user };
    res.json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
