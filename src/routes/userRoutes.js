const express = require("express");
const userService = require("../service/userService");

const router = express.Router();

router.post("/login", async (req, res) => {
    userService.login(req, res);
});

router.post("/register", async (req, res) => {
    userService.addUser(req, res);
});


module.exports = router;
