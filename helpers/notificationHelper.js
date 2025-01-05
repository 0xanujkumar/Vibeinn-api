
class NotificationHelper {
    constructor() {
    }


    async syncFCMToken(userID, fcmToken) {
        try {
            await this.publicUserRepo.syncFCMToken(userID, fcmToken);
            return {
                "status": "success"
            };
        } catch(err) {
              console.log(err);            
            this.newrelic.noticeError(err, { message: "Error found in Service Debug" });
            if(err instanceof this.allErrors.NotificationManagementErrors){
                return err.getJSONError();
            }
            return this.allErrors.unexpectedError.getJSONError();
        }
    }
}

module.exports = PublicUserServices;