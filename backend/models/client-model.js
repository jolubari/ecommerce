"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var clientSchema = schema({
    first_name: { type: String, required: true },
    second_name: { type: String, required: false },
    first_surname: { type: String, required: true },
    second_surname: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: false },
    password: { type: String, required: true },
    profile_image: { type: String, default: "perfil.png", required: false },
    phone: { type: String, required: false },
    gender: { type: String, required: false },
    born_date: { type: String, required: false },
    identity_document: { type: String, required: false },
    createdAt: { type: Date, default: Date.now(), require: true }
});

module.exports = mongoose.model("client", clientSchema);