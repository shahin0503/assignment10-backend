const CartModel = require('../models/cart_model')

const cartController = {

    addToCart: async (req,res) => {
        try {
            const { product, user, quantity } = req.body

            const foundCart = await CartModel.findOne({ user: user })

            //if cart doesn't exist
            if (!foundCart) {
                const newCart = new CartModel({ user: user })
                newCart.items.push({
                    product: product,
                    quantity: quantity
                })

                await newCart.save()

                return res.json({ success: true, data: newCart, message: 'Product added to cart' })
            }

            //Deleting the item if it already exists
          const deletedItem =  await CartModel.findOneAndUpdate(
                {
                    user: user, 'items.product': product
                },{
                    $pull: {items: {product: product }}
                },
                {new: true }
            )

            // If cart already exist
          const updatedCart =  await CartModel.findOneAndUpdate(
                { user: user },
                { $push: { items: { product: product, quantity: quantity } } },
                { new: true }
            ).populate('items.product')

            return res.json({ success: true, data: updatedCart.items, message: 'Product added to cart' })

        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error })
        }
    },

    removeFromCart: async (req,res) => {
        try {
            const { user, product } = req.body

            const updatedCart = await CartModel.findOneAndUpdate(
                {user: user},
                { $pull: { items: { product: product }}},
                {new: true}
            ).populate('items.product')

            return res.json({ success: true, data: updatedCart.items, message: 'Product removed from cart' })

        } catch (error) {
            return res.json({ success: false, message: error })
        }
    },

    getCartForUser: async(req,res) => {
        try {
            const user = req.params.user
            const foundCart = await CartModel.findOne({ user: user}).populate('items.product')

            if(!foundCart){
                return res.json({ success: true, data:[] })
            }

            return res.json({ success: true, data: foundCart.items })
            
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
}

module.exports = cartController