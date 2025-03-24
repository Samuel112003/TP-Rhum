const Recette = require("../model/recette");
const globalService = require("./globalService");


// Fonction pour ajouter un nouvel ingrédient
const addRecette = async (req, res) => {
    try {
        let { nom, rhum, ingredients, instructions, estPublique } = req.body; // Récupérer les données depuis la requête

        // Vérifier si une recette ayant le même nom existe déjà (éviter les doublons)
        const existingRecette = await Recette.findOne({ nom });
        if (existingRecette) {
            return res.status(400).json({ message: "Cette recette existe déjà." });
        }

        // Création de la nouvelle recette
        const newRecette = new Recette({ nom, rhum, ingredients, instructions, estPublique });

        // Sauvegarde dans la BDD
        await newRecette.save();

        res.status(201).json({ message: "Recette ajouté avec succès"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Echec de l'enregistrement de la recette", error });
    }
};
/*
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
*/
/*
async function searchIngredient(req, res){
    globalService.search(
        req, res, 
        Ingredient, 
        'Erreur lors de la recherche des ingrédients'
    );
}*/


module.exports = {
    addRecette,
}