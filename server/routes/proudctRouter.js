const { Router } = require('express')
const router = Router()

const productController = require('../controllers/productController')

router.get('/get', productController.get)

module.exports = router