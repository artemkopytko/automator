require('dotenv').config()
const express = require('express')
const apiRoutes = express.Router()
const { fetchDroplets, getDroplets } = require('../controllers/DigitalOcean/droplets.controller')
const { getDomains, fetchDomains, addDomains, deleteDomains } = require('../controllers/DigitalOcean/domains.controller')
const { getDoAccounts, getDoAccount, createDoAccount, editDoAccount, deleteDoAccount } = require('../controllers/DigitalOcean/accounts.controller')
const { login, signup, verifyToken } = require('../controllers/user.controller')
const signupURL = '/' + process.env.API_SECRET + '/signup'

apiRoutes.route('/login')
  .post(login)

apiRoutes.route('/verifyToken')
  .post(verifyToken)

apiRoutes.route(signupURL)
  .post(signup)

apiRoutes.route('/do_accounts')
  .get(getDoAccounts)
  .post(createDoAccount)

// Converting accessToken field to secured variant
// apiRoutes.route('/do_accounts/secure_tokens')
//   .get(secureDoAccountTokens)

apiRoutes.route('/do_accounts/:id')
  .get(getDoAccount)
  .put(editDoAccount)
  .delete(deleteDoAccount)

// Получение списка доменов по ID из БД
apiRoutes.route('/do_accounts/:id/domains')
  .get(getDomains)
  .post(addDomains)
  .delete(deleteDomains)

// Получение списка доменов по ID из Digital Ocean по API
apiRoutes.route('/do_accounts/:id/domains/fetch')
  .get(fetchDomains)

apiRoutes.route('/do_accounts/:id/droplets')
  .get(getDroplets)

apiRoutes.route('/do_accounts/:id/droplets/fetch')
  .get(fetchDroplets)

module.exports = apiRoutes
