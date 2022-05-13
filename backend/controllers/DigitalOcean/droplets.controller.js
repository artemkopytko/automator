const { DigitalOceanAccount } = require('../../models/DigitalOceanAccount')
const { Droplet } = require('../../models/Droplet')
const axios = require('axios')

const getDroplets = async (req, res) => {
  const id = Number(req.params.id)

  if (id) {
    try {
      const droplets = await Droplet.findMany({
        where: {
          DigitalOceanAccountId: id
        }
      })
      res.status(200).json({ success: true, droplets })
    } catch (error) {
      res.status(400).json({ success: false, msg: 'Error. Can not get account details' })
    }
  } else {
    res.status(400).json({ success: false, msg: 'Error. Account id is invalid number' })
  }
}

const fetchDroplets = async (req, res) => {
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

module.exports = {
  getDroplets,
  fetchDroplets
}
