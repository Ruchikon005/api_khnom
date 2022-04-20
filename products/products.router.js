const express = require('express');
const router = express.Router();
const upload = require('../_middleware/upload_product.config');
const fileWorker = require('./products.controller');

router.post('/addproduct', upload.single("uploadproductfile"), fileWorker.upload);
router.get('/productlist_store/:stid',fileWorker.getByStid);
router.get('/product/:id',fileWorker.getByid);
router.get('/productlist',fileWorker.getAll);
router.get('/category/:cate',fileWorker.getByCate);

module.exports = router;

