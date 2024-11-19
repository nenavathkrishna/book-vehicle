'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Vehicles', [
      { typeId: 5, model: 'Maruti Alto', createdAt: new Date(), updatedAt: new Date() },
      { typeId: 6, model: 'Mahindra XUV300', createdAt: new Date(), updatedAt: new Date() },
      { typeId: 7, model: 'Honda City', createdAt: new Date(), updatedAt: new Date() },
      { typeId: 8, model: 'Royal Enfield Hunter 350', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Vehicles', null, {});

  }
};
