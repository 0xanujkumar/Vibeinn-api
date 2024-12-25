const express = require("express");
const router = express.Router();
const passport = require("passport");
const { UserAuth } = require("../../config/passportConfig")
const generalConfigs = require('../../config/generalConfig');
const { userValidator } = require("../../validator");
const {userService } = require("../../services/public");
const moment = require("moment/moment");
const error = require("../../domain/error")
const centralLogger = require("../../config/logsConfig")
const multer = require('multer')
const upload = multer({
    onError: function (err, next) {
        centralLogger.error("Multer Error:", err)
        next(err)
    }
})
UserAuth(passport)

router.post("/sendOtp/:otpType", passport.authenticate('User-Auth', { session: false }, null),
    async (req, res) => {
        try {
            let userId = req.user.id;
            const phoneNo = req.user.phoneNo;
            let otpType = req.params.otpType;
            if(!otpType || !generalConfigs.otpTypes[otpType]) throw error.jsonFieldRequired("otpType");
            else {
                otpType = generalConfigs.otpTypes[otpType];
                let response = await userService.sendOTP(userId, phoneNo, otpType, req.body);
                if (!response.errorCode) {
                    res.status(200);
                    res.send(response);
                } else {
                    res.status(400);
                    res.send(response);
                }
            }
        } catch (err) {
            centralLogger.error(err);
            res.status(400);
            res.send(err instanceof error.ServiceError? err.getJSONError() :error.unexpectedError.getJSONError());
        }
    }
);
router.post("/verifyOTP/:otpType", passport.authenticate('User-Auth', { session: false }, null),
    async (req, res) => {
        try {
            let userId = req.user.id;
            const phoneNo = req.user.phoneNo;
            let otpType = req.params.otpType;
            let {loanId, otp , coborrowerMobileNo, deviceId, deviceGeohash} = req.body;
            let additionalDetails = {loanId, coborrowerMobileNo, deviceId, deviceGeohash};
            if(!otp || otp.length!==4) throw error.jsonFieldRequired("otp");
            if(!otpType || !generalConfigs.otpTypes[otpType]) throw error.jsonFieldRequired("otpType");
            otpType = generalConfigs.otpTypes[otpType];
            let response = await userService.verifyOTP(userId, phoneNo, otpType, otp, additionalDetails);
            if (!response.errorCode) {
                res.status(200);
                res.send(response);
            } else {
                res.status(400);
                res.send(response);
            }
        } catch (err) {
            centralLogger.error(err);
            res.status(400);
            res.send(err instanceof error.ServiceError? err.getJSONError() :error.unexpectedError.getJSONError());
        }
    }
);

module.exports = router;