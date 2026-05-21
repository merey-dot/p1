const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
class AdminController {
    async create(req, res) {
        try {
            const { name, description, price, stock, category_id } = req.body
            const result = await prisma.products.create({
                data: {
                    name, description, price, stock, categoryId: category_id
                }
            })
            return res.status(201).json(result)

        } catch (e) {
            console.log('create error', e)
            return res.json({ error: 'create error', mesage: e })
        }
    }
    async get(req, res) {
        try {
            const result = await prisma.products.findMany()
            return res.status(200).json(result)

        } catch (e) {
            console.log('get error', e)
            return res.status(500).json({ error: e.message })

        }
    }
    async update(req, res) {
        try {
            const id = Number(req.params.id)
            if (isNaN(id)) {
                return res.status(400).json({ error: 'invalid id' })
            }
            const { name, description, price, stock, image, category_id } = req.body
            const result = await prisma.products.update({
                data: { name, description, price, stock, image, categoryId: category_id },
                where: { id }
            })
            return res.status(201).json(result)
        } catch (e) {
            console.log('UPDATE ERROR', e)
            return res.json({ error: e })
        }
    }
    async delete(req, res) {
        try {
            const id = Number(req.params)
            if (isNaN(id)) {
                return res.status(400).json({ error: 'invalid id' })
            }
            await prisma.products.delete({
                where: { id }
            })
            return res.status(200).json({ message: 'deleted' })

        } catch (e) {
            console.log('delete error', e)
            return res.status(500).json({ error: e })
        }
    }
    async getUsers(req, res) {
        try {
            const result = await prisma.users.findMany()
            return res.status(200).json(result)

        } catch (e) {
            console.log('getuser erro', e)
            return res.status(500).json({ error: e })
        }
    }
    async banUser(req, res) {
        try {
            const id = Number(req.params.id)

            const user = await prisma.users.findUnique({ where: { id } })
            await prisma.users.update({
                data: { banned: !user.banned },
                where: { id }
            })
            return res.status(200).json({ message: 'banned', id })

        } catch (e) {
            console.log('ban error', e)
            return res.status(500).json({ error: e })
        }

    }
}
module.exports = new AdminController