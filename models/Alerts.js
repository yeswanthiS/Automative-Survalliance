// models/Alert.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
    message: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', AlertSchema);
