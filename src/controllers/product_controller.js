const ProductModel = require('../models/product_model')
const categoryController = require('./category_controller')

const productController = {

    createProduct: async (req, res) => {
        try {
            const productData = req.body
            const newProduct = new ProductModel(productData)
            await newProduct.save()

            return res.json({ success: true,data: newProduct, message: 'Product created!!'})
            
        } catch (error) {
            res.json({success: false, message: error})
        }
    },

    fetchAllProducts: async (req,res) => {
        try {
            const products = await ProductModel.find()
            return res.json({ success: true, data: products })
            
        } catch (error) {
            res.json({success: false, message: error})
        }
    },

    fetchProductByCategory: async (req, res) =>{
        try {
            const categoryId = req.params.id
            const products = await ProductModel.find({ category: categoryId})

            return res.json({ success: true, data: products })
            
        } catch (error) {
            res.json({success: false, message: error}) 
        }
    }
}

module.exports = productController