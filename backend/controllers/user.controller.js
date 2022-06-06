const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { User } = require('../models/User')

const login = async (req, res) => {
  const { username, password } = req.body

  if (username && password) {
    try {
      const passwordHash = crypto.createHash('sha256').update(password).digest('hex')
      // console.log({ username, passwordHash })

      const user = await User.findFirst({
        where: {
          username,
          password: passwordHash
        }
      })

      if (user) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: '30d'
        })

        res.status(200).json({ success: true, username, token })
      } else {
        res.status(400).json({ success: false, msg: 'Error. User does not exist' })
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, msg: 'Error. User does not exist' })
    }
  } else {
    res.status(400).json({ success: false, msg: 'Error. Username or Password is missing' })
  }
}

const signup = async (req, res) => {
  const { username, password } = req.body

  if (username && password) {
    try {
      const passwordHash = crypto.createHash('sha256').update(password).digest('hex')

      const user = await User.create({
        data: {
          username,
          password: passwordHash
        }
      })

      if (user) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: '30d'
        })

        res.status(200).json({ success: true, username, token })
      } else {
        res.status(400).json({ success: false, msg: 'Error. Can not create new user' })
      }
    } catch (err) {
      res.status(400).json({ success: false, msg: 'Error. Can not create new user' })
    }
  } else {
    res.status(400).json({ success: false, msg: 'Error. Username or Password is missing' })
  }
}

const verifyToken = async (req, res) => {
  const token = req.body.token

  if (!token) {
    res.status(401).json({ success: false, msg: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const { username } = decoded

    // console.log({login})

    try {
      const user = await User.findUnique({
        where: { username }
      })

      if (user) {
        res.status(200).json({ success: true })
      } else {
        res.status(403).json({ success: false, from: 'dashboard', msg: 'Invalid Token' })
      }
    } catch (err) {
      res.status(403).json({ success: false, from: 'dashboard', msg: 'Invalid Token' })
    }
  } catch (error) {
    // console.log('error')
    res.status(403).json({ success: false, from: 'dashboard', msg: 'Invalid Token' })
    // res.status(403).json({ success: false, msg: "Unauthorized"})
  }
}

module.exports = {
  login,
  signup,
  verifyToken
}
