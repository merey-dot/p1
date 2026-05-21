const AdminController = require('../controllers/adminController.js')
const { Router } = require('express')
const router = Router()

router.post('/create', AdminController.create)
router.get('/get', AdminController.get)
router.put('/update/:id', AdminController.update)
router.delete('/delete/:id', AdminController.delete)
router.get('/getUsers', AdminController.getUsers)
router.put('/banUser/:id', AdminController.banUser)

module.exports = router