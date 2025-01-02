const { SNS } = require("@aws-sdk/client-sns");
const awsConfig = require("../config/awsConfig");
const awsSns = new SNS(awsConfig.awsSnsConfigs);
// const centralLogger = require("../config/logsConfig")

module.exports = class awsSNSHelper {
    constructor() {
    }

    async publish(otpParams, phoneNo) {
        try {
            const pubData = await awsSns.publish(otpParams);
            console.log(otpParams);
            console.log(`the message data is (AWS SNS) = ${pubData.MessageId}, sent to ${phoneNo}`);
            return pubData;

        } catch (err) {
            centralLogger.error(err);
            throw err;
        }
        
    }
}