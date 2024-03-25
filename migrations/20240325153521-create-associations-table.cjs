'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRole', {
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      RoleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    })
    await queryInterface.addConstraint('Event', {
      fields: ['creatorId'],
      type: 'foreign key',
      name: 'creator',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    await queryInterface.addConstraint('Tickets', {
      fields: ['proprio'],
      type: 'foreign key',
      name: 'proprio',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    await queryInterface.addConstraint('Tickets', {
      fields: ['eventId'],
      type: 'foreign key',
      name: 'eventId',
      references: {
        table: 'Event',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserRole')
    await queryInterface.removeConstraint('Event', 'creator')
    await queryInterface.removeConstraint('Tickets', 'proprio')
    await queryInterface.removeConstraint('Tickets', 'eventId')
  },
}
