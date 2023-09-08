const express = require('express');
const cors = require('cors');
const connection = require('./database/db');
const app = express();

app.use(express.json());
app.use(cors());

connection();

const port = process.env.Port || 8080;
app.listen(port, () =>
  console.log('The application was launched from port http://localhost:5000')
);
