const express = require('express')
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
