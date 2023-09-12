const express = require('express');
const cors = require('cors');
const connection = require('./database/db');
const authRouter = require('./routers/auth.router');
const categoryRouter = require('./routers/category.router');
const productRouter = require('./routers/product.router');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //read images from outside

connection();

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log('The application was launched from port http://localhost:8080')
);
