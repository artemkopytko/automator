const { PrismaClient } = require('@prisma/client')
const User = new PrismaClient().User

module.exports = { User }
