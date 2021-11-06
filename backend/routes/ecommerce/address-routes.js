'use-strict';

var express = require('express');

//inicializar el controlador del cliente
var addressController = require('../../controllers/ecommerce/address-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

api.post('/registerAddress', auth.auth, addressController.registerAddress);
api.get('/getClientAddresses/:id', auth.auth, addressController.getClientAddresses);
api.put('/updatePrincipalAddress/:id/:idClient', auth.auth, addressController.updatePrincipalAddress);
api.get('/getPrincipalAddressClient/:id', auth.auth, addressController.getPrincipalAddressClient);
module.exports = api;