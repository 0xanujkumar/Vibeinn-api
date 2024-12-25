
module.exports =
    class UserServices {

        constructor(authRepo, userRepo, error, sequelize, seqTransaction,loginHelper,  nodemailer, generalConfigs, centralLogger, uuid, awsConfigs, smsHelper, awsS3,fs, axios, moment) {
            this.authRepo = authRepo;
            this.userRepo = userRepo;
            this.error = error;
            this.sequelize = sequelize;
            this.seqTransaction = seqTransaction;
            this.loginHelper = loginHelper;
            this.nodemailer = nodemailer;
            this.generalConfigs = generalConfigs;
            this.centralLogger = centralLogger;
            this.uuid = uuid;
            this.awsConfigs = awsConfigs;
            this.smsHelper = smsHelper;
            this.s3 = awsS3;
            this.fs = fs;
            this.axios = axios;
            this.moment = moment
        }
    }