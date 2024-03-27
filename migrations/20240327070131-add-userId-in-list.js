'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Lists', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      refferences: {
        model: 'Users',
        key: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Lists', 'user_id')
  }
}
