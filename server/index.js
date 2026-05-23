
const productController = require('./controllers/productController.js')
const cookieParser = require('cookie-parser')
const productRoute = require('./routes/proudctRouter')
const adminRoute = require('./routes/adminRoute')
const authRoute = require('./routes/authRoute.js')
const userRoute = require('./routes/userRouter')
const express = require('express')
const cors = require('cors')
const app = express()

const { requireAdmin } = require('./middleware/auth')
const { auth } = require('./middleware/auth')

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'true',
    credentials: true
}))
app.use('/auth', authRoute)
app.use('/user', auth, userRoute)
app.use('/products', productRoute)
app.use('/admin', auth, requireAdmin, adminRoute)
app.get('/category/get', productController.getCategories)

app.listen(5000, () => console.log('server started'))
