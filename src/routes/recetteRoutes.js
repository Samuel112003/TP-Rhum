const express = require("express");
const recetteService = require("../service/recetteService");
const authMiddleware = require("../middleware/auth");
const User = require("../model/user");

const router = express.Router();

// Route sécurisée
router.post("/add", authMiddleware, async (req, res) => {
    recetteService.addRecette(req, res);
});

router.get("/getPublic", authMiddleware, async (req, res) => {
    recetteService.getPublicRecettes(req, res);
});


router.get("/getPrivate", authMiddleware, async (req, res) => {
    recetteService.getPrivateRecettes(req, res);
});

router.put("/update/:id", authMiddleware, recetteService.updateRecette);


module.exports = router;
