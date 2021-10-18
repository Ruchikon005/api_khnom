const express = require('express');
const router = express.Router();
const upload = require('../_middleware/upload_product.config');
const fileWorker = require('./products.controller');

router.post('/addproduct', upload.single("uploadproductfile"), fileWorker.upload);
router.get('/productlist/:stid',fileWorker.getByStid);

module.exports = router;

