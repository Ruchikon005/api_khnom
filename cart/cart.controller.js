const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const cartService = require('./cart.service');

// routes
router.post('/addCart', addCartSchema, addCart);

router.get('/mycart/:uid',getMyCartbyUid);
router.get('/ownerfindlocation/:uid', getByuid);
router.get('/finduserbyuid/:user_id', authorize(), getById);
router.put('/update/:uid',updateSchema, update);
router.delete('/:user_id', authorize(), _delete);

module.exports = router;

function addCartSchema(req, res, next) {
    const schema = Joi.object({
        item_id: Joi.number().required(),
        uid: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function addCart(req, res, next) {
    cartService.create(req.body)
        .then(() => res.json({ message: 'Add Cart successful' }))
        .catch(next);
}

function getMyCartbyUid(req, res, next) {
    cartService.getMyCartbyUid(req.params.uid)
        .then(cart => res.json(cart))
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
        item_id: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    cartService.update(req.params.uid, req.body)
        .then(cart => res.json(cart))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.user_id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}