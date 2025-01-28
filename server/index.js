const express = require('express')

const router = express.Router();
const Order = require("../models/Order"); // Order Model
const cors = require('cors')
const mongoose = require('mongoose')
const productRouter = require('./router/productRouter')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())




mongoose.connect('mongodb+srv://products:wZHWOxlzb0AxFbvH@cluster0.hwuf8vx.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error)
})

app.use('/api', productRouter)



app.get('/', (req, res) => {
  res.send('server')
})

// Order Post API (অর্ডার সংরক্ষণ করবে)
router.post("/orders", async (req, res) => {
    try {
        const { userId, cartItems, totalPrice, paymentMethod, address, phone, status } = req.body;
        const newOrder = new Order({ userId, cartItems, totalPrice, paymentMethod, address, phone, status });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: "Error saving order" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
module.exports = router;