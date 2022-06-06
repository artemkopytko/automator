import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, msg: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const { login } = decoded

    // console.log({login})

    try {
      const user = await User.findUnique({
        where: { login }
      })

      // console.log({user})

      if (user) {
        next()
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

export default isAdmin
