import { Model, DataType } from 'sequelize'
import sequelize from '../db'
import User from './user'

class Roles extends Model {
  static associate(models) {
    Roles.belongsToMany(models.User, { through: 'UserRole' })
  }
}

Roles.init(
  {
    nom: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
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
  },
  {
    sequelize,
    modelName: 'Roles',
  }
)

export default Roles
