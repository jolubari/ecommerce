"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var addressSchema = schema({
    client: { type: schema.ObjectId, ref: 'client', required: true },
    receiver: { type: String, required: true },
    identity_document: { type: String, required: true },
    postal_code: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    district: { type: String, required: false },
    province: { type: String, required: false },
    city: { type: String, required: false },
    phone: { type: String, required: true },
    principal: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now(), require: true }
});

module.exports = mongoose.model("address", addressSchema);