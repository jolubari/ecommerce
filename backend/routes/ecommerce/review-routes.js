'use-strict';

var express = require('express');

var reviewController = require('../../controllers/ecommerce/review-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

api.post('/emitReviewProduct', auth.auth, reviewController.emitReviewProduct);
api.get('/getReviewProduct/:id', reviewController.getReviewProduct);
api.get('/getReviewsClient/:idClient', auth.auth, reviewController.getReviewsClient);
api.get('/getReviewsProduct/:idProduct', reviewController.getReviewsProduct);

module.exports = api;