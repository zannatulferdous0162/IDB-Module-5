const express = require('express');
const productController = require('../controller/PproductController');

const router = express.Router();

// Route to add a new product
router.post('/addProducts', productController.addProduct);
router.get('/products', productController.getProduct);
router.get('/product/:id', productController.getProductById);
router.post('/addToCart', productController.addToCart);
router.get('/cardFind', productController.getCart);

module.exports = router;