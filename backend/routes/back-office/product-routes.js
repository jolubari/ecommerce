'use-strict';

var express = require('express');

//inicializar el controlador del producto
var productController = require('../../controllers/back-office/product-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');
// usar middleware para almacenar imagen:
var multiParty = require('connect-multiparty');
var path = multiParty({ uploadDir: '././uploads/products' });

// Product
api.post('/registerProduct', [auth.auth, path], productController.registerProduct);
api.get('/getProducts', auth.auth, productController.getProducts);
api.get('/getFilteredProducts/:filter?', auth.auth, productController.getFilteredProducts); // auth es el middleware
api.get('/getProduct/:id', auth.auth, productController.getProduct);
api.put('/updateProduct/:id', [auth.auth, path], productController.updateProduct);
api.delete('/deleteProduct/:id', auth.auth, productController.deleteProduct);

module.exports = api;