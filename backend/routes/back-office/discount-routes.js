'use-strict';

var express = require('express');

var discountController = require('../../controllers/back-office/discount-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');
// usar middleware para almacenar imagen:
var multiParty = require('connect-multiparty');
var path = multiParty({ uploadDir: '././uploads/discounts' });

api.post('/registerDiscount', [auth.auth, path], discountController.registerDiscount);
api.get('/getDiscount/:id', auth.auth, discountController.getDiscount);
api.get('/getDiscounts', auth.auth, discountController.getDiscounts);
api.get('/getFilteredDiscounts/:filter?', auth.auth, discountController.getFilteredDiscounts);
api.put('/updateDiscount/:id', [auth.auth, path], discountController.updateDiscount);
api.delete('/deleteDiscount/:id', auth.auth, discountController.deleteDiscount);

module.exports = api;