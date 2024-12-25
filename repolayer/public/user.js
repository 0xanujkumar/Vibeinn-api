module.exports = class UserRepo {

    constructor(userTable, sequelize, sequelizeOp, errors, generalConfig, centralLogger, ) {
        this.userTable = userTable;
        this.sequelize = sequelize;
        this.sequelizeOp = sequelizeOp;
        this.error = errors;
        this.generalConfig = generalConfig;
        this.centralLogger = centralLogger;
    }
}