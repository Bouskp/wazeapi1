'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        nom: 'John',
        prenom: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '010499',
        codeClient: '123',
        telephone: '0711764383',
      },
      {
        nom: 'Kouakou',
        prenom: 'Denzel Junior Oluwafemi',
        email: 'oluwafemi@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '010498',
        codeClient: '0001',
        telephone: '78637198',
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
