'use strict';
module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable('subscription', {});
  },
  down: async queryInterface => {
    await queryInterface.dropTable('subscription');
  },
};
