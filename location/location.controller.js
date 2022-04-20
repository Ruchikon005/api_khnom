const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const locationService = require('./location.service');

// routes
router.post('/addlocation', addLocationSchema, addLocation);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/findbyitem/:product_id',getByitemid);
router.get('/ownerfindlocation/:uid', getByuid);
router.get('/finduserbyuid/:user_id', authorize(), getById);
router.put('/:user_id', authorize(), updateSchema, update);
router.delete('/:user_id', authorize(), _delete);

module.exports = router;

function addLocationSchema(req, res, next) {
    const schema = Joi.object({
        location_name: Joi.string().required(),
        location_detail: Joi.string().required(),
        lat: Joi.string().required(),
        lng: Joi.string().required(),
        stid: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function addLocation(req, res, next) {
    locationService.create(req.body)
        .then(() => res.json({ message: 'Add Location successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getByitemid(req, res, next) {
    locationService.getByitemid(req.params.product_id)
        .then(location => res.json(location))
        .catch(next);
}

function getByuid(req, res, next) {
    locationService.getByuid(req.params.uid)
        .then(location => res.json(location))
        .catch(next);
}

function getById(req, res, next) {
    storeService.getById(req.params.user_id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        // firstName: Joi.string().empty(''),
        // lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.user_id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.user_id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}