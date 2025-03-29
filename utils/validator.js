let { body, validationResult } = require('express-validator')
let constants = require('./constants')
let util = require('util')

let options = {
    password: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    },
    username: {
        minLength: 6
    },
    fullname: {
        maxLength: 50
    },
    avatarUrl: {
        isUrl: true
    },
}

module.exports = {
    validate: function (req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            CreateErrorResponse(res, 400, errors.array())
        } else {
            next();
        }
    },
    SignUpValidator: [
        body("username").isLength(options.username).withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME, options.username.minLength)),
        body("password").isStrongPassword(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
            options.password.minLength,
            options.password.minLowercase,
            options.password.minUppercase,
            options.password.minNumbers,
            options.password.minSymbols)),
        body("email").isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL),
        body("fullname").isLength({ max: options.fullname.maxLength }).withMessage(`Fullname không được dài quá ${options.fullname.maxLength} ký tự`),
        body("avatarUrl").isURL().withMessage("AvatarUrl phải là một URL hợp lệ")
    ],
    LoginValidator: [
        body("username").isLength(options.username).withMessage("username hoac password sai"),
        body("password").isStrongPassword(options.password).withMessage("username hoac password sai")
    ],
    ChangePasswordValidator: [
        body("oldpassword").isStrongPassword(options.password).withMessage("Mật khẩu cũ không đúng định dạng"),
        body("newpassword").isStrongPassword(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
            options.password.minLength,
            options.password.minLowercase,
            options.password.minUppercase,
            options.password.minNumbers,
            options.password.minSymbols))
    ],
    ForgotPasswordValidator: [
        body("email").isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL)
    ],
    ResetPasswordValidator: [
        body("password").isStrongPassword(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
            options.password.minLength,
            options.password.minLowercase,
            options.password.minUppercase,
            options.password.minNumbers,
            options.password.minSymbols))
    ],
    CreateUserValidator: [
        body("username").isLength(options.username).withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME, options.username.minLength)),
        body("password").isStrongPassword(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
            options.password.minLength,
            options.password.minLowercase,
            options.password.minUppercase,
            options.password.minNumbers,
            options.password.minSymbols)),
        body("email").isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL),
        body("fullname").isLength({ max: options.fullname.maxLength }).withMessage(`Fullname không được dài quá ${options.fullname.maxLength} ký tự`),
        body("avatarUrl").isURL().withMessage("AvatarUrl phải là một URL hợp lệ"),
    ],
    UpdateUserValidator: [
        body("username").isLength(options.username).withMessage(util.format(constants.VALIDATOR_ERROR_USERNAME, options.username.minLength)),
        body("password").isStrongPassword(options.password).withMessage(util.format(constants.VALIDATOR_ERROR_PASSWORD,
            options.password.minLength,
            options.password.minLowercase,
            options.password.minUppercase,
            options.password.minNumbers,
            options.password.minSymbols)),
        body("email").isEmail().withMessage(constants.VALIDATOR_ERROR_EMAIL),
        body("fullname").isLength({ max: options.fullname.maxLength }).withMessage(`Fullname không được dài quá ${options.fullname.maxLength} ký tự`),
        body("avatarUrl").isURL().withMessage("AvatarUrl phải là một URL hợp lệ"),
    ]
}