const { PrismaClient } = require('@prisma/client')
const Droplet = new PrismaClient().Droplet

module.exports = { Droplet }
