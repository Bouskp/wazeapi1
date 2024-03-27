import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { createToken } from '../utils/createToken.js'

const register = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    password,
    birthday,
    pays,
    ville,
    codeClient,
    siteWeb,
    telephone,
  } = req.body

  try {
    const newUser = User.build({
      nom,
      prenom,
      email,
      password,
      birthday,
      pays,
      ville,
      codeClient,
      siteWeb,
      telephone,
    })
    const user = await newUser.save()
    res.status(200).send({ user: user.id })
  } catch (error) {
    res.status(200).send({ error })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email: email } })
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res
            .cookie('jwt', createToken(user.id), {
              maxAge: 3 * 24 * 60 * 60 * 1000,
            })
            .status(200)
            .send({ user: user.id })
        } else {
          res.status(200).send({ error: 'mot de passe incorrect' })
        }
      })
    } else {
      res.status(200).send({ error: 'email incorrect' })
    }
  } catch (error) {
    res.status(200).send({ error: error.message })
  }
}

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }).redirect('/')
}

export { register, login, logout }
