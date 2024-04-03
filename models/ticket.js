import { Model, DataTypes } from 'sequelize'
import sequelize from '../db.js'

class Ticket extends Model {
  static associate(models) {
    Ticket.belongsTo(models.User)
    Ticket.belongsTo(models.Event)
  }
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'prix est obligatoire',
        },
      },
    },
    pass: DataTypes.STRING,
    codeQrUrl: DataTypes.TEXT,
    isSell: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    codeTicket: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'codeTicket est obligatoire',
        },
      },
    },
    proprio: {
      type: DataTypes.INTEGER,
      validate: {
        isNull: true,
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Un ticket doit avoir un événement',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Ticket',
    underscored: true,
    timestamps: true,
  }
)

export default Ticket
