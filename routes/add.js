const { Router } = require('express');
const { isLoggedIn } = require("../public/javascripts/auth"); // import isLoggedIn custom middleware
const router = Router();
const User = require('../models/User');

router.get('/add', isLoggedIn, async (req, res) => {
  res.render('add');
});

router.post('/add', isLoggedIn, async (req, res) => {
  try {
    const { peakflow, notes } = req.body;
    const userId = req.user.id; // Get the user's ID from the isLoggedIn middleware

    // Update the user's logs with the new log data
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          logs: {
            peakflow,
            notes,
          },
        },
      },
      { new: true }
    );
    res.redirect('/home');
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;