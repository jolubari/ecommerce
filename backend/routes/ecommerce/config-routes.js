'use-strict';

var express = require('express');

var configController = require('../../controllers/ecommerce/config-controller');

var api = express.Router();

api.get('/getLogoEcommerce/:image', configController.getLogoEcommerce);
api.get('/getConfigEcommerce', configController.getConfigEcommerce);

module.exports = api;