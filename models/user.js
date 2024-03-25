'use strict'
import { Model, DataTypes } from 'sequelize'
import sequelize from '../db.js'
class User extends Model {
  static associate(models) {
    User.belongsToMany(models.Roles, { through: 'UserRole' })
    User.hasMany(models.Event)
  }
}
User.init(
  {
    nom: DataTypes.STRING,
    pernom: DataTypes.STRING,
    email: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    pays: DataTypes.STRING,
    ville: DataTypes.STRING,
    codeClient: DataTypes.STRING,
    siteWeb: DataTypes.STRING,
    telephone: DataTypes.STRING,
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
