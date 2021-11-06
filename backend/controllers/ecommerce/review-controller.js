"use-strict";


var client = require("../../models/client-model"); // inicializar el modelo cliente
var product = require("../../models/product-model"); // inicializar el modelo cliente
var sale = require("../../models/sale-model"); // inicializar el modelo cliente
var review = require("../../models/review-model"); // inicializar el modelo cliente

var bCrypt = require("bcrypt-nodejs");
var jwt = require("../../helpers/jwt");

const emitReviewProduct = async(request, response) => {
    if (request.user) {
        var data = request.body;

        var register = await review.create(data);

        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getReviewProduct = async(request, response) => {
    var id = request.params['id'];

    var register = await review.find({ product: id }).sort({ createdAt: -1 });

    response.status(200).send({ data: register });
};

const getReviewsClient = async(request, response) => {
    if (request.user) {
        var id = request.params['idClient'];

        var reviews = await review.find({ client: id }).populate('client').sort({ createdAt: -1 });

        response.status(200).send({ data: reviews });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getReviewsProduct = async(request, response) => {
    var id = request.params['idProduct'];

    var reviews = await review.find({ product: id }).populate('client').sort({ createdAt: -1 });
    response.status(200).send({ data: reviews });
};

module.exports = {
    emitReviewProduct: emitReviewProduct,
    getReviewProduct: getReviewProduct,
    getReviewsClient: getReviewsClient,
    getReviewsProduct: getReviewsProduct
};