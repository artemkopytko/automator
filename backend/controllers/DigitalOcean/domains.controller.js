const { DigitalOceanAccount } = require('../../models/DigitalOceanAccount')
const { Domain } = require('../../models/Domain')

const axios = require('axios')

const getDomains = async (req, res) => {
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

const fetchDomains = async (req, res) => {
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
  getDomains,
  fetchDomains
}
