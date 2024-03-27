import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

config()
const createToken = function (id) {
  return jwt.sign({ id }, process.env.BCRYPT_MAIN, {
    expiresIn: 3 * 24 * 60 * 60 * 1000,
  })
}

export { createToken }
