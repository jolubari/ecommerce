"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var configSchema = schema({
    categories: [{ type: Object, required: true }],
    business_name: { type: String, required: true },
    logo: { type: String, required: true },
    serial_number: { type: String, required: true },
    correlative_number: { type: String, required: true },
});

module.exports = mongoose.model("config", configSchema);