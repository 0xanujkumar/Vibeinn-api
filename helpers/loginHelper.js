const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const {saltRounds} = require("../config/generalConfig");
const bcrypt = require("bcryptjs")
require('dotenv').config();

const userServiceTokenExpiryTime = `${process.env.USER_MGMT_EXPY_TIME?process.env.USER_MGMT_EXPY_TIME:48}h`;
const adminUserServiceTokenExpiryTime = `${process.env.ADMIN_USER_MGMT_EXPY_TIME?process.env.ADMIN_USER_MGMT_EXPY_TIME:48}h`;

function generateUsersToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign({ client: payload }, process.env.USER_SECRET_KEY, { expiresIn: userServiceTokenExpiryTime },
            (err, token) => {
                err ? reject(err) : resolve(token)
            }
        )
    })
}

function decodeUsersJWTToken(token) {
    try { 
        return jwtDecode(token); 
    } catch(err) { 
        return { client: {} }; 
    }
}

function encryptPassword(pass){
    return new Promise((onResolve, onReject) => {
        bcrypt.hash(pass, saltRounds, function(err, hash) {
            if(err) onReject(err)
            else onResolve(hash)
        });
    })
}

function checkPassword(givenPass, hashedPass){
    return new Promise((onResolve, onReject) => {
        bcrypt.compare(givenPass, hashedPass, function(err, result) {
            if(err) onReject(err)
            else onResolve(result)
        });
    })
}


module.exports = { 
    generateUsersToken,
    decodeUsersJWTToken,
    encryptPassword,
    checkPassword,
}