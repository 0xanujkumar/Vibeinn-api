
const awsSNSHelper = require("../helpers/snsHelper");
const generalConfig = require('../config/generalConfig')
const messageTemplates = require("../config/smsTemplates.json");
let awsSNSHelperInstance = new awsSNSHelper();
const error = require("./../domain/error");
// const centralLogger = require("../config/logsConfig");

module.exports = class SMSHelper {

    constructor() {
        this.locale = "en";
    }

    async sendSMS(phoneNo, smsTemplateName, smsTemplateParams, message) {
        if (smsTemplateName && smsTemplateParams) {
            message = messageTemplates[this.locale][smsTemplateName].message;
            let curr_ind = 0;
            for (let i=0; i < message.length; i++) {
                if (message.substr(i, 7) === "{#var#}") {
                    message = message.substr(0, i) + (curr_ind < smsTemplateParams.length ? smsTemplateParams[curr_ind++] : "-") + message.substr(i + 7);
                }
            }
        }
    
        let otpParams = {
            Message: message,
            PhoneNumber: phoneNo,
            MessageAttributes: {
                "AWS.SNS.SMS.SMSType": {
                    DataType: "String",
                    StringValue: "Transactional",
                },
            },
        }
    
        try {
            if ( smsTemplateParams) {
                otpParams.MessageAttributes["AWS.MM.SMS.EntityId"] = {
                    "DataType": "String",
                    "StringValue": generalConfig.smsParams.entityID
                };
                otpParams.MessageAttributes["AWS.MM.SMS.TemplateId"] = {
                    "DataType": "String",
                    "StringValue": messageTemplates[this.locale][smsTemplateName].templateID
                };
                otpParams.MessageAttributes["AWS.SNS.SMS.SenderID"] = {
                    "DataType": "String",
                    "StringValue": messageTemplates[this.locale][smsTemplateName].senderID
                };
            }

            const pubData = await awsSNSHelperInstance.publish(otpParams, phoneNo)
            console.log(`the message data is (AWS SNS) = ${pubData.MessageId}, sent to ${phoneNo}`)
            return { "status": "success", "messageId": pubData.MessageId };
    
        } catch (err) {
            console.log(err);
            throw error.unableToSendMessage.getJSONError();
        }
    }

}