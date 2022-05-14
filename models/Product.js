const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        default: null
    },
    category: {
        type: String,
        default: null
    },
    stock: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Product', productSchema);