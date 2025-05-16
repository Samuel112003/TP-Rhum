require("dotenv").config();

// Importation des modules nécessaires
const express = require('express');
const helmet = require('helmet');
const db = require("./data/db");
const debug = require("debug")("server");


const rhumRoutes = require("./routes/rhumRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const userRoutes = require("./routes/userRoutes");
const recetteRoutes = require("./routes/recetteRoutes");

const app = express()
const port = process.env.PORT

app.use(helmet());
app.use(express.json());
db.connect();


app.use("/rhum", rhumRoutes);
app.use("/ingredient", ingredientRoutes);
app.use("/user", userRoutes);
app.use("/recette", recetteRoutes);


app.listen(port, () => {
    debug(`Rhum app listening on port ${port}`)
})