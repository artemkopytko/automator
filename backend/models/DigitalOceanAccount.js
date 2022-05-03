const { PrismaClient } = require('@prisma/client')
const DigitalOceanAccount = new PrismaClient().DigitalOceanAccount

module.exports = { DigitalOceanAccount }
