'use strict';
const { Model, Deferrable } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasOne(models.otps, { foreignKey: "userId"});
    }
  };
  
  users.init({
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          notEmpty: true,
          len: [3, 30], 
        },
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      firstName:{
        type: DataTypes.STRING,
      },
      lastName:{
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATE
      },
      profilePic: {
        allowNull: true,
        type: DataTypes.STRING
      },
      isBanned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fcmToken: {
        type: DataTypes.STRING
      },
      lastLoggedInDate: {
        type: DataTypes.DATE,
      },
      refreshTokenID: {
        type: DataTypes.STRING,
      },
      hasLoggedIn:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      deactivatedAt: {
          allowNull: true,
          type: DataTypes.DATE
      },
      isDeleted:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    },
    {
      sequelize,
      modelName: 'users',
    },{
      sequelize,
      modelName: 'users',
      indexes: [{
        name: 'phoneNo',
        using: 'BTREE',
        fields: ["phoneNo"]
      }]
    });

  return users;
};
