const Ingredient = require("../model/ingredient");
const globalService = require("./globalService");


// Fonction pour ajouter un nouvel ingrédient
const addIngredient = async (req, res) => {
    try {
        let { nom, type, adresseMagasin, prix } = req.body; // Récupérer les données depuis la requête

        // Vérifier si un couple nom-type existe déjà (éviter les doublons)
        const existingIngredient = await Ingredient.findOne({ nom, type });
        if (existingIngredient) {
            return res.status(400).json({ message: "Cet ingrédient est déjà utilisé." });
        }

        // Création du nouvel ingrédient
        const newIngrdient = new Ingredient({ nom, type, adresseMagasin, prix });

        // Sauvegarde dans la BDD
        await newIngrdient.save();

        res.status(201).json({ message: "Ingrédient ajouté avec succès"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Echec de l'enregistrement de l'ingrédient", error });
    }
};

async function getAllIngredients(req, res) {
    const { page = 1, limit = 10 } = req.query; // Récupérer les paramètres de requête pour la pagination

    try {
        // Calculer le nombre d'éléments à sauter
        const skip = (page - 1) * limit;

        // Récupérer les ingrédients avec pagination
        const ingredients = await Ingredient.find().skip(skip).limit(Number(limit));

        // Récupérer le nombre total d'ingrédients pour calculer le nombre total de pages
        const totalIngredients = await Ingredient.countDocuments();
        const totalPages = Math.ceil(totalIngredients / limit);

        res.json({
            ingredients,
            totalPages,
            currentPage: Number(page),
            totalIngredients
        });
    } catch (error) {
        res.status(500).json({ message: 'Echec de la récupération des ingrédients', error });
    }
}


async function searchIngredient(req, res){
    globalService.search(
        req, res, 
        Ingredient, 
        'Erreur lors de la recherche des ingrédients'
    );
}


module.exports = {
    addIngredient,
    getAllIngredients,
    searchIngredient
}