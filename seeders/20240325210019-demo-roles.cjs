'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      {
        nom: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'Creator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {})
  },
}
