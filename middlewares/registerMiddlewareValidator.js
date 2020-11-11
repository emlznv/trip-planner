const { body } = require("express-validator");

module.exports = [
    body("username", "Username should be at least 5").isAlphanumeric().isLength({ min: 5 }),
    body("password", "Password should be at least 3").isAlphanumeric().isLength({ min: 5 }),
    body("repeatPassword").custom(repeatPasswordCheck)
];

function repeatPasswordCheck(repeatPassword, { req }) {
    if (repeatPassword !== req.body.password) {
        throw new Error("Passwords do not match");
    }
    return true;
}



