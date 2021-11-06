"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var saleDetailsSchema = schema({
    product: { type: schema.ObjectId, ref: 'product', required: true },
    client: { type: schema.ObjectId, ref: 'client', required: true },
    sale: { type: schema.ObjectId, ref: 'sale', required: true },
    subtotal: { type: Number, required: true },
    quantity: { type: Number, required: true },
    variety: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), require: true }
});

module.exports = mongoose.model("sale-details", saleDetailsSchema);