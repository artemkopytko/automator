const express = require('express')
const apiRoutes = express.Router()
const {
  getDoAccounts,
  getDoAccount,
  createDoAccount,
  editDoAccount,
  deleteDoAccount
} = require('../controllers/DigitalOceanController')

apiRoutes.route('/do_accounts')
  .get(getDoAccounts)
  .post(createDoAccount)

apiRoutes.route('/do_accounts/:id')
  .get(getDoAccount)
  .put(editDoAccount)
  .delete(deleteDoAccount)

module.exports = apiRoutes
