"use-strict";

var sale = require("../../models/sale-model");
var saleDetails = require("../../models/sale-details-model");

const getOrdersClient = async(request, response) => {
    if (request.user) {

        var idClient = request.params['idClient'];

        var registers = await sale.find({ client: idClient }).sort({ createdAt: -1 });

        if (registers.length >= 1) {
            response.status(200).send({ data: registers });
        } else {
            response.status(200).send({ data: undefined });
        }

    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getDetailsOrderClient = async(request, response) => {
    if (request.user) {

        var idSale = request.params['idSale'];

        try {
            var saleRegister = await sale.findById({ _id: idSale }).populate('address').populate('client');
            var detailsRegister = await saleDetails.find({ sale: idSale }).populate('product');

            response.status(200).send({ data: saleRegister, details: detailsRegister });

        } catch (error) {
            response.status(200).send({ data: undefined });
        }

    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

module.exports = {
    getOrdersClient: getOrdersClient,
    getDetailsOrderClient: getDetailsOrderClient
};