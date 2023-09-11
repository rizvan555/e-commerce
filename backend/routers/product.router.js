const express = require('express');
const router = express.Router();
const { v4: uuid4 } = require('uuid');
const Product = require('../models/product');
const fs = require('fs');
const upload = require('../services/file.service');
const response = require('../services/response.service');

// Add Product
router.post('/add', upload.array('images'), async (req, res) => {
  response(res, async () => {
    const { name, stock, price, categories } = req.body;
    const productId = uuid4();
    let product = new Product({
      _id: productId,
      name: name,
      stock: stock,
      price: price,
      categories: categories,
      imagesUrl: req.files,
      isActive: true,
      createddate: new Date(),
    });

    await product.save();
    res.json({ message: 'Your product has been successfuly saved' });
  });
});
