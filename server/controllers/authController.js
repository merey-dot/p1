const prisma = require('../lib/prisma.js')
const jwt = require('jsonwebtoken')
// Остальной код
const bcrypt = require('bcrypt')

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                console.log('enter all')
                return res.status(400).json('fill in all')
            }
            const isUnique = await prisma.users.findUnique({
                where: { email }
            })
            if (isUnique) {
                return res.status(401).json({ message: 'Почта уже используется' })
            }
            const passwordHash = await bcrypt.hash(password, 10)
            const user = await prisma.users.create({
                data: {
                    name, email, passwordHash
                }
            })

            res.status(201).json(user)
        } catch (e) {
            console.log("register error", e)
            res.status(500).json({ error: e.message })
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body
            console.log(email, password,)
            if (!email || !password) {
                console.log('enter data')
                return res.status(401).json({ error: 'fill in everything' })
            }
            const user = await prisma.users.findUnique({
                where: { email }
            })
            if (!user) {
                return res.status(401).json("user not found")
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash)
            if (!isMatch) {
                return res.status(401).json('incorrect password')
            }
            //token generating
            res.clearCookie('refreshToken')
            const refreshToken = await jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: '10d' })
            const accessToken = await jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: "1h" })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                maxAge: 10 * 24 * 60 * 60 * 1000,
                sameSite: 'lax'
            })
            if (user.banned) return res.json('banned')
            res.json({ accessToken, user })


        } catch (e) {
            return res.json({ error: e.message })
        }
    }
    async refresh(req, res) {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({ error: 'Нет рефреш окена' })
        }
        try {
            const payload = jwt.verify(erfreshToken, 'secretKey')
            const newAccessToken = jwt.sign({ id: payload.id }, 'secretKey', { e })
            res.json({ accessToken: newAccessToken })
        } catch (e) {
            res.status(403).json({ error: 'Недеиствительныи токен' })
        }
    }

}
module.exports = new AuthController