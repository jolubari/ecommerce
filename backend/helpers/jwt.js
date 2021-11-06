'use-strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'joseluisbarba';

exports.createToken = (user) => {
    // datos a usar para generar el token
    const payload = {
        sub: user._id,
        first_name: user.first_name,
        first_surname: user.first_surname,
        email: user.email,
        role: user.role,
        iat: moment().unix(), // fecha en la que se creo el token
        exp: moment().add(7, 'days').unix() // fecha de expiracion del token 7 dias
    };
    return jwt.encode(payload, secret);
};