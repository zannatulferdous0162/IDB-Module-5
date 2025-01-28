const product = require('../model/product');
const Cart = require('../model/cart');


exports.addProduct = async (req, res) => {
    try {
        const addProducts = req.body;
        const newProduct = new product(addProducts);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        let filter = {};
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = minPrice;
            if (maxPrice) filter.price.$lte = maxPrice;
        }
        const products = await product.find(filter);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const productItem = await product.findOne({ _id: id });
        if (!productItem) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(productItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const product= req.body;

        const cart = new Cart(product);
        await cart.save();
        console.log(cart);
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};