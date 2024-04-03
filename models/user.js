'use strict'
import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import sequelize from '../db.js'
import { nanoid } from 'nanoid'
import ErrorTest from '../utils/errors.js'
import Roles from './roles.js'

class User extends Model {
  // Method to Login
  static async login(email, password) {
    const user = await this.findOne({ where: { email: email } })
    if (user) {
      const auth = await bcrypt.compare(password, user.password)
      if (auth) {
        return user
      }
      throw new ErrorTest('password incorrect', 'password')
    }
    throw new ErrorTest('email inconnu')
  }

  static async getUserById(id) {
    const user = await this.findByPk(id, {
      attributes: [
        'nom',
        'prenom',
        'email',
        'pays',
        'ville',
        'siteWeb',
        'codeClient',
        'photoUrl',
        'birthday',
      ],
      include: Roles,
    })
    if (user) {
      return user
    }
    return null
  }

  static async deleteUser(id) {
    const user = await this.findByPk(id)
    if (user) {
      await user.destroy()
      return user
    }
    return null
  }
  static async updateUser(id, user) {
    const findUser = await this.findByPk(id)

    if (findUser) {
      findUser.nom = user.nom || findUser.nom
      findUser.prenom = user.prenom || findUser.prenom
      findUser.email = user.email || findUser.email
      findUser.password = user.password || findUser.password
      findUser.pays = user.pays || findUser.pays
      findUser.ville = user.ville || findUser.ville
      findUser.birthday = user.birthday || findUser.birthday
      findUser.siteWeb = user.siteWeb || findUser.siteWeb
      findUser.telephone = user.telephone || findUser.telephone
      await findUser.save()
      return findUser
    }
    return null
  }

  static async getAllUsers() {
    const users = await this.findAll({
      attributes: [
        'id',
        'nom',
        'prenom',
        'email',
        'pays',
        'ville',
        'siteWeb',
        'codeClient',
        'photoUrl',
        'birthday',
      ],
      // include: Roles,
    })
    if (users) {
      return users
    }
    return null
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Le nom est obligatoire',
          args: true,
        },
      },
    },
    prenom: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Le prenom est obligatoire',
          args: true,
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "L'email est incorrect",
          args: true,
        },
        notEmpty: {
          msg: "L'email est obligatoire",
          args: true,
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Le mot de passe est obligatoire',
          args: true,
        },
        len: {
          args: [8, 2000],
          message: 'Le mot de passe doit être de 8 à 20 chiffres',
          name: 'length',
        },
      },
    },
    birthday: DataTypes.DATE,
    pays: DataTypes.STRING,
    ville: {
      type: DataTypes.STRING,
    },
    codeClient: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Le code client est obligatoire',
          args: true,
        },
      },
    },
    siteWeb: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "L'url est incorrect",
          args: true,
        },
      },
    },
    telephone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Le téléphone est obligatoire',
          args: true,
        },
        len: {
          msg: 'Le téléphone doit être de 10 à 20 chiffres',
          args: [10, 20],
          name: 'length',
        },
      },
    },
    photoUrl: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  }
)

// les Hooks
User.beforeCreate((user, options) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(user.password, salt)
  user.password = hash
  user.codeClient = nanoid()
})
User.beforeUpdate((user, options) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(user.password, salt)
  user.password = hash
  user.codeClient = nanoid()
})

export default User
