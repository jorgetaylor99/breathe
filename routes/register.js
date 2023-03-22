const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = Router();

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    await User.create(req.body);
    // redirect to the login page
    res.redirect('/login');
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;