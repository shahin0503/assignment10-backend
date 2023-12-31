const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const UserRoutes = require('./routes/user_routes')
const CategoryRoutes = require('./routes/category_routes')
const ProductRoutes = require('./routes/product_routes')
const CartRoutes = require('./routes/cart_routes')
const OrderRoutes = require('./routes/order_routes')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())

mongoose.connect('mongodb+srv://admin:admin@cluster0.aprcmow.mongodb.net/ecommerce?retryWrites=true&w=majority')

app.use('/api/user', UserRoutes)
app.use('/api/category', CategoryRoutes)
app.use('/api/product', ProductRoutes)
app.use('/api/cart', CartRoutes)
app.use('/api/order', OrderRoutes)

app.get('/', (req,res)=> {
    res.send('Hello World!!!')
})

const PORT =  8080
app.listen(PORT, ()=> console.log('Server started at PORT:', PORT))
