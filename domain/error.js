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
    ServiceError,
    phoneNumberInvalid: new ServiceError("phoneNumberInvalid", "Phone number supplied is invalid"),
    phoneNumberRequired: new ServiceError("phoneNumberRequired", "Phone number is required"),
    notAllowedPhoneNo: new ServiceError("notAllowedPhoneNo", "This phone no. is not in the list of beta users... Please contact us for details"),
    userSessionNotCreated: new ServiceError("userSessionNotCreated", "This user id has not created their session, please create session first"),
    unableToSendOTP: new ServiceError("unableToSendOTP", "OTP Cannot be sent either user opted out / unexpected error"),
    unableToVerifyOTP: new ServiceError("unableToVerifyOTP", "OTP Cannot be verified please try again"),
    invalidVoterPic: new ServiceError("invalidVoterPic","The voter front/rear pic is either not supplied or invalid"),
    invalidSelfiePic: new ServiceError("invalidSelfiePic","The selfie pic is either not supplied or invalid"),
    invalidEmiAmount: new ServiceError("invalidEmiAmount", "The emi amount entered is invalid, please check and retry."),
    invalidTransactionID: new ServiceError("invalidTransactionID", "The provided transaction ID is either invalid or not present in our server."),
    pendingTransaction: new ServiceError("pendingTransaction", "There is already an transaction running on your account, please complete that first"),
    invalidAuthCredentials: new ServiceError( 'invalidAuthCredentials', 'The combination of username and password is incorrect'),
    invalidTimeFormat: new ServiceError("invalidTimeFormat", "The time layout format must be in DD-MM-YYYY"),
    unexpectedError: new ServiceError("unexpectedError", "Apologies for the inconvenience! We're fixing it. Please try again later."),
    unexpectedErrorFromPartner: new ServiceError("unexpectedErrorFromPartner", "Apologies for the inconvenience! We're working with our partners to resolve this. Please try again later."),
    unexpectedErrorFromPaymentVendor: new ServiceError("unexpectedErrorFromPaymentVendor", "Apologies for the inconvenience! Our payment Vendor is down. Please try again later."),
    invalidCustomerDetails : new ServiceError("invalidCustomerDetails","The provided bill details are incorrect, please check your input."),
    accountBanned: new ServiceError("accountBanned","Your account has been banned due to suspicious activities."),
    migrationRequestPending: new ServiceError("migrationRequestPending","There is a migration request pending for your account, please try again later."),
    userNotFound: new ServiceError("userNotFound","No account is found with the details provided, please recheck the details"),
    loansNotFound: new ServiceError("loansNotFound","No loans found for the user"),
    loanNotFound: new ServiceError("loanNotFound","No loan with given ID found for you."),
    userAccountDeleted: new ServiceError("userAccountDeleted","You've deleted your account, Please contact customer care for further help"),
    accountNotLinked: new ServiceError("accountNotLinked","No linked account found for your profile"),
    unableToSendMessage : new ServiceError("unableToSendMessage", "There is some issue in sending message, please try again later"),
    invalidOTP: new ServiceError("invalidOTP","The OTP sent by the client is invalid or not matching"),
    invalidBody: new ServiceError("invalidBody","The Request body is invalid or incomplete"),
    otherAccountLinked: new ServiceError("otherAccountLinked","You already have an other account linked with your profile"),
    alreadyLinkedToYourProfile: new ServiceError("alreadyLinkedToYourProfile","You already have this account linked with your profile"),
    noAccountLinkedToYourProfile: new ServiceError("noAccountLinkedToYourProfile","We couldn't find a linked account to delink. You can always link an account later!"),
    invalidLoanId: new ServiceError("invalidLoanId","The loan Id provided is invalid valid or not tagged."),
    invalidMigrationId: new ServiceError("invalidMigrationId","The migration Id provided is invalid valid or not tagged."),
    invalidStatus: new ServiceError('invalidStatus', 'The loan status has reached final stage or is invalid.'),
    invalidCenterId: new ServiceError('invalidCenterId', 'The provided center is either empty or invalid.'),
    invalidBranchId: new ServiceError("invalidBranchId", "The provided branch is either invalid or empty."),
    invalidRoleId: new ServiceError("invalidRoleId", "The provided role is either invalid or empty."),
    invalidPermissionId: new ServiceError("invalidPermissionId", "The provided permission is either invalid or empty."),
    aadhaarMissing: new ServiceError("aadhaarMissing","Your aadhaar is required to complete this action, please upload you aadhaar."),
    voterMissing: new ServiceError("voterMissing","Your voter is required to complete this action, please upload you voter."),
    cbAlreadyFetched: new ServiceError("cbAlreadyFetched","You already have fetched your CB report for this loan."),
    coborrowerExists: new ServiceError("coBorrowerExists","A coborrower already exists for your loan"),
    deviceIdRequired: new ServiceError("deviceIdRequired", "A unique device ID field which is required while logging in is not provided."),
    noAccountLinked: new ServiceError("noAccountLinked",`No account is linked to the mobile number to which you're trying to migrate.`),
    invalidMigrationRequestId: new ServiceError("invalidMigrationRequestId",`The migration request ID you provided either doesn't exist or is already processed.`),
    migrationLimitReached: new ServiceError("migrationLimitReached",`You can't raise a request to migrate as you already have a pending request or may have migrated in past.`),
    invalidCustomerIDAndMobileComb: new ServiceError("invalidCustomerIDAndMobileComb",`The combination you provided for customerID and mobile number is invalid.`),
    deviceUserLimitExceed: new ServiceError("deviceUserLimitExceed",`The device has reached its limit for unique user login. You can only login using previously logged in numbers.`),
    invalidPage:new ServiceError("invalidPage",`The page no is not valid`),
    invalidPageSize:new ServiceError("invalidPageSize",`The pageSize is not valid`),
    invalidStatusOfRequests:new ServiceError("invalidStatusOfRequests",`The invalidStatusOfRequests is not valid`),
    formFieldError: new ServiceError("invalidFormFieldName","Please check the form fields name before making a request"),
    tooManyFiles: new ServiceError('tooManyFiles', 'The number of files are too many.'),
    invalidFile: new ServiceError("invalidFile", "The file provided is not valid, please try with a different file"),
    invalidDocumentFrontOrRearPic: new ServiceError("invalidDocumentFrontOrRearPic","Either Front and Rear picture is invalid or not supplied"),
    invalidUserId: new ServiceError('invalidUserId', 'The provided user-id is invalid.'),
    invaliduserName: new ServiceError('invaliduserName', 'The provided user-name is invalid.'),
    invalidVillageDetails: new ServiceError('invalidVillageDetails', 'Provided Village Details are invalid.'),
    invalidPurposeId: new ServiceError('invalidPurposeId', 'The provided purpose id is either invalid or empty.'),
    invalidProductId: new ServiceError('invalidProductId', 'The provided product id is either invalid or empty.'),
    adminUserAlreadyExists: new ServiceError('adminUserAlreadyExists', 'User already exists with provided user-name.'),
    invalidDocumentType: new ServiceError('invalidDocumentType', 'The document provided is invalid.'),
    noTaggedOpenLoanFound: new ServiceError("noTaggedOpenLoanFound", "No Tagged Open Loan Found in DB."),
    sameNoAsBorrower: new ServiceError("sameNoAsBorrower", "The provided phone number is already used in your borrower account."),
    unableToAddMoreDocuments: new ServiceError("unableToAddMoreDocuments","You have already uploaded the document and can't update or add more."),
    unableToUploadToS3: new ServiceError('unableToUploadToS3', 'The file cannot be uploaded to s3 please try again.'),
    unableToDeleteFromS3: new ServiceError('unableToDeleteFromS3', 'Unable to delete previous redundant data from s3.'),
    ocrFailed: new ServiceError('ocrFailed', "We are not able to validate your image, please upload a valid and clear image."),
    thirdPartyVerificationFailed: new ServiceError('thirdPartyVerificationFailed', 'We are not able to validate your document details, please upload a valid and clear image..'),
    unableToConvertBufferToImage: new ServiceError('unableToConvertBufferToImage', 'Failed the conversion from buffer to image'),
    coolDownEnabled : new ServiceError('coolDownEnabled', `You can not apply for new loan as you have already applied for a loan in last ${generalConfigs.loanRequestCoolDown} days.`),
    permissionIdentifierExists: new ServiceError('Permission identifier already exists.'),
    roleExists: new ServiceError('Role already exists.'),
    rolePermissionExists: new ServiceError('Role permission already exists.'),
    samePassword: new ServiceError('samePassword', 'The new password cannot be same as the old password.'),
    invalidOldPassword: new ServiceError('invalidPassword', 'The password provided is invalid.'),
    selfModificationNotAllowed: new ServiceError('selfModificationNotAllowed', 'You cannot modify your own status.'),
    documentAlreadyRegistered: (registeredNo, documentType) => new ServiceError("documentAlreadyRegistered", `The uploaded ${documentType} is already registered with ${registeredNo}.`),
    jsonFieldRequired: (fieldName) => {
        return new ServiceError("invalidOrMissingField",`Please check, the field ${fieldName} is either missing or invalid`)
    },
    requirementsNotMet: (field) => new ServiceError("requirementsNotMet",`${field} check failed, please review and complete the step to submit your loan application.`),
    coborrowerRequirementsNotMet: (field) => new ServiceError("coborrowerRequirementsNotMet",`Coborrower's ${field} check failed, please review and complete the step to submit your loan application.`),
    externalError: (errorCode, errorDescription) => {
        return new ServiceError(errorCode,errorDescription)
    },
    activeApplicationPresent: (coolDownDays, pendingDays) => {               // needs translation
        return new ServiceError(`activeApplicationPresent`, `You have already applied for loan in last ${coolDownDays} days. Please wait for ${pendingDays} days more.`);
    },
    accountAlreadyLinked: (phoneNo) => new ServiceError("accountAlreadyLinked",`The provided account is already linked to user with mobile number XXXXXX${phoneNo.slice(10,14)}.`),
    minPaymentAmountRequired: minAmountRequired =>  new ServiceError("minPaymentAmountRequired", `You can't initiate a payment lessl than  ${minAmountRequired} , Please try to pay amount greater or equal to ${minAmountRequired}.`),
}