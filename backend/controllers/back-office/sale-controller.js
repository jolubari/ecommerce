"use-strict";

var path = require('path');



var sale = require("../../models/sale-model");

const getSales = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var fromDate = request.params['from'];
        var toDate = request.params['to'];
        var sales = [];

        if (fromDate == 'undefined' && toDate == 'undefined') {
            sales = await sale.find().populate('client').populate('address').sort({ createdAt: -1 });
            response.status(200).send({ data: sales });
        } else {
            var ttFromDate = Date.parse(new Date(fromDate + 'T00:00:00')) / 1000;
            var tttoDate = Date.parse(new Date(toDate + 'T00:00:00')) / 1000;

            var tempSales = await sale.find().populate('client').populate('address').sort({ createdAt: -1 });

            tempSales.forEach(item => {
                var ttCreated = Date.parse(new Date(item.createdAt)) / 1000;
                if (ttCreated >= ttFromDate && ttCreated <= tttoDate) {
                    sales.push(item);
                }
            });
            response.status(200).send({ data: sales });
        }



    } else {
        response.status(500).send({ message: "Not Access" });
    }
};


module.exports = {
    getSales: getSales,
};