const Waste = require("../models/waste");
const Joi = require("joi")

exports.getAll = (req, res, next) => {
    Waste.find({})
    .then((wastes) => {
        if (!wastes) res.status(500).json({message: "No waste found"})
        else{
            res.status(200).json(wastes);
        }
    })
}

exports.getOne = (req, res, next) => {
    Waste.findOne({_id : req.params.id})
    .then((waste) => {
        if (!waste) res.status(500).json({message: "Waste not found"})
        else{
            res.status(200).json(waste);
        }
    })
}

exports.create = (req, res, next) => {
    const wasteValidationSchema = Joi.object({
        label: Joi.string().required(),
        issuing_company : Joi.string().required(),
        quantity : Joi.number().required(),
        expiration_date : Joi.date().required(),
        is_collected : Joi.boolean(),
    })

    const { error, value } = wasteValidationSchema.validate(req.body)
    if(error) res.status(500).json({message: error.message})
    else{
        Waste.create(value)
            .then((data) => res.status(200).json(data))
            .catch(() => res.status(500).json({message: 'Error during creating waste'})); 
    }
}

exports.update = (req, res, next) => {
    const wasteValidationSchema = Joi.object({
        label: Joi.string(),
        issuing_company : Joi.string(),
        quantity : Joi.number(),
        expiration_date : Joi.date(),
        is_collected : Joi.boolean(),
    })

    const { error, value } = wasteValidationSchema.validate(req.body)
    if(error) res.status(500).json({message: error.message})
    else{
        Waste.findByIdAndUpdate(req.params.id, value, {new: true})
            .then((data) => res.status(200).json(data))
            .catch(() => res.status(500).json({message: 'Error during update waste'})); 
    }
}

exports.delete = (req, res, next) => {
    Waste.deleteOne({_id : req.params.id})
    .then((waste) => {
        if (!waste.deletedCount) res.status(500).json({message: "Waste not found"})
        else res.status(200).json({message: "Waste deleted successfully"})
    })
}

