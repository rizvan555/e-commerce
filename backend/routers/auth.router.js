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

    const checkUserEmail = await User.findOne({ email: user.email });
    if (checkUserEmail !== null) {
      res
        .status(403)
        .json({ message: 'You must use a different email address' });
    } else {
      await user.save();
      const token = jwt.sign({}, secretKey, options);
      let model = { token: token, user: user };
      res.json(model);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user == null) {
      res.status(403).json({ message: 'User not found' });
    } else {
      if (user.password != password) {
        res.status(403).json({ message: 'Your password is wrong' });
      } else {
        const token = jwt.sign({}, secretKey, options);
        let model = { token: token, user: user };
        res.json(model);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
