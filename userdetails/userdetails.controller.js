const express = require('express');
const router = express.Router();
const Joi = require('joi');
const userdetailService = require('./userdetail.service');

// routes
router.post('/createstore', createStoreSchema, createStore);
// router.get('/:store_id',getByIdstore);
router.get('/detail/:uid', getByUid);

module.exports = router;


function createStoreSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
		address: Joi.string().required(),
        uid: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function createStore(req, res, next) {
    storeService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function getByUid(req, res, next) {
	userdetailService.getByUid(req.params.uid)
		.then(Detail => res.json(Detail))
		.catch(next);
}