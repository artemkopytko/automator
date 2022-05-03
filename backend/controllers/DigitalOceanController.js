const { DigitalOceanAccount } = require('../models/DigitalOceanAccount')

const getDoAccounts = async (req, res) => {
  try {
    const accounts = await DigitalOceanAccount.findMany({})

    res.status(200).json({ msg: 'Success', data: accounts })
  } catch (error) {
    res.status(400).json({ msg: 'Error. Can not get list of accounts' })
  }
}

const createDoAccount = async (req, res) => {
  const { name, accessToken } = req.body

  if (name && accessToken) {
    try {
      console.log(name, accessToken)
      const account = await DigitalOceanAccount.create({
        data: {
          name: name,
          accessToken: accessToken
        }
      })
      console.log(account)
      res.status(200).json({ msg: 'Success', data: account })
    } catch (error) {
      res.status(400).json({ msg: 'Error. Can not create an account' })
    }
  } else {
    res.status(400).json({ msg: 'Error. Fields name or accessToken are not set' })
  }
}

const getDoAccount = async (req, res) => {
  const { id } = Number(req.params.id)

  if (id) {
    try {
      const account = await DigitalOceanAccount.findFirst({
        where: {
          id
        }
      })

      res.status(200).json({ msg: 'Success', data: account })
    } catch (error) {
      res.status(400).json({ msg: 'Error. Can not get an account' })
    }
  } else {
    res.status(400).json({ msg: 'Error. Account id is invalid number' })
  }
}

const editDoAccount = async (req, res) => {

}

const deleteDoAccount = async (req, res) => {

}

module.exports = {
  getDoAccounts,
  getDoAccount,
  createDoAccount,
  editDoAccount,
  deleteDoAccount
}
