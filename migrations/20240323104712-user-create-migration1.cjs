'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 6,
        },
      },
      birthday: {
        type: Sequelize.DATE,
      },
      pays: {
        type: Sequelize.STRING,
      },
      ville: {
        type: Sequelize.STRING,
      },
      codeClient: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      siteWeb: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      telephone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 10,
          max: 20,
        },
      },
      photoUrl: {
        type: Sequelize.STRING,
        defaultValues: '',
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  },
}
