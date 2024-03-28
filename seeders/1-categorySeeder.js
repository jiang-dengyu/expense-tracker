'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        { id: 1, name: '食', img: 'fa-solid fa-house', created_at: new Date(), updated_at: new Date() },
        { id: 2, name: '衣', img: 'fa-solid fa-van-shuttle', created_at: new Date(), updated_at: new Date() },
        { id: 3, name: '住', img: 'fa-solid fa-utensils', created_at: new Date(), updated_at: new Date() },
        { id: 4, name: '行', img: 'fa-solid fa-van-shuttle', created_at: new Date(), updated_at: new Date() },
        { id: 5, name: '樂', img: 'fa-solid fa-face-grin-beam', created_at: new Date(), updated_at: new Date() },
        { id: 6, name: '其他', img: 'fa-solid fa-pen', created_at: new Date(), updated_at: new Date() }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {})
  }
}
