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

//Delete product
router.post('/removeById', async (req, res) => {
  response(res, async () => {
    const { _id } = req.body;
    const product = await Product.findById(_id);
    //For remove Images
    for (const image of product.imagesUrl) {
      fs.unlink(image.path, () => {});
    }

    await Product.findByIdAndRemove(_id);
    res.json({ message: 'Your product has been successfuly deleted' });
  });
});

//Product Listing
router('/', async (req, res) => {
  response(res, async () => {
    const { pageNumber, pageSize, search } = req.body;

    let productsCount = await Product.find({
      $or: [
        {
          name: { $regex: search, options: 'i' },
        },
      ],
    }).count();

    let count = await Product.find({
      $or: [
        {
          name: { regex: search, options: 'i' },
        },
      ],
    })
      .sort({ name: 1 })
      .populate('categories')
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    let totalPageCount = Math.ceil(productsCount / pageSize);
    let model = {
      datas: products,
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalPageCount: totalPageCount,
      isFirstPage: pageNumber == 1 ? true : false,
      isLastPage: pageNumber == pageNumber ? true : false,
    };
    res.json(model);
  });
});
