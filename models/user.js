'use strict'
import { Model, DataTypes } from 'sequelize'
import sequelize from '../db.js'
class User extends Model {
  static associate(models) {
    User.belongsToMany(models.Roles, { through: 'UserRole' })
    User.hasMany(models.Event)
    User.hasMany(models.Ticket)
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
          args: true,
          msg: "L'email est incorrect",
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
      },
    },
    birthday: DataTypes.DATE,
    pays: DataTypes.STRING,
    ville: DataTypes.STRING,
    codeClient: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Le code client est obligatoire',
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
      },
    },
    photoUrl: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'User',
    underscored: true,
    timestamps: true,
  }
)

export default User
