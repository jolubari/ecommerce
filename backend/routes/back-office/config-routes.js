'use-strict';

var express = require('express');
//inicializar el controlador del cliente
var configController = require('../../controllers/back-office/config-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

// usar middleware para almacenar imagen:
var multiParty = require('connect-multiparty');
var path = multiParty({ uploadDir: '././uploads/configs' });

api.get('/getConfig', auth.auth, configController.getConfig);
api.put('/updateConfig/:id', [auth.auth, path], configController.updateConfig);

module.exports = api;