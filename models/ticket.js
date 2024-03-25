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
    id: DataTypes.INTEGER,
    prix: DataTypes.INTEGER,
    pass: DataTypes.STRING,
    codeQrUrl: DataTypes.TEXT,
    isSell: DataTypes.BOOLEAN,
    codeTicket: DataTypes.TEXT,
    proprio: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Ticket',
    underscored: true,
    timestamps: true,
  }
)

export default Ticket
