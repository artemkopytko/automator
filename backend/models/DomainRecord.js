const { PrismaClient } = require('@prisma/client')
const DomainRecord = new PrismaClient().DomainRecord

module.exports = { DomainRecord }
