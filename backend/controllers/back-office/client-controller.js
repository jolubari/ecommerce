"use-strict";

var client = require("../../models/client-model"); // inicializar el modelo cliente
var bCrypt = require("bcrypt-nodejs");

const register = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var data = request.body;

        bCrypt.hash('123456789', null, null, async function(err, hash) {
            if (hash) {
                data.password = hash;
                let register = await client.create(data);
                response.status(200).send({ data: register });
            } else {
                response.status(200).send({ message: "There was an error on the server", data: undefined });
            }
        });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getClient = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        try {
            var register = await client.findById({ _id: id });
            response.status(200).send({ data: register });
        } catch (error) {
            response.status(200).send({ data: undefined });
        }
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getClients = async(request, response) => {
    if (request.user && request.user.role === "admin") {
        let registers = await client.find();
        response.status(200).send({ data: registers });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const getFilteredClients = async(request, response) => {
    if (request.user && request.user.role === "admin") {
        const filterType = request.params["filterType"];
        const filter = request.params["filter"];

        if (filterType === null || filterType === "null") {
            const registers = await client.find();
            response.status(200).send({ data: registers });
        } else {
            if (filterType === "firstSurname") {
                const regex = await client.find({
                    first_surname: new RegExp(filter, "i"),
                });
                response.status(200).send({ data: regex });
            }
            if (filterType === "email") {
                const regex = await client.find({ email: new RegExp(filter, "i") });
                response.status(200).send({ data: regex });
            }
        }
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const updateClient = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var data = request.body;
        var register = await client.findByIdAndUpdate({ _id: id }, {
            first_name: data.first_name,
            second_name: data.second_name,
            first_surname: data.first_surname,
            second_surname: data.second_surname,
            email: data.email,
            country: data.country,
            password: data.password,
            profile_image: data.profile_image,
            phone: data.phone,
            gender: data.gender,
            born_date: data.born_date,
            identity_document: data.identity_document
        });
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const deleteClient = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var register = await client.findByIdAndRemove({ _id: id });
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

module.exports = {
    register: register,
    getClient: getClient,
    getClients: getClients,
    getFilteredClients: getFilteredClients,
    updateClient: updateClient,
    deleteClient: deleteClient,
};