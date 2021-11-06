"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var cartSchema = schema({
    product: { type: schema.ObjectId, ref: 'product', required: true },
    client: { type: schema.ObjectId, ref: 'client', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    variety: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), require: true }
});

module.exports = mongoose.model("cart", cartSchema);