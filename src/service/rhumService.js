const Rhum = require("../model/rhum");

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
    let query = {};
    for(let key in req.query){
        if(req.query[key]){
            query[key] = { $regex: req.query[key].trim(), $options: 'i' };;
        }//todo certain champ ne passent pas comme pays. pour certain c'est parce que regex ne prend en compte que les string
    }

    try {
        const rhums = await Rhum.find(query);
        res.status(200).json(rhums);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la recherche des rhums', error });
    }
}


module.exports = {
    getAllRhums,
    searchRhum
}