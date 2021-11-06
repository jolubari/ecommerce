"use-strict";

var discount = require('../../models/discount-model');
var fileSystem = require('fs');
var path = require('path');

const getActiveDiscount = async function(request, response) {
    var discounts = await discount.find().sort({ createdAd: -1 });
    var listDiscounts = [];
    // tratamiento de fechas
    var today = Date.parse(new Date().toString()) / 1000;
    discounts.forEach(element => {
        var ttInit = Date.parse(element.init_date + 'T00:00:00') / 1000;
        var ttEnd = Date.parse(element.end_date + 'T23:59:59') / 1000;

        if (today >= ttInit && today <= ttEnd) {
            listDiscounts.push(element);
        }
    });

    if (listDiscounts.length >= 1) {
        response.status(200).send({ data: listDiscounts });
    } else {
        response.status(200).send({ data: undefined });

    }
};

const getBannerDiscount = async(request, response) => {
    var image = request.params['image'];
    var pathImage;

    fileSystem.stat('././uploads/discounts/' + image, (error) => {
        if (!error) {
            pathImage = '././uploads/discounts/' + image;
            response.status(200).sendFile(path.resolve(pathImage)); // devolvemos la imagen al front
        } else {
            pathImage = '././uploads/default.jpg/';
            response.status(200).sendFile(path.resolve(pathImage)); // devolvemos la imagen al front  
        }
    });
};


module.exports = {
    getActiveDiscount: getActiveDiscount,
    getBannerDiscount: getBannerDiscount
};