const userService = require('../service/userService');

async function addUser(req, res) {
    try {
        const result = await userService.addUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

async function login(req, res) {
    try {
        const result = await userService.login(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

module.exports = {
    addUser,
    login
};
