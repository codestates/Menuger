'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dietcard', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      order: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('dietcard');
  },
};
