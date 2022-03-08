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
    expireAt: {
        type: Date,
        default: null
    }
});

doc.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Doc = mongoose.model("DelDog", doc);

module.exports = Doc;
