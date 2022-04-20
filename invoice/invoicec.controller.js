const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const invoiceService = require('./invoice.service');

// routes
router.post('/addinvoice', addinvoiceSchema, addinvoice);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/findbycustomer_name/:customer_name',getBycustomerName);
router.get('/findbystid/:stid',getBystid);
router.get('/ownerfindlocation/:uid', getByuid);
router.get('/finduserbyuid/:user_id', authorize(), getById);
router.put('/:user_id', authorize(), updateSchema, update);
router.delete('/:user_id', authorize(), _delete);

module.exports = router;

function addinvoiceSchema(req, res, next) {
    const schema = Joi.object({
        product_id: Joi.number().required(),
        name_location: Joi.string().required(),
        customer_name: Joi.string().required(),
        customer_phone: Joi.string().required(),
        amount: Joi.string().required(),
        quantity: Joi.string().required(),
        date: Joi.string().required(),
        time: Joi.string().required(),
        status_pay: Joi.string().required(),
        receipt_status: Joi.string().required(),
        stid: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function addinvoice(req, res, next) {
    invoiceService.create(req.body)
        .then(() => res.json({ message: 'Add invoice successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    invoiceService.getAll()
        .then(invoices => res.json(invoices))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getBycustomerName(req, res, next) {
    invoiceService.getBycustomerName(req.params.customer_name)
        .then(invoice => res.json(invoice))
        .catch(next);
}

function getBystid(req, res, next) {
    invoiceService.getBystid(req.params.stid)
        .then(invoice => res.json(invoice))
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