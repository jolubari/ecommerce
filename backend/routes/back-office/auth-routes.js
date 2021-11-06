'use-strict';

var express = require('express');
var authController = require('../../controllers/back-office/auth-controller');
var api = express.Router();

api.post('/registerAdmin', authController.registerAdmin); // url vinculada al metodo adminRegister
api.post('/loginAdmin', authController.loginAdmin); // url vinculada al metodo adminLogin

module.exports = api;