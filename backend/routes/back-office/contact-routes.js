'use-strict';

var express = require('express');

var contactController = require('../../controllers/back-office/contact-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

api.get('/getMessages', auth.auth, contactController.getMessages);
api.put('/closeMessage/:id', auth.auth, contactController.closeMessage);

module.exports = api;