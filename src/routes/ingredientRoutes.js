const express = require("express");
const ingredientService = require("../service/ingredientService");
const authMiddleware = require("../middleware/auth");

const router = express.Router();


router.post("/add", authMiddleware, async (req, res) => {
    ingredientService.addIngredient(req, res);
});

router.get("/search", authMiddleware, async (req, res) => {
    ingredientService.searchIngredient(req, res);
});

router.get("/", authMiddleware, async (req, res) => {
    ingredientService.getAllIngredients(req, res);
});

module.exports = router;