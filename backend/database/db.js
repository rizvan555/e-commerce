const mongoose = require('mongoose');

const uri =
  'mongodb+srv://rizvan555:fatimafateh555@cluster0.av7lucl.mongodb.net/';

const connection = () => {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopolgy: true })
    .then(() => console.log('Your MongoDb connect is successfuly'))
    .catch((err) => console.log('You have Error! Error:' + err.message));
};

module.exports = connection;
