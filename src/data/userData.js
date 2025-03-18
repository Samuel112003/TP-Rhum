const mongoose = require("mongoose");

// Définition du modèle User
const User = mongoose.model('spr_User', new mongoose.Schema({
    nom: String,
    adressePostale: String,
    email: String,
    mdp: String,
}));

module.exports = User;
