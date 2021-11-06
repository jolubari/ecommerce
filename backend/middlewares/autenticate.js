"use-strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "joseluisbarba"; // para decodificar el token si la clave es distinta a la del jwt.js no lo encuentra
var payload = null;
exports.auth = function(request, response, next) {
    // Verificar si se envia el token en el header
    if (!request.headers.authorization) {
        return response.status(403).send({ message: " Not headers error" });
    }
    // verficar si el token ha expirado:
    var token = request.headers.authorization.replace(/['"]+/g, "");

    var segment = token.split("."); // token fraccionado por puntos

    if (segment.length !== 3) {
        return response.status(403).send({ message: "Invalid token" });
    } else {
        try {
            payload = jwt.decode(token, secret); // pasamos el token y la llave para decodificar el token
            //validar expiracion token
            if (payload.exp < moment.unix()) {
                // si la fecha expiracion es menor o igual a hoy
                return response.status(403).send({ message: "Expirated token" });
            }
        } catch (error) {
            return response.status(403).send({ message: "Invalid token" });
        }
    }

    request.user = payload; // creamos propiedad user en el payload y le pasamos el token decodificado
    next();
};