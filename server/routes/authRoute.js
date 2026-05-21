const User = require('../controllers/authController.js')
const Products = require('../controllers/productController.js')


const { Router } = require('express')

const router = Router()

router.post('/register', User.register)
router.post('/login', User.login)
router.post('/refresh', User.refresh)
router.get('/products/get', Products.get)

module.exports = router