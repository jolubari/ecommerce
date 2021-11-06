'use-strict';

var express = require('express');

//inicializar el controlador del producto
var productBalanceController = require('../../controllers/back-office/product-balance-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');
// usar middleware para almacenar imagen:
var multiParty = require('connect-multiparty');
var path = multiParty({ uploadDir: '././uploads/products' });

//Balance
api.get('/getBalanceProduct/:id', auth.auth, productBalanceController.getBalanceProduct);
api.delete('/deleteBalanceProduct/:id', auth.auth, productBalanceController.deleteBalanceProduct);
api.post('/registerBalanceProduct', auth.auth, productBalanceController.registerBalanceProduct);
//product variety
api.put('/updateVarietiesProduct/:id', auth.auth, productBalanceController.updateVarietiesProduct);
// gallery
api.put('/addImageGalleryProduct/:id', [auth.auth, path], productBalanceController.addImageGalleryProduct);
api.put('/deleteImageGalleryProduct/:id', [auth.auth, path], productBalanceController.deleteImageGalleryProduct);


module.exports = api;