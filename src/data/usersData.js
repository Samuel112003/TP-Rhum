const mongoose = require("mongoose");
const db = require("./db");


db.connect();

// Définition du modèle User
const User = mongoose.model('User', new mongoose.Schema({
    nom: String,
    adressePostale: String,
    email: String,
    mdp: String,
}));

//todo ajouter hashage du mot de passe

// Fonction pour ajouter un nouvel utilisateur
const addUser = async (req, res) => {
    try {
        const { nom, adressePostale, email, mdp } = req.body; // Récupérer les données depuis la requête

        // Vérifier si l'email existe déjà (évite les doublons)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // Création du nouvel utilisateur
        const newUser = new User({ nom, adressePostale, email, mdp });

        // Sauvegarde dans la BDD
        await newUser.save();

        res.status(201).json({ message: "Utilisateur ajouté avec succès"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};


module.exports = {
    addUser
}
