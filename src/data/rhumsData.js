const mongoose = require("mongoose");
const db = require("./db");


db.connect();

// Définition du modèle Rhum
const Rhum = mongoose.model('Rhum', new mongoose.Schema({
    nom: String,
    origine: String,
    annee: Number
}));

async function getAllRhums(res) {
    try {
        const rhums = await Rhum.find();
        res.json(rhums);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
}


module.exports = {
    getAllRhums
}
