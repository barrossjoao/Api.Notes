'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'João Silva',
        role: 'user',
        age: 30,
        cpf: '111.111.111-11',
        email: 'joao.silva@example.com',
        password: 'senha123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin',
        role: 'admin',
        age: 25,
        cpf: '222.222.222-22',
        email: 'admin@email.com',
        password: '12345678',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
