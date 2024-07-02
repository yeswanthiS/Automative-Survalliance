// models/Image.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    data: Buffer,
    contentType: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', ImageSchema);
