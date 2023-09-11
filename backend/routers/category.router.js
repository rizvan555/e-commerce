const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const { v4: uuidv4 } = require('uuid');
const response = require('../services/response.service');

router.post('/add', async (req, res) => {
  response(res, async () => {
    const { name } = req.body;

    const checkName = await Category.findOne({ name: name });
    if (checkName != null) {
      req.status(403).json({ message: 'This category has been used before' });
    } else {
      const category = new Category({
        _id: uuidv4(),
        name: name,
      });
      await category.save();
      res.json({
        message: 'Category registration as been completed successfuly',
      });
    }
  });
});

router.post('/removeById', async (req, res) => {
  response(res, async () => {
    const { _id } = req.body;
    await Category.findByIdAndRemove(_id);
    res.json({ message: 'Category has been successesfuly deleted' });
  });
});

router.post('/update', async (req, res) => {
  response(res, async () => {
    const { _id, name } = req.body;
    const category = await Category.findOne({ _id: _id });
    category.name = name;
    await Category.findByIdAndUpdate(_id, category);
    res.json({ message: 'Category has been successesfuly updated' });
  });
});

router.get('/', async (req, res) => {
  response(res, async () => {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  });
});

module.exports = router;
