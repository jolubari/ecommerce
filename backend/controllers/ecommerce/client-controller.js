"use-strict";

var client = require("../../models/client-model"); // inicializar el modelo cliente
var bCrypt = require("bcrypt-nodejs");
var jwt = require("../../helpers/jwt");

const register = async(request, response) => {
    var data = request.body;

    // buscar si el correo ya existe:
    var clientsList = [];
    clientsList = await client.find({ email: data.email });

    // validacion
    if (clientsList.length === 0) {
        if (data.password) {
            bCrypt.hash(data.password, null, null, async function(error, hash) {
                if (hash) {
                    // si hay una contraseña encriptada
                    //regitro de usuario
                    data.password = hash;
                    var register = await client.create(data);
                    response.status(200).send({ data: register });
                } else {
                    response
                        .status(200)
                        .send({ message: "Error server", data: undefined });
                }
            });
        } else {
            response.status(200).send({ message: "Not password", data: undefined });
        }
    } else {
        response.status(200).send({ message: "The e-mail exist", data: undefined });
    }
};

const login = async function(request, response) {
    var data = request.body;
    let clientsList = [];

    clientsList = await client.find({ email: data.email });
    if (clientsList.length === 0) {
        response.status(200).send({ message: "Email not found", data: undefined });
    } else {
        //login
        const user = clientsList[0];
        bCrypt.compare(data.password, user.password, async function(error, check) {
            // desencriptar el password
            if (check) {
                response.status(200).send({ data: user, token: jwt.createToken(user) }); // cuando logea mando el user y el token
            } else {
                response
                    .status(200)
                    .send({ message: "Incorrect password", data: undefined });
            }
        });
    }
};

const getClientEcommerce = async function(request, response) {
    if (request.user) {
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

const updateClientEcommerce = async function(request, response) {
    if (request.user) {
        var id = request.params['id'];
        var data = request.body;

        if (data.password) {
            bCrypt.hash(data.password, null, null, async function(err, hash) { // hash es la contraseña
                if (hash) {
                    data.password = hash;
                    var register = await client.findByIdAndUpdate({ _id: id }, {
                        first_name: data.first_name,
                        second_name: data.second_name,
                        first_surname: data.first_surname,
                        second_surname: data.second_surname,
                        // email: data.email,  ---- no lo envio porque si se pone otro correo de otra cuenta un usuario puede cambiar el correo de otra cuenta
                        phone: data.phone,
                        born_date: data.born_date,
                        identity_document: data.identity_document,
                        gender: data.gender,
                        country: data.country,
                        password: hash
                    });
                    response.status(200).send({ data: register });
                } else {
                    response.status(200).send({ message: "There was an error on the server", data: undefined });
                }
            });
        } else {
            var register = await client.findByIdAndUpdate({ _id: id }, {
                first_name: data.first_name,
                second_name: data.second_name,
                first_surname: data.first_surname,
                second_surname: data.second_surname,
                // email: data.email,
                phone: data.phone,
                born_date: data.born_date,
                identity_document: data.identity_document,
                gender: data.gender,
                country: data.country
            });
            response.status(200).send({ data: register });
        }
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

module.exports = {
    register: register,
    login: login,
    getClientEcommerce: getClientEcommerce,
    updateClientEcommerce: updateClientEcommerce
};