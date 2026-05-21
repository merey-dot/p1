const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
class UserController {
    async getUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10)
            const result = await prisma.users.findUnique({
                where: { id }
            })
            return res.status(200).json(result)

        } catch (e) {
            console.log('getuserError', e)
            return res.status(500).json({ error: e.message })
        }
    }
    async updateUser(req, res) {
        try {
            const id = Number(req.params)
            const { name, email, password } = req.body
            if (!name || !email) {
                return res.status(401).json({ message: 'fill in all' })
            }
            const passwordHash = await bcrypt.hash(password, 10)
            const result = await prisma.users.update({
                data: { name, email, passwordHash },
                where: { id }
            })
            return res.status(200).json('succes')
        } catch (e) {
            console.log('updateuser error', e)
            return res.status(500).json({ error: e })
        }
    }

}
module.exports = new UserController