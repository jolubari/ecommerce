'use-strict';

var express = require('express');

//inicializar el controlador del cliente
var cartController = require('../../controllers/ecommerce/cart-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

api.post('/addCartClient', auth.auth, cartController.addCartClient);
api.get('/getCartClient/:id', auth.auth, cartController.getCartClient);
api.delete('/deleteItemToCartClient/:id', auth.auth, cartController.deleteItemToCartClient);

module.exports = api;