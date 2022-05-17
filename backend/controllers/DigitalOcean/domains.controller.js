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

const addDomains = async (req, res) => {
  const id = Number(req.params.id)
  if (id) {
    try {
      const account = await DigitalOceanAccount.findFirst({
        where: {
          id
        }
      })

      // console.log({ account })

      const { domains, ip } = req.body
      if (domains && ip && domains.length > 0) {
        const promises = domains.map(async (domain) => {
          const config = {
            method: 'post',
            url: 'https://api.digitalocean.com/v2/domains',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + account.accessToken
            },
            data: JSON.stringify({
              name: domain,
              ip_address: ip
            })
          }
          return await axios(config)
        })

        const result = await Promise.allSettled(promises)

        const response = []
        result.forEach((value, index) => {
          console.log({ value })

          if (value.status === 'rejected') {
            // console.log(value)
            // console.log(value.reason.response.statusText)
            // console.log('Can\'t create ' + domains[index])
            response.push({
              name: domains[index],
              success: false,
              code: value.reason.response.statusText
            })
          } else if (value.value.statusText === 'Created') {
            console.log(value)
            response.push({
              name: domains[index],
              success: true,
              code: value.value.value.statusText
            })
            // console.log({ value })
            // console.log('created')
          } else {
            response.push({
              name: domains[index],
              success: false,
              code: value.reason.response.statusText
            })
          }
        })

        res.status(200).json({ success: true, domains: response })
      } else {
        res.status(400).json({ success: false, msg: 'Error. Param domains or ip is missing' })
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
  fetchDomains,
  addDomains
}
