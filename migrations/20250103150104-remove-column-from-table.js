module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Deleting the column from the table
    await queryInterface.removeColumn('users', 'password');
  },

  down: async (queryInterface, Sequelize) => {
    // Adding the column back in case of rollback
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.DataTypes.STRING, // Replace with the original data type
      allowNull: true, // Replace with the original nullability
    });
  }
};
