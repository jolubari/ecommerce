'use-strict';

var express = require('express');

//inicializar el controlador del cliente
var clientController = require('../../controllers/back-office/client-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

api.post('/registerClient', auth.auth, clientController.register); // url vinculada al metodo registerClientAdmin del controller
api.get('/getClient/:id', auth.auth, clientController.getClient); // url vinculada al metodo getCLientAdmin del controller
api.get('/getClients', auth.auth, clientController.getClients); // url vinculada al metodo getClientsAdmin del controller, auth es el middleware
api.get('/getFilteredClients/:filterType/:filter?', auth.auth, clientController.getFilteredClients); // url vinculada al metodo getFilteredClientsAdmin del controller
api.put('/updateClient/:id', auth.auth, clientController.updateClient); // url vinculada al metodo updateClientAdmin del controller
api.delete('/deleteClient/:id', auth.auth, clientController.deleteClient); // url vinculada al metodo deleteClientAdmin del controller

module.exports = api;