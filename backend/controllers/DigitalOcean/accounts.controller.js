const { DigitalOceanAccount } = require('../../models/DigitalOceanAccount')
const { Domain } = require('../../models/Domain')
const { Droplet } = require('../../models/Droplet')

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

module.exports = {
  getDoAccounts,
  getDoAccount,
  createDoAccount,
  editDoAccount,
  deleteDoAccount
}