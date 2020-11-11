const itemModel = require("../models/item");
const formValidator = require("../middlewares/formValidator");

module.exports = {
    getItems(req, res, next) {
        itemModel.find({ creatorId: req.user._id }).lean()
            .then((items) => { 
                const toPackItems = Object.values(items).filter((item) => item.packed === false);
                const packedItems = Object.values(items).filter((item) => item.packed === true);
                res.render("to-pack", { toPackItems, packedItems }
            )
        })
        .catch(next);
    },
    postAddItem(req, res, next) {
        const formValidations = formValidator(req);

        if (!formValidations.isOk) {
            res.render("to-pack",  formValidations.contextOptions);
            return;
        }
        
        const { name } = req.body;
        itemModel.create({ name, packed: false, creatorId: req.user._id })
          .then(() => res.redirect("/to-pack"))
          .catch(next);
    },
    postMoveItem(req, res, next) {
        const id = req.params.id;

        itemModel.updateOne({ _id: id }, { $set: { packed: true } })
            .then(() => res.redirect("/to-pack"))
            .catch(next);
    },
    postDeleteItem(req, res, next) {
        const id = req.params.id;

        itemModel.deleteOne({ _id: id })
            .then(() => res.redirect("/to-pack"))
            .catch(next);
    }
}