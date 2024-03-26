import { Model, DataType } from 'sequelize'
import sequelize from '../db'

class Ticket extends Model {
  static associate(models) {
    Ticket.belongsTo(models.User)
    Ticket.belongsTo(models.Event)
  }
}

Ticket.init(
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prix: {
      type: DataType.INTEGER,
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
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
    codeTicket: {
      type: DataType.TEXT,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'codeTicket est obligatoire',
        },
      },
    },
    proprio: {
      type: DataType.INTEGER,
      validate: {
        isNull: true,
      },
    },
    eventId: {
      type: DataType.INTEGER,
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
