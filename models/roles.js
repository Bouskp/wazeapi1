import { Model, DataTypes } from 'sequelize'
import sequelize from '../db.js'

class Roles extends Model {
  static isRole(role) {
    return role === 'Admin' || role === 'Creator' || role === 'SuperAdmin'
  }
}

Roles.init(
  {
    nom: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
        isIn: {
          msg: 'le nom est obligatoire ',
          args: [['Admin', 'Creator', 'SuperAdmin']],
        },
      },
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    timestamps: true,
  }
)

export default Roles
