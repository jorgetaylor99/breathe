const { Router } = require('express');
const { isLoggedIn } = require("../public/javascripts/auth");
const router = Router();

router.get('/resources', isLoggedIn, (req, res) => {
    res.render('resources');
});

module.exports = router;