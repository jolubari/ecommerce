'use-strict';

var config = require('../../models/config-model');
var fs = require('fs');

const getConfig = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var register = await config.findById({ _id: '617303e21247e4ef6fb2a23c' });
        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

const updateConfig = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        var data = request.body;
        var register;
        if (request.files) {
            var imagePath = request.files.logo.path;
            var imageName = imagePath.split('/');
            var logoName = imageName[2];

            register = await config.findByIdAndUpdate({ _id: '617303e21247e4ef6fb2a23c' }, {
                categories: JSON.parse(data.categories),
                business_name: data.business_name,
                logo: logoName,
                serial_number: data.serial_number,
                correlative_number: data.correlative_number
            });

            // borrar imagenes anterior a la de la actualizacion
            fs.stat('././uploads/configs/' + register.logo, function(error) {
                if (register.logo) {
                    fs.unlink('././uploads/configs/' + register.logo, (err) => {
                        if (err)
                            throw error;
                    });
                }
            });
        } else {
            register = await config.findByIdAndUpdate({ _id: '617303e21247e4ef6fb2a23c' }, {
                categories: data.categories,
                business_name: data.business_name,
                serial_number: data.serial_number,
                correlative_number: data.correlative_number
            });
        }

        response.status(200).send({ data: register });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};


module.exports = {
    getConfig: getConfig,
    updateConfig: updateConfig,
};