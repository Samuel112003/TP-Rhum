require('dotenv').config();
const mongoose = require("mongoose");
const debugDB = require("debug")("database");

// Connexion à MongoDB
async function connect(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => debugDB('MongoDB connecté'))
    .catch(err => debugDB('Erreur de connexion à MongoDB:', err));
}


module.exports = {
    connect
}
