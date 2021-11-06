"use-strict";

var coupon = require("../../models/coupon-model");


const registerCoupon = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var data = request.body;
        var register = await coupon.create(data);
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getCoupon = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        try {
            var register = await coupon.findById({ _id: id }).sort({ createdAt: -1 });
            response.status(200).send({ data: register });
        } catch (error) {
            response.status(200).send({ data: undefined });
        }
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getCoupons = async(request, response) => {
    if (request.user && request.user.role === 'admin') {

        var data = await coupon.find();

        response.status(200).send({ data: data });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getFilteredCoupons = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var filter = request.params['filter'];

        var filteredData = await coupon.find({ code: new RegExp(filter, 'i') });

        response.status(200).send({ data: filteredData });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const updateCoupon = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var data = request.body;
        let updateRegister = await coupon.findByIdAndUpdate({
            _id: id // id del registro a actualizar
        }, {
            code: data.code,
            type: data.type,
            value: data.value,
            limit: data.limit,
        });

        response.status(200).send({ data: updateRegister });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const deleteCoupon = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var register = await coupon.findByIdAndRemove({ _id: id });
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};


module.exports = {
    registerCoupon: registerCoupon,
    getCoupon: getCoupon,
    getCoupons: getCoupons,
    getFilteredCoupons: getFilteredCoupons,
    updateCoupon: updateCoupon,
    deleteCoupon: deleteCoupon
};