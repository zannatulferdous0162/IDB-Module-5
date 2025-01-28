const mongoose = require('mongoose');

const cartSchema =  mongoose.Schema({
    productName: {
        type: String,
       
    },
    price: {
        type: Number,
        
    },
    image: {
        type: String,
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;