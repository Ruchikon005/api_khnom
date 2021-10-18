const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../_helpers/db');
const userimageServer = require('./userimage.server.js');




exports.upload = (req, res) => {
	const newImage = new db.UserImage({ ...req.body });
	db.UserImage.create({
		uid: newImage.uid,
		type: req.file.mimetype,
		image_path: 'uploads_userimage/' + req.file.filename,
		// data: fs.createReadStream('uploads_userimage/' + req.file.filename)
	}).then(image => {
		try {
			// exit node.js app
			res.json({ 'msg': 'File uploaded successfully!','file': req.file,'part': req.file.part });
		} catch (e) {
			console.log(e);
			res.json({ 'err': e });
		}
	})
};

exports.getByUid = (req, res, next) => {
	userimageServer.getByUid(req.params.uid)
		.then(Image => res.json(Image))
		.catch(next);
}