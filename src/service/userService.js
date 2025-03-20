const User = require("../model/user");
const bcrypt = require("bcrypt");


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
        console.log(error);
        res.status(500).json({ message: "Echec de l'enregistrement de l'utilisateur", error });
    }
};


module.exports = {
    addUser
}