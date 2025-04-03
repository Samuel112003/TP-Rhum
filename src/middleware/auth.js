const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Accès refusé, token manquant" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Ajouter les infos de l'utilisateur au `req`
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = authMiddleware;
