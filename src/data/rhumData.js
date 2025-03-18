const mongoose = require("mongoose");

// Définition du modèle Rhum
const Rhum = mongoose.model('Rhum', new mongoose.Schema({
    name: String,
    rxid_number: String,
    pays: String,
    distillerie: String,
    ABV: String,
    categorie: String,
    fabriqueAvec: String,
    distillation: String,
    age: String,
    type: String,
    degre: Number,
    visible: Boolean,
    createdAt: Date,
    updatedAt: Date
}));


module.exports = Rhum;
