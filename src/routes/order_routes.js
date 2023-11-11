const OrderRoutes = require('express').Router()
const OrderController = require('../controllers/order_controller')

OrderRoutes.get('/:userId', OrderController.FetchOrdersForUser)
OrderRoutes.post('/', OrderController.createOrder)
OrderRoutes.put('/updateStatus', OrderController.updateOrderStatus)

module.exports = OrderRoutes