import { Model, DataTypes } from 'sequelize'
import sequelize from '../db.js'

class Event extends Model {
  static async getEvents() {
    return await this.findAll({ include: 'User' })
  }

  static async getEvent(id) {
    const event = await this.findOne({ where: { id: id }, include: 'User' })
    if (event) return event
    else return null
  }

  static async createEvent(newEvent) {
    const event = await this.create(newEvent)
    return event
  }

  static async deleteEvent(id) {
    const event = await this.findOne({ where: { id: id } })
    if (event) {
      await event.destroy()
      return event
    }
    return null
  }

  static async updateEvent(id, newEvent) {
    const event = await this.findOne({ where: { id: id } })
    if (event) {
      await event.update(newEvent)
      return event
    }
    return null
  }

  static async getEventsByUser(id) {
    const events = await this.findAll({ where: { creatorId: id } })
    if (events) return events
    else return null
  }
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      },
    },
    categorie: {
      type: DataTypes.STRING,
      validate: {
        isIn: [
          [
            'concert',
            'festival',
            'concert-spctacle',
            'event etudiant',
            'tourisme et loisirs',
            'spectacle',
            'seminaire et loisirs',
            'semininaire,convention interne',
            'spectacle(théâtre danse, one-man show',
            'atelier et cours',
            'match,manifestation sportive',
            'conference et séminaire',
            'salon et foire',
            'autre',
          ],
        ],
      },
    },
    date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true,
      },
    },
    heure: {
      type: DataTypes.TIME,
      validate: {
        notEmpty: true,
      },
    },
    telephone: { type: DataTypes.INTEGER },
    ville: { type: DataTypes.STRING },
    visuel: { type: DataTypes.STRING },
    siteWeb: { type: DataTypes.TEXT },
    nbreTicket: {
      type: DataTypes.INTEGER,
    },
    isOnline: { type: DataTypes.BOOLEAN, defaultValue: false },
    isUniqueEvent: { type: DataTypes.BOOLEAN, defaultValue: false },
    codeEvent: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    updateAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    lieu: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
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
