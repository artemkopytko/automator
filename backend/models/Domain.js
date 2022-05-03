const { PrismaClient } = require('@prisma/client')
const Domain = new PrismaClient().Domain

module.exports = { Domain }
