const express = require("express");
const router = express.Router();
const { authValidator } = require("../../validator");
const { authService } = require("../../services/public");
const centralLogger = require("../../config/logsConfig")
const error = require("../../domain/error");

router.get("/checkUser/:phoneNumber", async (req, res) => {
    let response;
    try {
            let phoneNumber = req.params.phoneNumber;
            if (!phoneNumber || !phoneNumber.match(/^[+][9][1][-](\d{10})$/)) {
                res.status(400);
                res.send("Invalid Mobile Number");
            } else {
                response = await authService.checkUserExists(phoneNumber);
                if (response.errorCode === undefined) {
                    res.status(200);
                    res.send(response);
                } else {
                    res.status(400);
                    res.send(response);
                }
            }
    } catch (err) {
        centralLogger.error(err);
        res.status(404);
        res.send("Unable to verify OTP");
    }
});

router.post("/register", async (req, res) => {
    try {
      const { phoneNumber } = req.body;
  
      let response = await authService.authSendOTP(phoneNumber);

      if (response.errorCode === undefined) {
        res.status(200).send(response);
      } else {
        res.status(400).send(response);
      }
    } catch (err) {
      centralLogger.error(err);
      res.status(404).send("Unable to send OTP");
    }
  });
  

router.post("/login", async (req, res) => {
    let response;
    try {
        if (!req.body) {
            res.status(400);
            res.send("Invalid Body");
        } else {
            if (!req.body.phoneNumber || !req.body.phoneNumber.match(/^[+][9][1][-](\d{10})$/)) {
                res.status(400);
                res.send("Invalid Mobile Number");
            } else if (!req.body.otp) {
                res.status(400);
                res.send("OTP field value missing");
            } else if (!req.body.deviceId) {
                res.status(400);
                res.send("Device-id is missing");
            } else {
                const { phoneNumber, otp, deviceId } = req.body;
                response = await authService.verifyOTP(phoneNumber, otp, deviceId);
                if (response.errorCode === undefined) {
                    res.status(200);
                    res.send(response);
                } else {
                    res.status(400);
                    res.send(response);
                }
            }
        }
    } catch (err) {
        centralLogger.error(err);
        res.status(404);
        res.send("Unable to verify OTP");
    }
});

module.exports = router;