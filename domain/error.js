const generalConfigs = require('../config/generalConfig');
class ServiceError extends Error {
    constructor(errorCode, errorDescription) {
        super(errorCode);
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
    }
    getJSONError() {
        return {
            errorCode: this.errorCode,
            errorDescription: this.errorDescription
        }
    }
}

module.exports = {
    ServiceError
}