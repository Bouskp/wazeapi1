import User from '../models/user.js'
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
