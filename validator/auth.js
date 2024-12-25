const errors = require("../domain/error");

module.exports = class AuthServicesValidator {
        validateSendOTPReq(req) {
            if (req.body !== undefined) {
                const phoneNumber = req.body.phoneNumber
                const deviceId = req.body.deviceId
                let valid = false;
                if (phoneNumber === undefined) {
                    return {
                        valid: false,
                        error: errors.phoneNumberRequired
                    }
                } else if (phoneNumber.length < 10) {
                    return {
                        valid: false,
                        error: errors.phoneNumberInvalid
                    }
                } else if (deviceId === undefined || deviceId === "") {
                    return {
                        valid: false,
                        error: errors.deviceIdRequired
                    }
                }
                return {
                    valid: true,
                    validatedData: {
                        phoneNumber: phoneNumber
                    }
                }
            }
            return {
                valid: false,
                error: errors.phoneNumberRequired
            }
        }
    }