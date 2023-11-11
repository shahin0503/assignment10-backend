const OrderModel = require('../models/order_model')

const orderController = {

    createOrder: async(req,res) => {
        try {
            const { user, items } = req.body
            const newOrder = new OrderModel({
                user: user,
                items: items
            })
            await newOrder.save()

            return res.json( { success: true, data: newOrder, message: 'Order created!'})

        } catch (error) {
            return res.json({ success: false, message: error })
        }
    },
    FetchOrdersForUser: async(req,res) => {
        try {
            const userId = req.params.userId
            const foundOrders = await OrderModel.find({'user._id' : userId})

            return res.json( { success: true, data: foundOrders})
            
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    },

    updateOrderStatus: async(req,res) => {
        try {
            const { orderId, status } = req.body
            const updatedOrder = await OrderModel.findOneAndUpdate(
                { _id: orderId},
                { status: status},
                { new: true }
            )

            return res.json( { success: true, data: updatedOrder})
            
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
}

module.exports = orderController