const express = require("express");
const userController = require('../controller/userController');

const router = express.Router();

router.post("/login", async (req, res) => {
    userController.login(req, res);
});

router.post("/register", async (req, res) => {
    userController.addUser(req, res);
});


module.exports = router;
