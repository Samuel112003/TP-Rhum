const express = require('express')
const db = require("./src/data/db");
const rhumsService = require("./src/service/rhumService");
const usersService = require("./src/service/userService");
const ingredientService = require("./src/service/ingredientService");
const recetteService = require("./src/service/recetteService");
const app = express()
const port = 3000

app.use(express.json());
db.connect();

app.get('/user/connexion', async (req, res) => {
    res.send('page connexion');
});

app.post('/user/inscription', async (req, res) => {
    usersService.addUser(req, res);
});

app.post('/ingredient/add', async (req, res) => {
    ingredientService.addIngredient(req, res);
});

app.get('/ingredient/search', async (req, res) => {
    ingredientService.searchIngredient(req, res);
});

app.get('/ingredient', async (req, res) => {
    ingredientService.getAllIngredients(req, res);
});

app.get('/rhum/search', async (req, res) => {
    rhumsService.searchRhum(req, res);
});

app.get('/rhum', async (req, res) => {
    rhumsService.getAllRhums(req, res);
});

app.post('/recette/add', async (req, res) => {
    recetteService.addRecette(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//http://localhost:3000/rhum