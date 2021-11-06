'use-strict';

var express = require('express');

//inicializar el controlador del cliente
var couponController = require('../../controllers/back-office/coupon-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

api.post('/registerCoupon', auth.auth, couponController.registerCoupon);
api.get('/getCoupons', auth.auth, couponController.getCoupons);
api.get('/getFilteredCoupons/:filter?', auth.auth, couponController.getFilteredCoupons);
api.get('/getCoupon/:id', auth.auth, couponController.getCoupon);
api.put('/updateCoupon/:id', auth.auth, couponController.updateCoupon);
api.delete('/deleteCoupon/:id', auth.auth, couponController.deleteCoupon);


module.exports = api;