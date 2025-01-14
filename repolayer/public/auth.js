module.exports = class AuthRepo {
    constructor(otpTable, usersTable, sequelize, sequelizeOp, error, generalConfig, centralLogger) {
        this.otpTable = otpTable;
        this.usersTable = usersTable;
        this.sequelize = sequelize;
        this.sequelizeOp = sequelizeOp;
        this.error = error;
        this.generalConfig = generalConfig;
        this.centralLogger = centralLogger;
    }

    checkUserDetails = async (phoneNo, t) => {
        try {
            return await this.usersTable.findOne({
                where: { phoneNo},
                transaction: t,
                raw: true
            });
        } catch (err) {
            console.log("REPO DEBUG: ",err);
            throw err;
        }
    }

    generateOTP = async(userId, phoneNo, t, otpType = this.generalConfig.otpTypes.loginOtp) => {
        let generatedOTP = Math.floor(1000 + Math.random() * 9000);
        if (this.generalConfig.demoDefaultPhoneNos.includes(phoneNo)) generatedOTP = this.generalConfig.defaultDemoOTP;
        let isVerified = false;
        try {
            let previousOTPData = await this.otpTable.findOne({
                where: {
                    userId
                },
                raw: true,
                transaction: t
            });

            if (!previousOTPData) {     //Phone number is also not stored in our DB
                await this.otpTable.create({
                    otp: generatedOTP,
                    type: otpType,
                    //lastProviderID: 1,
                    userId, isVerified: false
                }, {
                    transaction: t
                });
            } else {            //Phone number stored but not verified and OTP requested after 5 mins
                await this.otpTable.update({
                    otp: generatedOTP,
                    type: otpType,
                    //lastProviderID: 1,          // It'll be needed when we're going to use multiple messaging service providers
                    isVerified: false
                }, {
                    transaction: t,
                    where: {
                        userId
                    }
                });
            }
        } catch(err) {
            console.log("REPO DEBUG: ",err);
            throw err;
        }

        let response = { otp: generatedOTP, isVerified: isVerified };
        if (process.env.NODE_ENV !== "prod") 
            console.log(JSON.stringify(response));
        return response;
    }

    verifyOTP = async(userId, otp, t, otpType = this.generalConfig.otpTypes.loginOtp) => {
        try {
            let verified = false
            let res = await this.otpTable.findOne({ where: {
                userId,
                otp: otp,
                type: otpType,
                updatedAt: {
                    [this.sequelizeOp.gte]: this.sequelize.literal(`current_timestamp - interval '5 minutes'`)
                },
            }, transaction: t });

            if (res) {
                await Promise.all([
                    this.otpTable.update({ isVerified: true },{
                        transaction: t,
                        where: { userId }
                    }),
                    this.usersTable.update({ lastLoggedInDate: new Date(Date.now()) },{
                        transaction: t,
                        where: { id: userId }
                    }),
                ])
                verified = true
            }
            return { "status": "success", verified: verified }
        } catch(err) {
            console.log("REPO DEBUG: ",err);
            throw this.error.unableToVerifyOTP;
        }
    }

    checkDeviceDetails = async (userId, t, deviceId = null) => {
        try {
            let data = {userId: userId};
            if (deviceId) data.deviceId = deviceId;
            return await this.userUniqueDevicesTable.findOne({
                where: data,
                raw: true,
                transaction: t
            });
        } catch (err) {
            console.log("REPO DEBUG: ",err);
            throw this.error.unableToVerifyOTP;
        }
    }

    checkDeviceUserLimit = async (userId, deviceId, t) => {
        try {
            let usersLoggedInDevice = await this.userUniqueDevicesTable.findAll({
                where: { deviceId },
                transaction: t,
                raw: true,
                include: [
                    {
                        model: this.usersTable,
                        where: {isDeleted: false}
                    }
                ]
            });
            let isUsersDevice = usersLoggedInDevice.filter(e => e.userId === userId);
            if (isUsersDevice.length === 1) return { phoneNo: [], exceedsLimit: false };
            if (usersLoggedInDevice.length >= this.generalConfig.maxUserPerDevice) {
                let ids = usersLoggedInDevice.map(instance => instance.userId);
                let users = await this.usersTable.findAll({
                    where: { id: ids },
                    transaction: t,
                    raw: true
                });
                let phoneNo = users.map(user => user.phoneNo);
                return { phoneNo, exceedsLimit: true };
            }
            return { phoneNo: [], exceedsLimit: false };
        } catch (err) {
            console.log("REPO DEBUG: ",err);
            throw err;
        }
    }

    addDeviceIdOfUser = async (userId, deviceId, t) => {
        try {
            await this.userUniqueDevicesTable.create({
                    userId, deviceId
                },
                {transaction: t}
            );
        } catch (err) {
            console.log("REPO DEBUG: ",err);
            throw err;
        }
    }
}