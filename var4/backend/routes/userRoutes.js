const express = require('express');
const users = require('../data/users');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
    res.json(users);
});

// GET a single user
router.get('/:id', (req, res) => {
    res.json({ mssg: `GET user with id ${req.params.id}` });
});

// POST a new user
router.post('/', (req, res) => {
    res.json({ mssg: 'POST a new user' });
});

// DELETE a user (should target a specific ID)
router.delete('/:id', (req, res) => {
    res.json({ mssg: `DELETE user with id ${req.params.id}` });
});

// PATCH a user (should target a specific ID)
router.patch('/:id', (req, res) => {
    res.json({ mssg: `PATCH user with id ${req.params.id}` });
});

router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});

module.exports = router;
