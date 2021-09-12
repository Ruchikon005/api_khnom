const express = require('express');
const router = express.Router();
const upload = require('../_middleware/upload.config');
const fileWorker = require('./upload.controller');


router.post('/uploadimage', upload.single("uploadfile"), fileWorker.upload);

module.exports = router;

