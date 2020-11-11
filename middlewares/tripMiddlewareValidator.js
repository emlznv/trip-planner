const { body } = require("express-validator");

module.exports = [
    body("location", "Location should not be empty").isLength({ min: 1 }).isAlpha(),
    body("imageURL", "ImageURL should start with htttp or htttps").custom((value) => {
        const regex = /^https?/g;
        if (!value.match(regex)) {
            throw new Error("ImageURL should start with htttp or htttps")
        }
        return true;
    }),
    body("startDate", "Start Date should not be empty").isLength({ min: 1 }),
    body("endDate", "End Date should not be empty").isLength({ min: 1 }),
    body("place", "Place should not be empty").isLength({ min: 1 }).isAlpha(),
    body("budget", "Budget should not be empty").isLength({ min: 1 }).isNumeric()
];
