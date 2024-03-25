'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Event', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      categorie: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
      },
      telephone: { type: Sequelize.INTEGER },
      ville: { type: Sequelize.STRING },
      visuel: { type: Sequelize.STRING },
      siteWeb: { type: Sequelize.TEXT },
      nbreTicket: {
        type: Sequelize.INTEGER,
      },
      isOnline: { type: Sequelize.BOOLEAN, defaultValue: false },
      isUniqueEvent: { type: Sequelize.BOOLEAN, defaultValue: true },
      codeEvent: { type: Sequelize.STRING, allowNull: false },
      creatorId: { type: Sequelize.INTEGER },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Event')
  },
}
