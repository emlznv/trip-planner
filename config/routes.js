const tripController = require("../controllers/trip");
const experienceController = require("../controllers/experience");
const itemController = require("../controllers/item");
const userController = require("../controllers/user");
const weatherController = require("../controllers/weather");
const checkAuth = require("../middlewares/check-auth");
const registerMiddlewareValidator = require("../middlewares/registerMiddlewareValidator");
const loginMiddlewareValidator = require("../middlewares/loginMiddlewareValidator");
const tripMiddlewareValidator = require("../middlewares/tripMiddlewareValidator");
const experienceMiddlewareValidator = require("../middlewares/experienceMiddlewareValidator");
const itemMiddlewareValidator = require("../middlewares/itemMiddlewareValidator");

module.exports = (app) => {
    app.get("/", function(req, res) {
        res.render("home");
    });

    app.post("/", weatherController.postWeather);
    
    app.get("/register", checkAuth(false), userController.getRegister);
    app.post("/register", checkAuth(false), registerMiddlewareValidator, userController.postRegister);

    app.get("/login", checkAuth(false), userController.getLogin);
    app.post("/login", checkAuth(false), loginMiddlewareValidator, userController.postLogin);

    app.get("/logout", checkAuth(true), userController.getLogout);

    app.get("/trips", checkAuth(true), tripController.getTrips)
    app.get("/create-trip", checkAuth(true), tripController.getCreateTrip);
    app.post("/create-trip", checkAuth(true), tripMiddlewareValidator, tripController.postCreateTrip);

    app.get("/edit-trip/:id", checkAuth(true), tripController.getEditTrip);
    app.post("/edit-trip/:id", checkAuth(true), tripMiddlewareValidator, tripController.postEditTrip);

    app.get("/delete-trip/:id", checkAuth(true), tripController.getDeleteTrip);

    app.get("/create-experience", checkAuth(true), experienceController.getCreateExperience);
    app.post("/create-experience", checkAuth(true), experienceMiddlewareValidator, experienceController.postCreateExperience);

    app.get("/edit-experience/:id", checkAuth(true), experienceController.getEditExperience);
    app.post("/edit-experience/:id", checkAuth(true), experienceMiddlewareValidator, experienceController.postEditExperience);

    app.get("/delete-experience/:id", checkAuth(true), experienceController.getDeleteExperience);

    app.get("/sightseeing", checkAuth(true), experienceController.getExperiences);
    app.get("/cultural", checkAuth(true), experienceController.getExperiences);
    app.get("/other", checkAuth(true), experienceController.getExperiences);

    app.get("/to-pack", checkAuth(true), itemController.getItems);

    app.post("/to-pack/add", checkAuth(true), itemMiddlewareValidator, itemController.postAddItem);
    app.post("/to-pack/move/:id", checkAuth(true), itemController.postMoveItem);

    app.post("/to-pack/delete/:id", checkAuth(true), itemController.postDeleteItem);

    app.get("*", function (req, res) {
        res.render("404");
      });

};