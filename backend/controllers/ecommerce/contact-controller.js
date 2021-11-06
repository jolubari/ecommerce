"use-strict";

var contact = require("../../models/contact-model"); // inicializar el modelo cliente

const sendMessage = async(request, response) => {
    var data = request.body;
    data.state = 'Abierto';
    const register = await contact.create(data);
    response.status(200).send({ data: register });
};



module.exports = {
    sendMessage: sendMessage
};