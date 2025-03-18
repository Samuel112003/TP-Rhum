const Rhum = require("../data/rhumData");

async function getAllRhums(req, res) {

    const { page = 1, limit = 10 } = req.query; // Récupérer les paramètres de requête pour la pagination

    try {
        // Calculer le nombre d'éléments à sauter
        const skip = (page - 1) * limit;

        // Récupérer les rhums avec pagination
        const rhums = await Rhum.find().skip(skip).limit(Number(limit));

        // Récupérer le nombre total de rhums pour calculer le nombre total de pages
        const totalRhums = await Rhum.countDocuments();
        const totalPages = Math.ceil(totalRhums / limit);

        res.json({
            rhums,
            totalPages,
            currentPage: Number(page),
            totalRhums
        });
    } catch (error) {
        res.status(500).json({ message: 'Echec de la récupération des rhums', error });
    }
}

async function searchRhum(req, res){
    const { name, rxid_number, pays, distillerie, ABV, categorie, fabriqueAvec, distillation, age, type, degre, visible, createdAt, updatedAt } = req.query;
    let query = {};

    if (name) {
        query.name = { $regex: name, $options: 'i' }; // Recherche insensible à la casse
    }
    /*if (type) {
        query.type = { $regex: type, $options: 'i' }; // Recherche insensible à la casse
    }*/

        //todo à améliorer pour intégrer tous les params de façon propre (ou pas si pas le temps)

    try {
        const rhums = await Rhum.find(query);
        res.status(200).json(rhums);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la recherche des ingrédients', error });
    }
}


module.exports = {
    getAllRhums,
    searchRhum
}