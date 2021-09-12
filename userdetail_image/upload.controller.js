const fs = require('fs');
const db = require('../_helpers/db');

exports.upload = (req, res) => {
	const newImage = new db.UserImage({ ...req.body });
	db.UserImage.create({
		uid: newImage.uid,
		type: req.file.mimetype,
		name: req.file.originalname,
		data: fs.readFileSync(__basedir + '/resources/static/assets/uploads/' + req.file.filename)
	}).then(image => {
		try {
			fs.writeFileSync(__basedir + '/resources/static/assets/tmp/' + image.name, image.data);

			// exit node.js app
			res.json({ 'msg': 'File uploaded successfully!','file': req.file });
		} catch (e) {
			console.log(e);
			res.json({ 'err': e });
		}
	})
};