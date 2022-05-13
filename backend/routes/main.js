const express = require('express')
const apiRoutes = express.Router()
const {
  getDoAccounts,
  getDoAccount,
  createDoAccount,
  editDoAccount,
  deleteDoAccount,
  getDoAccountDomains,
  getDoAccountDomainsLocal,
  getDoAccountDroplets
} = require('../controllers/DigitalOceanController')

apiRoutes.route('/do_accounts')
  .get(getDoAccounts)
  .post(createDoAccount)

apiRoutes.route('/do_accounts/:id')
  .get(getDoAccount)
  .put(editDoAccount)
  .delete(deleteDoAccount)

// Получение списка доменов по ID из БД
apiRoutes.route('/do_accounts/:id/domains/')
  .get(getDoAccountDomainsLocal)

// Получение списка доменов по ID из Digital Ocean по API
apiRoutes.route('/do_accounts/:id/domains/fetch')
  .get(getDoAccountDomains)

apiRoutes.route('/do_accounts/:id/droplets/fetch')
  .get(getDoAccountDroplets)

module.exports = apiRoutes
