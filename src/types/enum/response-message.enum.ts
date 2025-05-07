enum ResponseMessage {
    // HTTP Status 200
    SUCCESS = "Succese",

    // HTTP Status 400
    VALIDATION_FAILED = "Validation failed.",
    DUPLICATE_ID = "Duplicate id.",
    DUPLICATE_EMAIL = "Duplicate email.",
    DUPLICATE_NICKNAME = "Duplicate nickname.",
    DUPLICATE_TEL_NUMBER = "Duplicate tel number.",
    NOT_EXISTED_USER = "This user does not exist.",
    NOT_EXISTED_BAKERY = "This bakery does not exist.",
    NOT_EXISTED_MARKER = "This marker does not exist",

    // HTTP Status 401
    SIGN_IN_FAIL = "Login information mismatch.",
    AUTHORIZATION_FAIL = "Authorization Failed.",

    // HTTP Status 403
    NO_PERMISSION = "Do not have permission.",

    // HTTP Status 500
    DATABASE_ERROR = "Database error.",
};

export default ResponseMessage;