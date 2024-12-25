const Strategy = require('passport-jwt').Strategy
require("dotenv").config();
let ExtractJwt = require('passport-jwt').ExtractJwt;
const generalConfigs = require("../config/generalConfig")
const lodash = require("lodash");

const userJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: generalConfigs.userJwtSecretKey
}

function UserAuth(passport) {
    passport.use('User-Auth', new Strategy(userJwtOptions, function(jwt_payload, done) {
        let borrowerAuthObj = {};
        Object.assign(borrowerAuthObj, jwt_payload.client);
        Object.assign(borrowerAuthObj, { userId: jwt_payload.client.id })
        return (jwt_payload.client.id)?
            done(null, borrowerAuthObj):
            done(null, false)
    }));
}

module.exports = {
    UserAuth
}