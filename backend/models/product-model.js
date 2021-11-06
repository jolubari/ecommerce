"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var productSchema = schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    gallery: [{ type: Object, required: false }],
    cover: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    stock: { type: Number, required: true },
    sales_number: { type: Number, default: 0, required: true },
    points_number: { type: Number, default: 0, required: true },
    varieties: [{ type: Object, require: false }],
    variety_title: { type: String, require: false },
    category: { type: String, required: true },
    state: { type: String, default: 'Edition', required: true },
    createdAt: { type: Date, default: Date.now(), require: true }
});

module.exports = mongoose.model("product", productSchema);