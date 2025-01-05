module.exports = class AuthServices {
    constructor(authRepo, userRepo, error, sequelize, seqTransaction, moment, uuid, smsHelper, loginHelper, generalConfigs, centralLogger) {
        this.authRepo = authRepo;
        this.userRepo = userRepo;
        this.error = error;
        this.sequelize = sequelize;
        this.seqTransaction = seqTransaction;
        this.moment = moment;
        this.uuid = uuid;
        this.smsHelper = smsHelper;
        this.loginHelper = loginHelper;
        this.generalConfigs = generalConfigs;
        this.centralLogger = centralLogger;
    }

    authSendOTP = async (phoneNo, deviceId, userLanguageCode) => {
        let t = await this.sequelize.transaction({ isolationLevel: this.seqTransaction.ISOLATION_LEVELS.READ_UNCOMMITTED });
        try {
            // is the user banned check
            let userDetails = await this.authRepo.checkUserDetails(phoneNo);
            if (userDetails && userDetails.isBanned) throw this.error.accountBanned;
          
            
            if (!userDetails) userDetails = (await this.userRepo.addUserID(phoneNo, t)).dataValues;
            if(userDetails && userDetails.isDeleted) throw this.error.userAccountDeleted;
            if ((!this.generalConfigs.demoDefaultPhoneNos.includes(phoneNo)) && (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'development')) {
            }
            // implemented always send OTP mechanism
            let repoRes = await this.authRepo.generateOTP(userDetails.id, phoneNo, t);
            let generatedOTP = repoRes.otp;
            try {
                let response = await this.smsHelper.sendSMS( phoneNo, "loginOTPMessage",
                    [generatedOTP, 5, this.generalConfigs.appHash]
                );
                console.log(JSON.stringify(response));
                await t.commit();
                return response;
            } catch (err) {
                console.log(err);
                throw this.error.unableToSendOTP;
            }
        } catch (err) {
            console.log(err);
            await t.rollback();
            if (err instanceof this.error.ServiceError) {
                return err.getJSONError();
            } else {
                return this.error.unableToSendOTP.getJSONError();
            }
        }
    }
    checkUserExists = async (phoneNo) => {
        try {
            let userDetails = await this.authRepo.checkUserDetails(phoneNo);
            if (userDetails && userDetails.isBanned) throw this.error.accountBanned;
            if(userDetails) return {userExists: true};
            else return {userExists: false};
        } catch (err) {
            console.log(err);
            if (err instanceof this.error.ServiceError) {
                return err.getJSONError();
            } else {
                return this.error.unableToSendOTP.getJSONError();
            }
        }
    }

    verifyOTP = async(phoneNo, otp, deviceId) => {
        try {
            return await this.sequelize.transaction({ isolationLevel: this.seqTransaction.ISOLATION_LEVELS.READ_UNCOMMITTED }, async t => {
                let userData = await this.authRepo.checkUserDetails(phoneNo);
                if (!userData)
                    throw this.error.invalidOTP;
                let userId = userData.id;

                let repoRes = await this.authRepo.verifyOTP(userId, otp, t);
                if (!repoRes.verified)
                    throw this.error.invalidOTP;

                if ((!this.generalConfigs.demoDefaultPhoneNos.includes(phoneNo)) && (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'development')) {
                    let deviceIdExists = await this.authRepo.checkDeviceDetails(userId, t, deviceId);
                    if (!deviceIdExists) await this.authRepo.addDeviceIdOfUser(userId, deviceId, t);
                }
                await this.userRepo.markLoggedIn(userId, t);
                if (userData.dob)
                    userData.dob = this.moment.tz(userData.dob, "Asia/Kolkata").format();

                let refreshTokenID = this.uuid();
                let linkedAccountDetails = await this.userRepo.getLinkedAccount(userId);
                userData['customerId'] = linkedAccountDetails? linkedAccountDetails.customerId: null;

                let [ accessToken, refreshToken ] = await Promise.all([
                    this.loginHelper.generateToken(userData),
                    this.loginHelper.generateToken({ refreshTokenID }),
                    this.userRepo.updateRefreshToken(userId, refreshTokenID, t)
                ]);
                return {
                    userData: userData,
                    token: accessToken,
                    refreshToken
                };
            })
        } catch(err) {
            console.log(err);
            if (err instanceof this.error.ServiceError) {
                return err.getJSONError();
            } else {
                return this.error.unexpectedError.getJSONError();
            }
        }
    }
}