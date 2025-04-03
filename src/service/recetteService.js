const Recette = require("../model/recette");
const globalService = require("./globalService");
const User = require("../model/user");

// Fonction pour ajouter un nouvel ingrédient
const addRecette = async (req, res) => {
    try {
        let { nom, rhum, ingredients, instructions, estPublique } = req.body; // Récupérer les données depuis la requête

        const user = await User.findById(req.user.userId).select("-mdp"); // Exclure le mot de passe
        

        // Vérifier si une recette ayant le même nom existe déjà (éviter les doublons)
        const existingRecette = await Recette.findOne({ nom });
        if (existingRecette) {
            return res.status(400).json({ message: "Cette recette existe déjà." });
        }

        // Création de la nouvelle recette
        let newRecette;
        if (!user) {
            newRecette = new Recette({ nom, rhum, ingredients, instructions, estPublique });
        }
        else{
            newRecette = new Recette({ nom, rhum, ingredients, instructions, estPublique, user });
        }
        

        // Sauvegarde dans la BDD
        await newRecette.save();

        res.status(201).json({ message: "Recette ajouté avec succès"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Echec de l'enregistrement de la recette", error });
    }
};

async function getPublicRecettes(req, res) {
    const { page = 1, limit = 10 } = req.query; // Récupérer les paramètres de requête pour la pagination

    try {
        // Calculer le nombre d'éléments à sauter
        const skip = (page - 1) * limit;

        // Récupérer les recettes avec pagination
        const recettes = await Recette.find(
            {
                estPublique : true
            }
        ).skip(skip).limit(Number(limit));

        // Récupérer le nombre total de recettes pour calculer le nombre total de pages
        const totalRecettes = recettes.length;
        const totalPages = Math.ceil(totalRecettes / limit);

        res.json({
            recettes,
            totalPages,
            currentPage: Number(page),
            totalRecettes
        });
    } catch (error) {
        res.status(500).json({ message: 'Echec de la récupération des ingrédients', error });
    }
}


async function getPrivateRecettes(req, res) {
    const { page = 1, limit = 10 } = req.query; // Récupérer les paramètres de requête pour la pagination

    const user = await User.findById(req.user.userId).select("-mdp"); // Exclure le mot de passe
    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    try {
        // Calculer le nombre d'éléments à sauter
        const skip = (page - 1) * limit;

        // Récupérer les recettes avec pagination
        const recettes = await Recette.find(
            {
                user : user._id
            }
        ).skip(skip).limit(Number(limit));

        // Récupérer le nombre total de recettes pour calculer le nombre total de pages
        const totalRecettes = recettes.length;
        const totalPages = Math.ceil(totalRecettes / limit);

        res.json({
            recettes,
            totalPages,
            currentPage: Number(page),
            totalRecettes
        });
    } catch (error) {
        res.status(500).json({ message: 'Echec de la récupération des ingrédients', error });
    }
}

const updateRecette = async (req, res) => {
    try {
        const { id } = req.params; // ID de la recette à modifier
        const updates = req.body; // Champs à mettre à jour
        const userId = req.user.userId; // Récupération de l'ID utilisateur depuis le token

        // Vérifier si la recette existe et appartient à l'utilisateur
        const recette = await Recette.findById(id);
        if (!recette) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }

        if (recette.user.toString() !== userId) {
            return res.status(403).json({ message: "Accès refusé, cette recette ne vous appartient pas" });
        }

        // Mettre à jour uniquement les champs envoyés
        const recetteMiseAJour = await Recette.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        res.json({ message: "Recette mise à jour avec succès", recette: recetteMiseAJour });
    } catch (error) {
        console.error("Erreur mise à jour recette :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};


module.exports = {
    addRecette,
    getPublicRecettes,
    getPrivateRecettes,
    updateRecette,
}