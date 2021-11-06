"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var balanceSchema = schema({
    product: { type: schema.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true },
    admin: { type: schema.ObjectId, ref: 'admin', required: true },
    provider: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), require: true }
});

module.exports = mongoose.model("balance", balanceSchema);