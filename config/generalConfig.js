const path = require('path')
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    serverPort: process.env.PORT | 5000,
    baseUrl: process.env.S3BUCKET_CLOUDFRONT_LINK,
    demoDefaultPhoneNos: ["+91-7340586334", "+91-8868095167"],
    defaultDemoOTP: "0001",
    appHash: process.env.ANDROID_APPHASH,
    smsParams: {
        entityID: '1601100000000007265'
    },
    userPlatforms: {
        android: "ANDROID",
    },
    userJwtSecretKey: process.env.USER_SECRET_KEY,
    otpTypes:{
        loginOtp: "LOGIN_OTP",
        forgotPasswordOtp: "FORGOT_PASSWORD_OTP",
        verifyEmailOtp: "VERIFY_EMAIL_OTP",
        verifyPhoneOtp: "VERIFY_PHONE_OTP", 
    },      
    saltRounds: 10,
}