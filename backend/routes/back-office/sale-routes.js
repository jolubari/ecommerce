'use-strict';

var express = require('express');

var saleController = require('../../controllers/back-office/sale-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

api.get('/getSales/:from?/:to?', auth.auth, saleController.getSales);


module.exports = api;