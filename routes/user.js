const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.post('/login', async (req,res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if (!user || user.password !== password) {
        return res.status(401).json({error: 'Invalid credentials'});
    }

    res.status(200).json({message: 'Login successful'});
})

router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({error: 'User not found'});
        res.json(user);
    } catch (error) {
        res.status(500).json({error: 'Error retrieving user information.'})
        console.log(error)
    }
})

module.exports = router;