const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Fonction pour ajouter un nouvel utilisateur
const addUser = async (req, res) => {
    try {
        let { nom, adressePostale, email, mdp } = req.body; // Récupérer les données depuis la requête
        mdp = await bcrypt.hash(mdp, 10);

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
        res.status(500).json({ message: "Echec de l'enregistrement de l'utilisateur", error });
    }
};

const login = async (req, res) => {
    try {
        const { email, mdp } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        // Vérifier si le mot de passe est correct
        const isMatch = await bcrypt.compare(mdp, user.mdp);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // Générer le token JWT
        const token = jwt.sign({
             userId: user._id, 
             email: user.email 
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: "1h" 
            }
        );

        res.json({ message: "Connexion réussie", token });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};


module.exports = {
    addUser,
    login
}