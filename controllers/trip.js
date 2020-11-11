const tripModel = require("../models/trip");
const formValidator = require("../middlewares/formValidator");

module.exports = {
    getTrips(req, res, next) {
        tripModel.find({ creatorId: req.user._id }).lean()
            .then(trips => { res.render("trips", { trips })
        })
        .catch(next);
    },
    getCreateTrip(req, res) {
        res.render("create-trip");
     },
    postCreateTrip(req, res, next) {
        const formValidations = formValidator(req);

        if (!formValidations.isOk) {
            res.render("create-trip",  formValidations.contextOptions);
            return;
        }
        const { location, imageURL, startDate, endDate, place, budget } = req.body;
    
        let startDateFormatted = startDate.replace(/-/g, "/").slice(2);
        let endDateFormatted = endDate.replace(/-/g, "/").slice(2);

        tripModel.create({ location, imageURL, startDate: startDateFormatted, endDate: endDateFormatted, place, budget: Number(budget), creatorId: req.user._id })
          .then(() => res.redirect("/trips"))
          .catch(next);
    },
    getEditTrip(req, res, next) {
        const id = req.params.id;
        tripModel.findById(id).lean().then(trip => {
          res.render("edit-trip", { trip });
        }).catch(next);
    },
    postEditTrip(req, res, next) {
        const formValidations = formValidator(req);

        if (!formValidations.isOk) {
            res.render("edit-trip",  formValidations.contextOptions);
            return;
        }
        const id = req.params.id;
        const { location, imageURL, startDate, endDate , place, budget } = req.body;
        let startDateFormatted = startDate.replace(/-/g, "/").slice(2);
        let endDateFormatted = endDate.replace(/-/g, "/").slice(2);

        tripModel.updateOne({ _id: id }, { location, imageURL, startDate: startDateFormatted, endDate: endDateFormatted, place, budget: Number(budget), creatorId: req.user._id })
            .then(() => res.redirect("/trips"))
            .catch(next);
    },
    getDeleteTrip(req, res, next) {
        const id = req.params.id;

        tripModel.deleteOne({ _id: id }).then(() => {
          res.redirect("/trips");
        }).catch(next);
    }
}