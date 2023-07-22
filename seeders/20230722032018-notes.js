'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('notes', [
      {
        userId: 6, 
        title: 'Nota do João',
        content: 'Conteúdo da nota do João.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 7, 
        title: 'Nota da Maria',
        content: 'Conteúdo da nota da Maria.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('notes', null, {});
  }
};
