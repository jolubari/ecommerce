"use-strict";

const admin = require("../../models/admin-model"); // inicializar el modelo
const bCrypt = require("bcrypt-nodejs");
const jwt = require("../../helpers/jwt");

const registerAdmin = async(request, response) => {
    var data = request.body;
    var adminsList = [];
    adminsList = await admin.find({ email: data.email }); // buscar si el correo ya existe:

    if (adminsList.length === 0) {
        if (data.password) {
            bCrypt.hash(data.password, null, null, async function(error, hash) {
                if (hash) { // si hay una contraseña encriptada se registra al usuario   
                    data.password = hash;
                    var register = await admin.create(data);
                    response.status(200).send({ data: register });
                } else {
                    response.status(200).send({ message: "Error server", data: undefined });
                }
            });
        } else {
            response.status(200).send({ message: "Not password", data: undefined });
        }
    } else {
        response.status(200).send({ message: "The e-mail exist", data: undefined });
    }
};

const loginAdmin = async(request, response) => {
    const data = request.body;
    let adminsList = [];

    adminsList = await admin.find({ email: data.email });
    if (adminsList.length > 0) { // Si el email existe
        var user = adminsList[0];
        bCrypt.compare(data.password, user.password, async function(error, check) { // compara contraseña introducida con la del usuario en BBDD
            if (check) { // si la contraseña es correcta
                response.status(200).send({ data: user, token: jwt.createToken(user) }); // crea token y se loguea el usuario
            } else {
                response.status(200).send({ message: "Incorrect password", data: undefined });
            }
        });
    } else {
        response.status(200).send({ message: "Email not found", data: undefined });
    }
};

module.exports = {
    registerAdmin: registerAdmin,
    loginAdmin: loginAdmin,
};