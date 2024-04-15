import bcrypt from 'bcrypt'
import { createToken } from '../utils/createToken.js'
import { loginErrors, registerErrors } from '../utils/errors.js'
import { Roles, User } from '../models/main.js'

const maxAge = 3 * 24 * 60 * 60 * 1000

const register = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    password,
    birthday,
    pays,
    ville,
    siteWeb,
    telephone,
    role = { nom: 'User' },
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
      siteWeb,
      telephone,
    })
    const findRole = await Roles.findOne({ where: { nom: role.nom } })
    const user = await newUser.save()
    await user.addRole(findRole)
    res.status(200).send({ user: user.id })
  } catch (error) {
    console.log(error)
    const errors = registerErrors(error)
    res.status(200).send({ errors })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user.id)
    res.status(200).cookie('jwt', token, { maxAge }).json({ id: user.id })
  } catch (error) {
    const errors = loginErrors(error)
    res.status(200).json({ errors })
  }
}

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }).redirect('/')
}

export { register, login, logout }
