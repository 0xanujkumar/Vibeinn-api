'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class otps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      otps.belongsTo(models.users,{ foreignKey: "userId" })
    }
  };

  otps.init({
    otp:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "LOGIN_OTP"
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'otps',
    indexes: [{
      name: 'userId',
      using: 'BTREE',
      fields: ["userId"]
    }]
  });
  
  return otps;
};