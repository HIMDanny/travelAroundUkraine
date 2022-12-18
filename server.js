const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const globalConfigs = require('./routes/globalConfigs');
const customers = require('./routes/customers');
const catalog = require('./routes/catalog');
const products = require('./routes/products');
const colors = require('./routes/colors');
const sizes = require('./routes/sizes');
const filters = require('./routes/filters');
const subscribers = require('./routes/subscribers');
const cart = require('./routes/cart');
const orders = require('./routes/orders');
const links = require('./routes/links');
const pages = require('./routes/pages');
const slides = require('./routes/slides');
const wishlist = require('./routes/wishlist');
const comments = require('./routes/comments');
const shippingMethods = require('./routes/shippingMethods');
const paymentMethods = require('./routes/paymentMethods');
const partners = require('./routes/partners');
const { nextTick } = require('process');
// const mainRoute = require("./routes/index");

const app = express();

app.use(cors());

// Body parser middleware

app.use((reg, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',

    'OPTIONS, GET, POST, PUT, PATCH, DELETE', // what matters here is that OPTIONs is present
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
// mongoose
//   .connect(db, { useNewUrlParser: true, useFindAndModify: false })
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.log(err));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/configs', globalConfigs);
app.use('/customers', customers);
app.use('/catalog', catalog);
app.use('/products', products);
app.use('/colors', colors);
app.use('/sizes', sizes);
app.use('/filters', filters);
app.use('/subscribers', subscribers);
app.use('/cart', cart);
app.use('/orders', orders);
app.use('/links', links);
app.use('/pages', pages);
app.use('/slides', slides);
app.use('/wishlist', wishlist);
app.use('/comments', comments);
app.use('/shipping-methods', shippingMethods);
app.use('/payment-methods', paymentMethods);
app.use('/partners', partners);
// app.use("/", mainRoute);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
