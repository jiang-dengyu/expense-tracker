'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      ['食', '衣', '住', '行', '樂'].map((item) => {
        return {
          name: item,
          created_at: new Date(),
          updated_at: new Date()
        }
      }),
      {}
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {})
  }
}
