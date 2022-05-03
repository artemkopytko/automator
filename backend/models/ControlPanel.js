const { PrismaClient } = require('@prisma/client')
const ControlPanel = new PrismaClient().ControlPanel

module.exports = { ControlPanel }
