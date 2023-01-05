const Waste = require("../models/waste");

exports.getAll = (req, res, next) => {
    Waste.find({})
    .then((wastes) => {
        if (!wastes) console.log("No wastes found")
        else{
            res.status(200).json(wastes);
        }
    })
}
