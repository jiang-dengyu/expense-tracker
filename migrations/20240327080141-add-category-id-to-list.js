'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Lists', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      refferences: {
        model: 'Categorys',
        key: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Lists', 'category_id')
  }
}
