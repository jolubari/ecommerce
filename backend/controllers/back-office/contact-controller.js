"use-strict";

var contact = require("../../models/contact-model");

const getMessages = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var register = await contact.find().sort({ createdAd: -1 });
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const closeMessage = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var id = request.params['id'];
        var register = await contact.findByIdAndUpdate({ _id: id }, { state: 'Cerrado' });
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};



module.exports = {
    getMessages: getMessages,
    closeMessage: closeMessage
};