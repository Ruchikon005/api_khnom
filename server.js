require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');

global.__basedir = __dirname;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/stores', require('./stores/store.controller'));
app.use('/userdetails', require('./userdetails/userdetails.controller'));
app.use('/userimages', require('./userdetail_image/upload.router'));
app.use('/uploads_userimage', express.static('./uploads_userimage'));
app.use('/products', require('./products/products.router'));
app.use('/product_image', express.static('./products/product_image'));
app.use('/location', require('./location/location.controller'));
app.use('/cart', require('./cart/cart.controller'));
app.use('/payment', require('./payment/payment.controller'));
app.use('/invoice', require('./invoice/invoicec.controller'));

//promptpay Qr code
app.use('/generateQr', require('./promptpay_qr/prompt_controller'));



// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3001;
app.listen(port, () => console.log('Server listening on port ' + port));