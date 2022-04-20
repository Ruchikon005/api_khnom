const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../_helpers/db');
const productServer = require('./products.server.js');




exports.upload = (req, res) => {
	const newProduct = new db.Product({ ...req.body });
	db.Product.create({
		stid: newProduct.stid,
		product_name: newProduct.product_name,
		category: newProduct.category,
        product_detail: newProduct.product_detail,
        price: newProduct.price,
        quantity: newProduct.quantity,
		image_path: 'product_image/' + req.file.filename,
		data_image: fs.createReadStream('products/product_image/' + req.file.filename)
	}).then(image => {
		try {
			// exit node.js app
			res.json({ 'msg': 'Add product successfully!'});
		} catch (e) {
			console.log(e);
			res.json({ 'err': e });
		}
	})
};

exports.getByStid = (req, res, next) => {
	productServer.getByStid(req.params.stid)
		.then(Product => res.json(Product))
		.catch(next);
}

exports.getByid = (req, res, next) => {
	productServer.getByid(req.params.id)
		.then(Product => res.json(Product))
		.catch(next);
}

exports.getAll = (req, res, next) => {
	productServer.getAll()
		.then(Product => res.json(Product))
		.catch(next);
}

exports.getByCate= (req, res, next) => {
	productServer.getByCate(req.params.cate)
		.then(Product => res.json(Product))
		.catch(next);
}