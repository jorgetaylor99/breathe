const { Router } = require("express");
const { isLoggedIn } = require("../public/javascripts/auth"); // import isLoggedIn custom middleware
const router = Router();
const User = require("../models/User");

router.get("/peakflow", isLoggedIn, async (req, res) => {
    res.render("peakflow");
});

router.post("/peakflow", isLoggedIn, async (req, res) => {
    try {
        const { peakflow, symptoms, notes } = req.body;
        const userId = req.user.id; // Get the user's ID from the isLoggedIn middleware

        // Update the user's logs with the new log data
        await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    logs: {
                        peakflow,
                        symptoms,
                        notes,
                        timestamp: new Date(),
                    },
                },
            },
            { new: true }
        );
        res.redirect("/dashboard");
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = router;
