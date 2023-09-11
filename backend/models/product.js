const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  imageUrls: Array,
  stock: Number,
  price: Number,
  createdDate: Date,
  isActive: Boolean,
  catecories: [{ type: String, ref: 'Category' }],
});

const Product = mongoose.model('Product', productSchema);

module.export = Product;
