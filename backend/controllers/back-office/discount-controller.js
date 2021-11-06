"use-strict";

var discount = require('../../models/discount-model');
var fileSystem = require('fs');
var path = require('path');


const registerDiscount = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var data = request.body;

        var imagePath = request.files.banner.path;
        var imageName = imagePath.split('/');
        var bannerName = imageName[2];

        data.banner = bannerName;

        var register = await discount.create(data);

        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getDiscount = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        try {
            var register = await discount.findById({ _id: id });
            response.status(200).send({ data: register });
        } catch (error) {
            response.status(200).send({ data: undefined });
        }
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getDiscounts = async(request, response) => {
    if (request.user && request.user.role === 'admin') {

        var data = await discount.find().sort({ createdAt: -1 });

        response.status(200).send({ data: data });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getFilteredDiscounts = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var filter = request.params['filter'];

        var filteredData = await discount.find({ title: new RegExp(filter, 'i') }).sort({ createdAt: -1 });

        response.status(200).send({ data: filteredData });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const updateDiscount = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var data = request.body;
        let updateRegister;

        if (request.files) {
            // si hay imagen
            var imagePath = request.files.banner.path;
            var imageName = imagePath.split('/');
            var bannerName = imageName[2];

            updateRegister = await discount.findByIdAndUpdate({
                _id: id
            }, {
                title: data.title,
                banner: bannerName,
                discount: data.discount,
                init_date: data.init_date,
                end_date: data.end_date
            });
            // borrar imagenes anterior a la de la actualizacion
            fileSystem.stat('././uploads/discounts/' + updateRegister.banner, function(error) {
                if (updateRegister.banner) {
                    fileSystem.unlink('././uploads/discounts/' + updateRegister.banner, (err) => {
                        if (err)
                            throw error;
                    });
                }
            });
        } else {
            updateRegister = await discount.findByIdAndUpdate({
                _id: id
            }, {
                title: data.title,
                discount: data.discount,
                init_date: data.init_date,
                end_date: data.end_date
            });
        }
        response.status(200).send({ data: updateRegister });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const deleteDiscount = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var register = await discount.findByIdAndRemove({ _id: id });
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};


module.exports = {
    registerDiscount: registerDiscount,
    getDiscounts: getDiscounts,
    getFilteredDiscounts: getFilteredDiscounts,
    getDiscount: getDiscount,
    updateDiscount: updateDiscount,
    deleteDiscount: deleteDiscount
};