'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      prix: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      codeQrUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      isSell: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      codeTicket: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate: {},
      },
      updateAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      proprio: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      eventId: {
        type: Sequelize.INTEGER,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets')
  },
}
