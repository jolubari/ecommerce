"use-strict";

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var discountSchema = schema({
    title: { type: String, required: true },
    banner: { type: String, required: true },
    discount: { type: Number, required: true },
    init_date: { type: String, required: true },
    end_date: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), require: true }
});

module.exports = mongoose.model("discount", discountSchema);