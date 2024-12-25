const { sequelize } = require('../../models');
const { Transaction: seqTransaction } = require('sequelize');
const Sequelize = require("sequelize");
const sequelizeOp = Sequelize.Op
const { uuid } = require("uuidv4");
const error = require("../../domain/error");
const SMSHelper = require("./../../helpers/smsHelper");
const loginHelper = require("../../helpers/loginHelper")
const moment = require('moment');
const smsHelper = new SMSHelper();
moment.tz.setDefault("Asia/Kolkata");
const generalConfigs = require("./../../config/generalConfig");
const nodemailer = require('nodemailer');
const centralLogger = require("../../config/logsConfig");
const awsConfigs = require("../../config/awsConfig")
const { awsGeneralConfigs } = require("../../config/awsConfig");

const uniqNo = require("uniqid");
const axios = require("axios")
const aws = require("aws-sdk");
const fs = require('fs');
aws.config.update(awsGeneralConfigs)
awsS3 = new aws.S3(awsGeneralConfigs)

const {authRepo,userRepo } = require('../../repolayer/public');

const AuthService = require('./auth');
const UserService = require('./users');


const authService = new AuthService(authRepo, userRepo, error, sequelize, seqTransaction, moment, uuid, smsHelper, loginHelper,generalConfigs, centralLogger);
const userService = new UserService(authRepo, userRepo,error, sequelize, seqTransaction,loginHelper, nodemailer, generalConfigs, centralLogger, uuid, awsConfigs, smsHelper,fs,axios, moment);

module.exports = {
    authService,
    userService
};