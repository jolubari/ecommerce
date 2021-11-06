"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var saleSchema = schema({
    client: { type: schema.ObjectId, ref: 'client', required: true },
    sale_number: { type: String, required: true },
    subtotal: { type: Number, required: true },
    shipment_method: { type: String, required: true },
    shipment_price: { type: Number, required: true },
    code_transaction: { type: String, required: true },
    coupon: { type: String, required: false },
    state: { type: String, required: false },
    track: { type: String, required: false },
    address: { type: schema.ObjectId, ref: 'address', required: true },
    comments: { type: String, required: false },
    createdAt: { type: Date, default: Date.now(), require: true }
});

module.exports = mongoose.model("sale", saleSchema);