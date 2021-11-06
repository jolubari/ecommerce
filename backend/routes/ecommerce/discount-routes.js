'use-strict';

var express = require('express');

var discountController = require('../../controllers/ecommerce/discount-controller');

var api = express.Router();

api.get('/getActiveDiscount', discountController.getActiveDiscount);
api.get('/getBannerDiscount/:image', discountController.getBannerDiscount);


module.exports = api;