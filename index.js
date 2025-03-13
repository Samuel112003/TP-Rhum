const express = require('express')
const rhumsData = require("./src/data/rhumsData");
const usersData = require("./src/data/usersData");
const app = express()
const port = 3000

app.use(express.json());


app.get('/rhum/connexion', async (req, res) => {
    res.send('page connexion');
});

app.post('/rhum/inscription', async (req, res) => {
    usersData.addUser(req, res);
    //res.send('page inscription');
});

app.get('/rhum', async (req, res) => {
    rhumsData.getAllRhums(res);
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//http://localhost:3000/rhum