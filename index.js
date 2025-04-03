require("dotenv").config();

// Importation des modules nécessaires
const express = require('express');
const db = require("./src/data/db");
const debug = require("debug")("server");


const rhumRoutes = require("./src/routes/rhumRoutes");
const ingredientRoutes = require("./src/routes/ingredientRoutes");
const userRoutes = require("./src/routes/userRoutes");
const recetteRoutes = require("./src/routes/recetteRoutes");

const app = express()
const port = 3000

app.use(express.json());
db.connect();


app.use("/rhum", rhumRoutes);
app.use("/ingredient", ingredientRoutes);
app.use("/user", userRoutes);
app.use("/recette", recetteRoutes);


app.listen(port, () => {
    debug(`Rhum app listening on port ${port}`)
})

//  http://localhost:3000/