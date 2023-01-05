const mongoose = require('mongoose');

const wasteSchema = mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, `Le label est requis`],
    },
    issuing_company: {
      type: String,
      required: [true, `Le nom de l'entreprise émettrice est requis`],
    },
    quantity: {
      type: Number,
      required: [true, `La quantité est requise`],
    },
    expiration_date: {
      type: Date,
      required: [true, `La date limite de consommation est requise`],
    },
    is_collected: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Waste', wasteSchema);
