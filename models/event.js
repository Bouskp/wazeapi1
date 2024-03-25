import { Model, DataType, DataTypes } from 'sequelize'
import sequelize from '../db'

class Event extends Model {
  static associate(models) {
    Event.belongsTo(models.User)
    Event.hasMany(models.Ticket)
  }
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    categorie: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    heure: {
      type: DataTypes.TIME,
    },
    telephone: { type: DataTypes.INTEGER },
    ville: { type: DataTypes.STRING },
    visuel: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    siteWeb: { type: DataTypes.TEXT },
    nbreTicket: {
      type: DataTypes.INTEGER,
    },
    isOnline: { type: DataTypes.BOOLEAN },
    isUniqueEvent: { type: DataTypes.BOOLEAN },
    codeEvent: { type: DataTypes.STRING },
    updateAt: { type: DataTypes.DATE },
    createdAt: { type: DataTypes.DATE },
    creatorId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Event',
    underscored: true,
    timestamps: true,
  }
)

export default Event
