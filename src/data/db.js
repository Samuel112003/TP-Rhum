const mongoose = require("mongoose");
const uri = 'mongodb://localhost:27017/rhums';

// Connexion à MongoDB
async function connect(){
    mongoose.connect(uri)
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));
}

module.exports = {
    connect
}
