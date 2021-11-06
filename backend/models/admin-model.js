"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var adminSchema = schema({
    first_name: { type: String, required: true },
    second_name: { type: String, required: true },
    first_surname: { type: String, required: true },
    second_surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    identity_document: { type: String, required: true },
});

module.exports = mongoose.model("admin", adminSchema);