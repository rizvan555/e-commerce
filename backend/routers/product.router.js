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
router.post('/', async (req, res) => {
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

//Product get with ID
router.post('/getById', async (req, res) => {
  response(res, async () => {
    const { _id } = req.body;
    let product = awaitProduct.findById(_id);
    res.json(product);
  });
});

//Product Update
router.post('/update', upload.array(images), async (req, res) => {
  response(res, async () => {
    const { _id, name, stock, price, categories } = req.body;
    let product = await Product.findById(_id);
    for (const image of product.imagesUrl) {
      fs.unlink(image.path, () => {});
    }

    let imagesUrl;
    imagesUrl = [...product.imagesUrl, ...product.files];
    product = {
      name: name.toUpperCase(),
      stock: stock,
      price: price,
      imagesUrl: imagesUrl,
      categories: categories,
    };
    await Product.findByIdAndUpdate(_id, product);
    res.json({ message: 'Product update successful' });
  });
});

//Remove Product Image
router.post('/removeImageByIdAndIndex', async (req, res) => {
  response(res, async () => {
    const { _id, index } = req.body;
    const product = await Product.findById(_id);

    if (product.imagesUrl.length == 1) {
      res
        .status(500)
        .json({ message: 'You cannot delete the last image of the product' });
    } else {
      let image = product.imagesUrl[index];
      product.imagesUrl.splice(index, 1);
      await Product.findByIdAndUpdate(_id, product);
      fs.unlink(image.path, () => {});
      res.json({ message: 'Image deleted succesfuly' });
    }
  });
});
