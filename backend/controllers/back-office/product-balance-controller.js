"use-strict";

var product = require("../../models/product-model"); // inicializar el modelo product
var balance = require("../../models/balance-model"); // inicializar el modelo balance

const registerBalanceProduct = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var data = request.body;

        var register = await balance.create(data);
        // Obtener el registro del producto
        var productElement = await product.findById({ _id: register.product });
        // Calcular el nuevo stock
        // stock actual                 // stock a aumentar
        var newStock = parseInt(productElement.stock) + parseInt(register.quantity);
        // Actualizacion del nuevo stock al producto
        var productRegister = await product.findByIdAndUpdate({ _id: register.product }, { stock: newStock });
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getBalanceProduct = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];

        var register = await balance.find({ product: id })
            .populate('admin') // populate para obtener la data de una coleccion en este la collection admin declarada en el model de balance
            .sort({ createdAt: 'desc' }); // ordenar los resultados de mayor a menor fecha creacion
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const deleteBalanceProduct = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        // obtener id del balance
        var id = request.params['id'];
        // eliminando balance
        var register = await balance.findByIdAndDelete({ _id: id });
        // Obtener el registro del producto
        var productElement = await product.findById({ _id: register.product });
        // Calcular el nuevo stock
        var newStock = parseInt(productElement.stock) - parseInt(register.quantity);
        // Actualizacion del nuevo stock al producto
        var productRegister = await product.findByIdAndUpdate({ _id: register.product }, { stock: newStock });

        response.status(200).send({ data: productRegister });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const updateVarietiesProduct = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var data = request.body;
        let updateRegister;

        updateRegister = await product.findByIdAndUpdate({
            _id: id
        }, {
            variety_title: data.variety_title,
            varieties: data.varieties,
        });
        response.status(200).send({ data: updateRegister });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const addImageGalleryProduct = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var data = request.body;

        var imagePath = request.files.image.path;
        var imageName = imagePath.split('/');
        var imageCompleteName = imageName[2];

        var register = await product.findByIdAndUpdate({ _id: id }, {
            $push: {
                gallery: {
                    image: imageCompleteName,
                    _id: data._id
                }
            }
        });

        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const deleteImageGalleryProduct = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var data = request.body;

        var register = await product.findByIdAndUpdate({ _id: id }, {
            $pull: {
                gallery: { _id: data._id }
            }
        });

        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

module.exports = {
    getBalanceProduct: getBalanceProduct,
    deleteBalanceProduct: deleteBalanceProduct,
    registerBalanceProduct: registerBalanceProduct,
    updateVarietiesProduct: updateVarietiesProduct,
    addImageGalleryProduct: addImageGalleryProduct,
    deleteImageGalleryProduct: deleteImageGalleryProduct
};