const mongoose = require("mongoose");

const doc = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    customUrl: {
        type: String,
        required: true,
        unique: true,
    },
    expiryDate: {
        type: String,
        required: true,
    }
});

const Doc = mongoose.model("DelDog", doc);

module.exports = Doc;
