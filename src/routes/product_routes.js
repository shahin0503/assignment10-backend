const ProductRoutes = require('express').Router()
const productController = require('../controllers/product_controller')

ProductRoutes.get('/', productController.fetchAllProducts)
ProductRoutes.get('/category/:id', productController.fetchProductByCategory)
ProductRoutes.post('/', productController.createProduct)

module.exports = ProductRoutes 