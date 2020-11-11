const { body } = require("express-validator");

module.exports = [
    body("name", "Item should not be empty").isLength({ min: 1 })
];


