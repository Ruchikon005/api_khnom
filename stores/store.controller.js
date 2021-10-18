const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const storeService = require('./store.service');

// routes
router.post('/createstore', createStoreSchema, createStore);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:store_id',getByIdstore);
router.get('/ownerfindstore/:uid', getByUid);
router.get('/finduserbyuid/:user_id', authorize(), getById);
router.put('/:user_id', authorize(), updateSchema, update);
router.delete('/:user_id', authorize(), _delete);

module.exports = router;

function createStoreSchema(req, res, next) {
    const schema = Joi.object({
        store_name: Joi.string().required(),
        uid: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function createStore(req, res, next) {
    storeService.create(req.body)
        .then(() => res.json({ message: 'Created Store successful' }))
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

function getByIdstore(req, res, next) {
    storeService.getByIdstore(req.params.store_id)
        .then(store => res.json(store))
        .catch(next);
}

function getByUid(req, res, next) {
    storeService.getByUid(req.params.uid)
        .then(store => res.json(store))
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