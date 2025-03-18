const mongoose = require("mongoose");

// Définition du modèle Ingredient
const Ingredient = mongoose.model('spr_Ingredient', new mongoose.Schema({
    nom: String,
    type: String,
    adresseMagasin: String,
    prix: Number,
}));

module.exports = Ingredient;
