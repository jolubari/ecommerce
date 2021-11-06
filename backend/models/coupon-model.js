"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var couponSchema = schema({
    code: { type: String, required: true },
    type: { type: String, required: true }, // Porcentaje o precio fijo
    value: { type: Number, required: true },
    limit: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now(), require: true }
});

module.exports = mongoose.model("coupon", couponSchema);