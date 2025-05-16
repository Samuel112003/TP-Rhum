const express = require("express");
const rhumService = require("../service/rhumService");
const authMiddleware = require("../middleware/auth");
const rhumController = require('../controller/rhumController');

const router = express.Router();

// La couche decontroller n'a pas encore été implémentée pour les recherches d'éléments
router.get("/search", authMiddleware, async (req, res) => {
    rhumService.searchRhum(req, res);
});

router.get("/", authMiddleware, rhumController.getAllRhums);

module.exports = router;
