const express = require('express')
const apiRoutes = express.Router()
const { fetchDroplets, getDroplets } = require('../controllers/DigitalOcean/droplets.controller')
const { getDomains, fetchDomains } = require('../controllers/DigitalOcean/domains.controller')
const { getDoAccounts, getDoAccount, createDoAccount, editDoAccount, deleteDoAccount } = require('../controllers/DigitalOcean/accounts.controller')

apiRoutes.route('/do_accounts')
  .get(getDoAccounts)
  .post(createDoAccount)

apiRoutes.route('/do_accounts/:id')
  .get(getDoAccount)
  .put(editDoAccount)
  .delete(deleteDoAccount)

// Получение списка доменов по ID из БД
apiRoutes.route('/do_accounts/:id/domains')
  .get(getDomains)

// Получение списка доменов по ID из Digital Ocean по API
apiRoutes.route('/do_accounts/:id/domains/fetch')
  .get(fetchDomains)

apiRoutes.route('/do_accounts/:id/droplets')
  .get(getDroplets)

apiRoutes.route('/do_accounts/:id/droplets/fetch')
  .get(fetchDroplets)

module.exports = apiRoutes
