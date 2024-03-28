import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt
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
  console.log('in requireAuth')
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.BCRYPT_MAIN, async (err, decoded) => {
      if (err) {
        res.status(200).send('Token incorrect ou invalide')
      } else {
        console.log(decoded.id)
        next()
      }
    })
  } else {
    res.status(403).send('AUTHENTICATION requise')
  }
}

export { checkUser, requireAuth }
