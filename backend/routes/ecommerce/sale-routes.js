'use-strict';

var express = require('express');

var saleController = require('../../controllers/ecommerce/sale-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

api.post('/registerSaleClient', auth.auth, saleController.registerSaleClient);

api.get('/sendMailSaleClient/:id', auth.auth, saleController.sendMailSaleClient);

api.get('/validateCoupon/:coupon', auth.auth, saleController.validateCoupon);


module.exports = api;