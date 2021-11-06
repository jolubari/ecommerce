'use-strict';

var express = require('express');

//inicializar el controlador del cliente
var clientController = require('../../controllers/ecommerce/client-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

api.post('/register', clientController.register);
api.post('/login', clientController.login);
api.get('/getClientEcommerce/:id', auth.auth, clientController.getClientEcommerce);
api.put('/updateClientEcommerce/:id', auth.auth, clientController.updateClientEcommerce);

module.exports = api;