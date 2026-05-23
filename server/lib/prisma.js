const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL

console.log("DATABASE_URL exists:", !!connectionString)

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false   // ← обязательно для Render
    }
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
    adapter,
    log: ['error', 'warn']
})

module.exports = prisma