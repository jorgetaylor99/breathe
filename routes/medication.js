const { Router } = require("express");
const { isLoggedIn } = require("../public/javascripts/auth");
const router = Router();
const User = require("../models/User");

router.get("/medication", isLoggedIn, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const medications = user && user.medications ? user.medications : [];
        res.render("medication", { medications });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.post("/medication", isLoggedIn, async (req, res) => {
    try {
        const { medication, dosage, frequency, color } = req.body;
        const userId = req.user.id; // Get the user's ID from the isLoggedIn middleware
        console.log(color);

        // Update the user's logs with the new log data
        await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    medications: {
                        medication,
                        dosage,
                        frequency,
                        color,
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
