const rhumService = require('../service/rhumService');

async function getAllRhums(req, res) {
    try {
        const result = await rhumService.getAllRhums(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: 'Échec de la récupération des rhums',
            error
        });
    }
}

module.exports = {
    getAllRhums
};
