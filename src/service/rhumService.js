const Rhum = require("../model/rhum");
const globalService = require("./globalService");

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
    globalService.search(
        req, res, 
        Rhum, 
        'Erreur lors de la recherche des rhums'
    );
}



module.exports = {
    getAllRhums,
    searchRhum
}