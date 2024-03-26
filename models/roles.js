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
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Roles',
  }
)

export default Roles
