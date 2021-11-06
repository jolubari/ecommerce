'use-strict';

var express = require('express');

//inicializar el controlador del producto
var productController = require('../../controllers/ecommerce/product-controller');

var api = express.Router();

api.get('/getCoverProduct/:image', productController.getCoverProduct);
api.get('/getProductEcommerce/:id', productController.getProductEcommerce);
api.get('/getProductsEcommerce', productController.getProductsEcommerce);
api.get('/getFilteredProductsEcommerce/:filter?', productController.getFilteredProductsEcommerce);
api.get('/getDetailsProductEcommerce/:slug', productController.getDetailsProductEcommerce);
api.get('/getRecomendedProductsEcommerce/:category', productController.getRecomendedProductsEcommerce);
api.get('/getNewProductsEcommerce', productController.getNewProductsEcommerce);
api.get('/getBestSellerProductsEcommerce', productController.getBestSellerProductsEcommerce);


module.exports = api;