const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function addUser({ nom, adressePostale, email, mdp }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw { status: 400, message: "Cet email est déjà utilisé." };
    }

    const hashedPassword = await bcrypt.hash(mdp, 10);
    const newUser = new User({ nom, adressePostale, email, mdp: hashedPassword });
    await newUser.save();

    return { message: "Utilisateur ajouté avec succès" };
}

async function login({ email, mdp }) {
    const user = await User.findOne({ email });
    if (!user) {
        throw { status: 400, message: "Utilisateur non trouvé" };
    }

    const isMatch = await bcrypt.compare(mdp, user.mdp);
    if (!isMatch) {
        throw { status: 400, message: "Mot de passe incorrect" };
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { message: "Connexion réussie", token };
}

module.exports = {
    addUser,
    login
};
