"use-strict";

var address = require("../../models/address-model");

const registerAddress = async(request, response) => {
    if (request.user) {
        var data = request.body;
        // si el usuario registra la nueva direccion como principal
        if (data.principal) {
            // obtener direcciones para convertir a principal la nueva poniendo las demas a principal=false
            var addresses = await address.find({ client: data.client });
            addresses.forEach(async element => {
                await address.findByIdAndUpdate({ _id: element._id }, { principal: false });
            });
        }

        var register = await address.create(data);
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getClientAddresses = async(request, response) => {
    if (request.user) {

        var id = request.params['id'];
        var addresses = await address.find({ client: id }).populate('client').sort({ createdAt: -1 }); // populate para recuperar datos del objeto client y sort para ordenar por fecha creacion mas reciente

        response.status(200).send({ data: addresses });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const updatePrincipalAddress = async(request, response) => {
    if (request.user) {
        var idAddress = request.params['id'];
        var idClient = request.params['idClient'];

        // obtener direcciones para convertir a principal la nueva poniendo las demas a principal=false
        var addresses = await address.find({ client: idClient });

        addresses.forEach(async element => {
            await address.findByIdAndUpdate({ _id: element._id }, { principal: false });
        });

        // establezco la direccion recibida como principal
        var registerUpdated = await address.findByIdAndUpdate({ _id: idAddress }, { principal: true });

        response.status(200).send({ data: registerUpdated });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getPrincipalAddressClient = async(request, response) => {
    if (request.user) {

        var id = request.params['id'];
        var principalAddress = undefined;
        principalAddress = await address.findOne({ client: id, principal: true });
        if (principalAddress) {
            response.status(200).send({ data: principalAddress });
        } else {
            response.status(200).send({ data: undefined });
        }


    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

module.exports = {
    registerAddress: registerAddress,
    getClientAddresses: getClientAddresses,
    updatePrincipalAddress: updatePrincipalAddress,
    getPrincipalAddressClient: getPrincipalAddressClient
};