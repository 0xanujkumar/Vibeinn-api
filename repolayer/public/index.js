const { sequelize } = require("../../models");
const otpTable = require("../../models").otps;
const userTable = require("../../models").users;


const errors = require("../../domain/error");
const generalConfig = require("../../config/generalConfig");
const centralLogger = require("../../config/logsConfig")
const UserRepo = require("./user");
const AuthRepo = require("./auth");
const Sequelize = require("sequelize");
const sequelizeOp = Sequelize.Op



const userRepo = new UserRepo(userTable,sequelize, sequelizeOp, errors, generalConfig, centralLogger);
const authRepo = new AuthRepo(otpTable, userTable,sequelize, sequelizeOp, errors, generalConfig, centralLogger);


module.exports = {
    authRepo,
    userRepo
}
