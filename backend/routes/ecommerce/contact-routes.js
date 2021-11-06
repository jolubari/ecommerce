'use-strict';

var express = require('express');

var contactController = require('../../controllers/ecommerce/contact-controller');

var api = express.Router();

api.post('/sendMessage', contactController.sendMessage);

module.exports = api;