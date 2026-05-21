const userController = require('../controllers/userController.js')
const { Router } = require('express')
const router = Router()
router.get('/get/:id', userController.getUser)
router.put('/update', userController.updateUser)
module.exports = router