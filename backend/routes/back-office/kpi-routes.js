'use-strict';

var express = require('express');

var kpiController = require('../../controllers/back-office/kpi-controller');

var api = express.Router();
var auth = require('../../middlewares/autenticate');

api.get('/getMonthlyEarningsKPI', auth.auth, kpiController.getMonthlyEarningsKPI);


module.exports = api;