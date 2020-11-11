const { body } = require("express-validator");

module.exports = [
    body("imageURL", "ImageURL should start with htttp or htttps").custom((value) => {
        const regex = /^https?/g;
        if (!value.match(regex)) {
            throw new Error("ImageURL should start with htttp or htttps")
        }
        return true;
    }),
    body("name", "Name should not be empty").isLength({ min: 1 }).isAlpha(),
    body("address", "Address should not be empty").isLength({ min: 1 }),
    body("price", "Price should not be empty").isLength({ min: 1 }).isNumeric(),
    body("type", "Type should not be empty").isLength({ min: 1 }).isAlpha(),
];
