const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


class ProductController {
    async get(req, res) {
        try {
            const result = await prisma.products.findMany()

            return res.status(200).json(result)

        } catch (e) {
            console.log('get error', e)
            return res.status(500).json({ error: e.message })

        }
    }
    async getCategories(req, res) {
        try {
            const result = await prisma.categories.findMany()
            return res.status(200).json(result)
        } catch (e) {
            console.log('get error', e)
            return res.status(500).json({ error: e.message })

        }
    }
}
module.exports = new ProductController