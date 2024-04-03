import bcrypt from 'bcrypt'
import { createToken } from '../utils/createToken.js'
import ErrorTest, { loginErrors, registerErrors } from '../utils/errors.js'
import { Roles, User } from '../models/main.js'

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
      codeClient,
      siteWeb,
      telephone,
    })
    const findRole = await Roles.findOne({ where: { nom: role.nom } })
    const user = await newUser.save()
    await user.addRole(findRole)
    res.status(200).send({ user: user.id })
  } catch (error) {
    const errors = registerErrors(error)
    res.status(200).send({ errors })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user.id)
    res
      .cookie('jwt', token, { maxAge: 3600 * 24 * 60 * 60 * 1000 })
      .status(200)
      .json({ id: user.id })
  } catch (error) {
    const errors = loginErrors(error)
    res.status(200).json({ errors })
  }
}

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }).redirect('/')
}

export { register, login, logout }
