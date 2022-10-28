const express = require('express');
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const securityRoute = require('./routes/security');
const billRoute = require('./routes/bill');
const { authenticateToken } = require('./services');

const app = express();

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.use('/user', authenticateToken, userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use(securityRoute);
app.use('/bill', billRoute);

module.exports = app;
