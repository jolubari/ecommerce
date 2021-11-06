"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var reviewSchema = schema({
    product: { type: schema.ObjectId, ref: 'product', required: true },
    client: { type: schema.ObjectId, ref: 'client', required: true },
    sale: { type: schema.ObjectId, ref: 'sale', required: true },
    stars: { type: Number, required: true },
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), require: true }
});

module.exports = mongoose.model("review", reviewSchema);