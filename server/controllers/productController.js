const prisma = require('../lib/prisma.js')


class ProductController {
    async get(req, res) {
        try {
            console.log(prisma)
            const result = await prisma.products.findMany()

            return res.status(200).json(result)

        } catch (e) {
            console.log('get error', e)
            return res.status(500).json({ error: e.message })

        }
    }
    async getCategories(req, res) {
        try {
            console.log(prisma)
            const result = await prisma.categories.findMany()
            return res.status(200).json(result)
        } catch (e) {
            console.log('get error', e)
            return res.status(500).json({ error: e.message })

        }
    }
}
module.exports = new ProductController