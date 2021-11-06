'use-strict';

const config = require('../../models/config-model');
const fileSystem = require('fs');
const path = require('path');
const ID_CONFIG = '617303e21247e4ef6fb2a23c';

const getLogoEcommerce = async(request, response) => {
    var image = request.params['image'];
    var pathImage;
    fileSystem.stat('././uploads/configs/' + image, function(error) {
        if (!error) {
            pathImage = '././uploads/configs/' + image;
            response.status(200).sendFile(path.resolve(pathImage)); // devolvemos la imagen al front
        } else {
            pathImage = '././uploads/default.jpg/';
            response.status(200).sendFile(path.resolve(pathImage)); // devolvemos la imagen al front  
        }
    });
};

const getConfigEcommerce = async(request, response) => {
    var register = await config.findById({ _id: ID_CONFIG });
    response.status(200).send({ data: register });
};

module.exports = {
    getLogoEcommerce: getLogoEcommerce,
    getConfigEcommerce: getConfigEcommerce
};