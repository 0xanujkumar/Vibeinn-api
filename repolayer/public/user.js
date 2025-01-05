module.exports = class UserRepo {
    constructor(userTable, sequelize, sequelizeOp, errors, generalConfig, centralLogger) {
        this.userTable = userTable;
        this.sequelize = sequelize;
        this.sequelizeOp = sequelizeOp;
        this.error = errors;
        this.generalConfig = generalConfig;
        this.centralLogger = centralLogger;
    }

    getAllUserDetails = async(userids)=>{
        try{
            return await this.userTable.findAll({
                raw:true,
                where:{
                    id:userids
                }
            });
        }catch(err){
            console.log("REPO DEBUG: ",err)
            throw err;
        }
    }
    getUserDetails = async (userId) => {
        try {
            return await this.userTable.findOne({
                where: { id: userId},
                raw: true
            });
        } catch (err) {
            console.log("REPO DEBUG: ",err);
            throw err;
        }
    }

    getAllUserLinkedDetails = async(userId)=>{
          try{
              return await this.userLinkedAccountTable.findAll({
                  raw:true,
                  where:{userId:userId }
              })
          }catch(err){
              console.log("REPO DEBUG: ",err)
              throw err;
          }
    }

    addUserID = async(phoneNo, t) => {
        try {
            return await this.userTable.create(
                {
                    phoneNo, hasLoggedIn: true
                },
                {
                    transaction: t ,
                },
            );
        } catch(err) {
            console.log("REPO DEBUG: ",err)
            throw err;
        }
    }

};
