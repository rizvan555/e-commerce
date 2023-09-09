const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/';

const connection = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 30000,
    })
    .then(() => console.log('Your MongoDb connect is successfuly'))
    .catch((err) => console.log('You have Error! Error:' + err.message));
};

module.exports = connection;
