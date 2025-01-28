const mongoose = require('mongoose');

const productSchema =  mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: [String],
        required: true
    },
    color: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;