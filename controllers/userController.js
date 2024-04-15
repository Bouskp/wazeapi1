import { Roles, User } from '../models/main.js'
import { registerErrors } from '../utils/errors.js'

export const getUserById = async (req, res) => {
  const { id } = req.params
  const findUser = await User.getUserById(id)
  if (findUser) {
    res.status(200).json(findUser)
  } else {
    res.status(404).send({ message: 'Id introuvable' })
  }
}

export const getAllUsers = async (req, res) => {
  const users = await User.getAllUsers()
  res.status(200).json(users)
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { newUser } = req.body
  try {
    const user = await User.updateUser(id, newUser)
    if (user) {
      res.status(200).json({ id: user.id })
    } else {
      res.status(404).send({ message: 'Id introuvable' })
    }
  } catch (error) {
    const errors = registerErrors(error)
    res.status(200).send({ errors })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  const user = await User.deleteUser(id)
  if (user) {
    res.status(200).json({ id: user.id })
  } else {
    res.status(404).send({ message: 'Id introuvable' })
  }
}

export const updateRoles = async (req, res) => {
  const { userId } = req.params
  const { roles } = req.body
  try {
    const isRole = Roles.isRole(roles.nom)
    if (!isRole) return res.status(404).send({ message: 'Role incorrect' })
    const newRoles = await Roles.findOne({ where: { nom: roles.nom } })

    const user = await User.updateRoles(userId, newRoles)

    if (!user) return res.status(404).send({ message: 'Id incorrect' })
    return res.status(201).send({ message: 'Role updated' })
  } catch (error) {
    console.log(error)
    res.status(200).send({ error: error.message })
  }
}
