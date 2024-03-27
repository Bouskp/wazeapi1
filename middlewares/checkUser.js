import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt
  console.log(token)
  if (token) {
    jwt.verify(token, process.env.BCRYPT_MAIN, async (err, decoded) => {
      if (err) {
        res.locals.user = null
        res.cookie('jwt', '', { maxAge: 1 })
        next()
      } else {
        const user = await User.findOne({ where: { id: decoded.id } })
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.BCRYPT_MAIN, async (err, decoded) => {
      if (err) {
        res.status(403).send('Opération non permise')
      } else {
        const user = await User.findOne({ where: { id: decoded.id } })
        res.locals.user = user
        next()
      }
    })
  } else {
    console.log('no token')
  }
}

export { checkUser, requireAuth }
