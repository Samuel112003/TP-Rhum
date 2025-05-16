const Rhum = require("../model/rhum");
const globalService = require("./globalService");

async function getAllRhums(query) {
    const { page = 1, limit = 10 } = query;

    const skip = (page - 1) * limit;

    const rhums = await Rhum.find().skip(skip).limit(Number(limit));
    const totalRhums = await Rhum.countDocuments();
    const totalPages = Math.ceil(totalRhums / limit);

    return {
        rhums,
        totalPages,
        currentPage: Number(page),
        totalRhums
    };
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