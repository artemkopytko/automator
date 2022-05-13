const { DigitalOceanAccount } = require('../models/DigitalOceanAccount')
const { Domain } = require('../models/Domain')
const { Droplet } = require('../models/Droplet')
const axios = require('axios')

const getDoAccounts = async (req, res) => {
  try {
    const accounts = await DigitalOceanAccount.findMany({})

    const promises = accounts.map(async (account) => {
      return Domain.count({
        where: {
          DigitalOceanAccountId: account.id
        }
      })
    })

    const result = await Promise.allSettled(promises)
    // console.log(result)

    result.forEach((value, index) => {
      accounts[index].domainsCount = value.value
    })

    // console.log(accounts)

    res.status(200).json({ success: true, data: accounts })
  } catch (error) {
    res.status(400).json({ success: false, msg: 'Error. Can not get list of accounts' })
  }
}

const createDoAccount = async (req, res) => {
  const { name, accessToken } = req.body

  if (name && accessToken) {
    try {
      console.log(name, accessToken)
      const account = await DigitalOceanAccount.create({
        data: {
          name,
          accessToken
        }
      })
      console.log(account)
      res.status(200).json({ success: true, data: account })
    } catch (error) {
      res.status(400).json({ success: false, msg: 'Error. Can not create an account' })
    }
  } else {
    res.status(400).json({ success: false, msg: 'Error. Fields name or accessToken are not set' })
  }
}

const getDoAccount = async (req, res) => {
  const id = Number(req.params.id)

  if (id) {
    try {
      const account = await DigitalOceanAccount.findFirst({
        where: {
          id
        }
      })

      const droplets = await Droplet.findMany({
        where: {
          DigitalOceanAccountId: id
        }
      })

      res.status(200).json({ success: true, account, droplets })
    } catch (error) {
      res.status(400).json({ success: false, msg: 'Error. Can not get an account' })
    }
  } else {
    res.status(400).json({ success: false, msg: 'Error. Account id is invalid number' })
  }
}

const editDoAccount = async (req, res) => {

}

const deleteDoAccount = async (req, res) => {
  const id = Number(req.params.id)
  // console.log(id)
  if (id) {
    try {
      const account = await DigitalOceanAccount.delete({
        where: {
          id
        }
      })

      res.status(200).json({ success: true, data: account })
    } catch (error) {
      res.status(400).json({ success: false, msg: 'Error. Can not get an account' })
    }
  } else {
    res.status(400).json({ success: false, msg: 'Error. Account id is invalid number' })
  }
}

const getDoAccountDomainsLocal = async (req, res) => {
  const id = Number(req.params.id)
  // console.log(id)
  if (id) {
    try {
      const domains = await Domain.findMany({
        where: {
          DigitalOceanAccountId: id
        }
      })

      res.status(200).json({ success: true, data: domains })
    } catch (error) {

    }
  } else {
    res.status(400).json({ success: false, msg: 'Error. Account id is invalid number' })
  }
}

const getDoAccountDroplets = async (req, res) => {
  const id = Number(req.params.id)
  // console.log(id)
  if (id) {
    try {
      const account = await DigitalOceanAccount.findFirst({
        where: {
          id
        }
      })

      const config = {
        method: 'get',
        url: 'https://api.digitalocean.com/v2/droplets?page=1&per_page=200',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + account.accessToken
        }
      }
      try {
        const response = await axios(config)

        // if (response.data.droplets) {
        const droplets = []
        response.data.droplets.forEach((value, index) => {
          let ip = ''

          value.networks.v4.forEach((v, i) => {
            if (v.type === 'public') ip = v.ip_address
          })

          const droplet = {
            name: value.name,
            locked: value.locked,
            status: value.status,
            ip,
            DigitalOceanAccountId: id
          }

          droplets.push(droplet)
        })

        try {
          const result = await Droplet.createMany({
            data: droplets,
            skipDuplicates: true
          })

          res.status(200).json({ success: true, data: result })
        } catch (error) {
          res.status(400).json({ success: false, msg: 'Error. Can not create droplet' })
        }
        // }
        res.status(200).json({ success: false, data: response.data })
      } catch (error) {
        res.status(400).json({ success: false, msg: 'Error. Can not get droplets' })
      }
    } catch (error) {
      res.status(400).json({ success: false, msg: 'Error. Can not get account details' })
    }
  } else {
    res.status(400).json({ success: false, msg: 'Error. Account id is invalid number' })
  }
}

const getDoAccountDomains = async (req, res) => {
  const id = Number(req.params.id)
  // console.log(id)
  if (id) {
    try {
      const account = await DigitalOceanAccount.findFirst({
        where: {
          id
        }
      })

      const config = {
        method: 'get',
        url: 'https://api.digitalocean.com/v2/domains?page=1&per_page=200',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + account.accessToken
        }
      }

      try {
        const response = await axios(config)

        if (response.data.domains) {
          response.data.domains.forEach((value, index) => {
            response.data.domains[index].DigitalOceanAccountId = id
          })
        }

        try {
          // !FIX Fetch current list. Then Delete only those domains which NOT exist in response.data.domains
          await Domain.deleteMany({
            where: {
              DigitalOceanAccountId: id
            }
          })
          try {
            // !FIX Rewrite to upsert forEach
            await Domain.createMany({
              data: response.data.domains,
              skipDuplicates: true
            })

            try {
              const domains = await Domain.findMany({
                where: {
                  DigitalOceanAccountId: id
                }
              })

              res.status(200).json({ success: true, data: domains })
            } catch (error) {

            }
          } catch (error) {
            res.status(400).json({ success: false, msg: 'Error. Can not add new domains' })
          }
        } catch (error) {
          res.status(400).json({ success: false, msg: 'Error. Can not delete existing domains' })
        }
      } catch (error) {
        res.status(400).json({ success: false, msg: 'Error. Can not get account domains' })
      }
    } catch (error) {
      res.status(400).json({ success: false, msg: 'Error. Can not get account details' })
    }
  } else {
    res.status(400).json({ success: false, msg: 'Error. Account id is invalid number' })
  }
}

module.exports = {
  getDoAccounts,
  getDoAccount,
  createDoAccount,
  editDoAccount,
  deleteDoAccount,
  getDoAccountDomains,
  getDoAccountDomainsLocal,
  getDoAccountDroplets
}
