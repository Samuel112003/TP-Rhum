const express = require("express");
const rhumService = require("../service/rhumService");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Route sécurisée
router.get("/search", authMiddleware, async (req, res) => {//todo sécuriser toutes les routes avec authMiddleware
    rhumService.searchRhum(req, res);
});

router.get("/", authMiddleware, async (req, res) => {
    rhumService.getAllRhums(req, res);
});

module.exports = router;
