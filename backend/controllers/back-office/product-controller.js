"use-strict";

var product = require("../../models/product-model"); // inicializar el modelo product
var balance = require("../../models/balance-model"); // inicializar el modelo balance
var fileSystem = require('fs');

const registerProduct = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var data = request.body;

        var imagePath = request.files.cover.path;
        var imageName = imagePath.split('/');
        var coverName = imageName[2];

        data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        data.cover = coverName;

        var register = await product.create(data);
        // hacemos un registro automatico en el inventario del nuevo producto
        var balanceRegister = await balance.create({
            product: register._id,
            quantity: data.stock,
            admin: request.user.sub,
            provider: 'First register'
        });

        response.status(200).send({ data: register, balanceRegister: balanceRegister });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getProduct = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        try {
            var register = await product.findById({ _id: id });
            response.status(200).send({ data: register });
        } catch (error) {
            response.status(200).send({ data: undefined });
        }
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getProducts = async(request, response) => {
    if (request.user && request.user.role === 'admin') {

        var data = await product.find();

        response.status(200).send({ data: data });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getFilteredProducts = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var filter = request.params['filter'];

        var filteredData = await product.find({ title: new RegExp(filter, 'i') });

        response.status(200).send({ data: filteredData });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const updateProduct = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var data = request.body;
        let updateRegister;

        if (request.files) {
            var imagePath = request.files.cover.path;
            var imageName = imagePath.split('/');
            var coverName = imageName[2];

            updateRegister = await product.findByIdAndUpdate({
                _id: id
            }, {
                title: data.title,
                stock: data.stock,
                price: data.price,
                category: data.category,
                description: data.description,
                content: data.content,
                cover: coverName
            });
            // borrar imagenes anterior a la de la actualizacion
            fileSystem.stat('././uploads/products/' + updateRegister.cover, function(error) {
                if (updateRegister.cover) {
                    fileSystem.unlink('././uploads/products/' + updateRegister.cover, (err) => {
                        if (err)
                            throw error;
                    });
                }
            });
        } else {
            updateRegister = await product.findByIdAndUpdate({
                _id: id
            }, {
                title: data.title,
                stock: data.stock,
                price: data.price,
                category: data.category,
                description: data.description,
                content: data.content
            });
        }
        response.status(200).send({ data: updateRegister });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const deleteProduct = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var register = await product.findByIdAndRemove({ _id: id });
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

module.exports = {
    registerProduct: registerProduct,
    getProduct: getProduct,
    getProducts: getProducts,
    getFilteredProducts: getFilteredProducts,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
};