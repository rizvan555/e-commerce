const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    require: true,
    unique: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
