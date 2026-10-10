'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Verifica a estrutura atual da tabela 'products'
    const tableInfo = await queryInterface.describeTable('products');
    
    // 2. Só cria a coluna se ela NÃO existir no banco de dados
    if (!tableInfo.category_id) {
      await queryInterface.addColumn('products', 'category_id', { 
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      });
    }
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('products', 'category_id');
  }
};
