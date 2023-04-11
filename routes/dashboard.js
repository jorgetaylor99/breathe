const { Router } = require("express");
const { isLoggedIn } = require("../public/javascripts/auth");
const { formatDate } = require("../public/javascripts/format-date");
const User = require("../models/User");

const router = Router();

router.get("/dashboard", isLoggedIn, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const logs = user && user.logs ? user.logs : [];
        const medications = user && user.medications ? user.medications : [];
        res.render("dashboard", { logs, medications, formatDate });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
