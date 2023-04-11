require('dotenv').config();
const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = Router();

// destructure env variables with defaults
const { SECRET = "secret" } = process.env;

router.get('/login', (req, res) => {
    res.render('login');
});

// Login route to verify a user and get a token
router.post("/login", async (req, res) => {
    try {
        // check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
        //check if password matches
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
            // sign token and send it in response
            const token = jwt.sign({ id: user._id, email: user.email }, SECRET);
            // store token in cookie
            res.cookie('authToken', token, { httpOnly: true });
            // redirect to dashboard
            res.redirect('/dashboard');
        } else {
            res.status(400).json({ error: "password doesn't match" });
        }
        } else {
        res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = router;