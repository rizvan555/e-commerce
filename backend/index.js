const express = require('express');
const cors = require('cors');
const connection = require('./database/db');
const authRouter = require('./routers/auth.router');
const categoryRouter = require('./routers/category.router');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);

connection();

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log('The application was launched from port http://localhost:8080')
);
