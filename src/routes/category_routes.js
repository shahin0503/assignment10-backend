const CategoryRoutes = require('express').Router()
const categoryController = require('../controllers/category_controller')

CategoryRoutes.get('/', categoryController.fetchAllCategories)
CategoryRoutes.get('/:id', categoryController.fetchCategoryById)
CategoryRoutes.post('/', categoryController.createCategory)

module.exports = CategoryRoutes 