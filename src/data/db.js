const mongoose = require("mongoose");
const uri = 'mongodb://localhost:27017/rhums';
const debugDB = require("debug")("database");

// Connexion à MongoDB
async function connect(){
    mongoose.connect(uri)
    .then(() => debugDB('MongoDB connecté'))
    .catch(err => debugDB('Erreur de connexion à MongoDB:', err));
}


module.exports = {
    connect
}
