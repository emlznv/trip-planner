const experienceModel = require("../models/experience");
const formValidator = require("../middlewares/formValidator");

module.exports = {
    getExperiences(req, res, next) {
        const originalUrl = req.originalUrl;
        const experienceType = originalUrl.replace("/", "");

        experienceModel.find({ type: experienceType, creatorId: req.user._id }).lean()
            .then(experiences => { 
                res.render("experiences", { experiences });
        })
        .catch(next);
    },
    getCreateExperience(req, res) {
        res.render("create-experience");
    },
    postCreateExperience(req, res, next) {
        const formValidations = formValidator(req);

        if (!formValidations.isOk) {
            res.render("create-experience",  formValidations.contextOptions);
            return;
        }
        const { imageURL, name, address, price, type } = req.body;

        experienceModel.create({ imageURL, name, address, price: Number(price), type, creatorId: req.user._id })
            .then(() => res.redirect(`/${type}`))
            .catch(next);
    },
    getEditExperience(req, res, next) {
        const id = req.params.id;
        experienceModel.findById(id).lean().then(experience => {
          res.render("edit-experience", experience);
        }).catch(next);
    },
    postEditExperience(req, res, next) {
        const formValidations = formValidator(req);

        if (!formValidations.isOk) {
            res.render("edit-experience",  formValidations.contextOptions);
            return;
        }
        
        const id = req.params.id;
        const { imageURL, name, address, price, type } = req.body;
    
        experienceModel.updateOne({ _id: id }, { imageURL, name, address, price: Number(price), type, creatorId: req.user._id })
            .then(() => res.redirect(`/${type}`))
            .catch(next);
        
    },
    getDeleteExperience(req, res, next) {
        const id = req.params.id;
 
        Promise.all([experienceModel.findOne({ _id: id }), 
            experienceModel.deleteOne({ _id: id })
        ]).then(([experience, result]) => {
            res.redirect(`/${experience.type}`);
        }).catch(next);
    }
}

