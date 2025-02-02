const express = require('express');
const users = require('../data/users'); // Import users from data folder
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
    res.json(users);
});

// GET a single user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});

// POST a new user
router.post('/', (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age ) {
        return res.status(400).json({ error: "Pleae provide name, email, and age"});
    }

    const newUser = {
        id: users.length+1, 
        name, 
        email,
        age
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// DELETE a user (should target a specific ID)
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({ error: "user not found" })
    }

    const deletedUser = users.splice(userIndex, 1);
    res.json({ message: "User deleted", user: deletedUser[0] });

});

// PATCH a user (should target a specific ID)
router.patch('/:id', (req, res) => {
    const user = users.find( u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const { name, email, age } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    res.json({ message: "user updated", user })
});



module.exports = router;
