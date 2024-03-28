'use strict'
const bcrypt = require('bcryptjs')
const faker = require('faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let transaction

    try {
      transaction = await queryInterface.sequelize.transaction()

      const hash = await bcrypt.hash('12345678', 10)
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            id: 1,
            name: 'user1',
            email: 'root@example.com',
            password: hash,
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            id: 2,
            name: 'user2',
            email: 'user2@example.com',
            password: hash,
            created_at: new Date(),
            updated_at: new Date()
          }
        ],
        { transaction }
      )
      await queryInterface.bulkInsert(
        'Lists',
        Array.from({ length: 10 }).map((_, i) => ({
          id: Number(`${i}`) + 1,
          name: faker.name.findName(),
          price: Math.floor(Math.random() * 1000),
          date: faker.date.past().toISOString().slice(0, 10),
          category_id: Math.floor(Math.random() * 6) + 1,
          user_id: Math.floor(Math.random() * 2) + 1,
          created_at: new Date(),
          updated_at: new Date()
        })),
        { transaction }
      )
      await transaction.commit()
    } catch (error) {
      console.log(error)
      if (transaction) await transaction.rollback()
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
}
