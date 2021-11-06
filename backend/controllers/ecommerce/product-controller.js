"use-strict";

var product = require("../../models/product-model"); // inicializar el modelo product
var fileSystem = require('fs');
var path = require('path');

const getCoverProduct = async(request, response) => {
    var image = request.params['image'];
    var pathImage;

    fileSystem.stat('././uploads/products/' + image, (error) => {
        if (!error) {
            pathImage = '././uploads/products/' + image;
            response.status(200).sendFile(path.resolve(pathImage)); // devolvemos la imagen al front
        } else {
            pathImage = '././uploads/default.jpg/';
            response.status(200).sendFile(path.resolve(pathImage)); // devolvemos la imagen al front  
        }
    });
};

const getProductEcommerce = async(request, response) => {
    if (request) {
        var id = request.params['id'];
        try {
            var register = await product.findById({ _id: id });
            response.status(200).send({ data: register });
        } catch (error) {
            response.status(200).send({ data: undefined });
        }
    } else {
        response.status(500).send({ message: "Server internal error" });
    }
};

const getProductsEcommerce = async function(request, response) {
    var data = await product.find().sort({ createdAt: -1 }); // ordenar por fecha de creacion
    if (data) {
        response.status(200).send({ data: data });
    } else {
        response.status(500).send({ message: "Server internal error" });
    }

};

const getNewProductsEcommerce = async function(request, response) {
    var data = await product.find().sort({ createdAt: -1 }).limit(8); // ordenar por fecha de creacion
    if (data) {
        response.status(200).send({ data: data });
    } else {
        response.status(500).send({ message: "Server internal error" });
    }

};

const getBestSellerProductsEcommerce = async function(request, response) {
    var data = await product.find().sort({ sales_number: -1 }).limit(8); // ordenar por fecha de creacion
    if (data) {
        response.status(200).send({ data: data });
    } else {
        response.status(500).send({ message: "Server internal error" });
    }

};

const getFilteredProductsEcommerce = async function(request, response) {
    var filter = request.params['filter'];
    var filteredData = await product.find({ title: new RegExp(filter, 'i') }).sort({ createdAt: -1 });
    if (filteredData) {
        response.status(200).send({ data: filteredData });
    } else {
        response.status(500).send({ message: "Server internal error" });
    }
};

const getDetailsProductEcommerce = async function(request, response) {
    var slug = request.params['slug'];
    var detailsData = await product.findOne({ slug: slug });
    if (detailsData) {
        response.status(200).send({ data: detailsData });
    } else {
        response.status(500).send({ message: "Server internal error" });
    }
};

const getRecomendedProductsEcommerce = async function(request, response) {
    var category = request.params['category'];
    var filteredData = await product.find({ category: category }).sort({ createdAt: -1 }).limit(8); // 8 productos como maximo
    if (filteredData) {
        response.status(200).send({ data: filteredData });
    } else {
        response.status(500).send({ message: "Server internal error" });
    }
};

module.exports = {
    getCoverProduct: getCoverProduct,
    getProductEcommerce: getProductEcommerce,
    getProductsEcommerce: getProductsEcommerce,
    getFilteredProductsEcommerce: getFilteredProductsEcommerce,
    getDetailsProductEcommerce: getDetailsProductEcommerce,
    getRecomendedProductsEcommerce: getRecomendedProductsEcommerce,
    getNewProductsEcommerce: getNewProductsEcommerce,
    getBestSellerProductsEcommerce: getBestSellerProductsEcommerce
};