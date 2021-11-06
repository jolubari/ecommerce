"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var contactSchema = schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    subject: { type: String, required: true },
    state: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), require: true }
});

module.exports = mongoose.model("contact", contactSchema);