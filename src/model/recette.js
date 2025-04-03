const mongoose = require("mongoose");

// Définition du modèle Ingredient
const Recette = mongoose.model('spr_Recette', new mongoose.Schema({
    nom: String,
    rhum: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Rhum" 
    },  // Référence au modèle Rhum
    ingredients: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "spr_Ingredient" 
    }], // Références aux ingrédients
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "spr_User" 
    },
    instructions: String,
    estPublique: Boolean
}));

module.exports = Recette;
