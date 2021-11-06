'use-strict';

var express = require('express');

var ordersController = require('../../controllers/ecommerce/orders-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

api.get('/getOrdersClient/:idClient', auth.auth, ordersController.getOrdersClient);
api.get('/getDetailsOrderClient/:idSale', auth.auth, ordersController.getDetailsOrderClient);

module.exports = api;