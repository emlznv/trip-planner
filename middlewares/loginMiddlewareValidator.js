const { body } = require("express-validator");

module.exports = [
    body("username", "Wrong username or password").isAlphanumeric().isLength({ min: 5 }),
    body("password", "Wrong username or password").isAlphanumeric().isLength({ min: 5 })
];