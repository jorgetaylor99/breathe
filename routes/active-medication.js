const { Router } = require("express");
const User = require("../models/User");
const router = Router();

router.get("/active-medication/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne(
    { "medications._id": id },
    { "medications.$": 1 }
  );

  if (user && user.medications && user.medications.length > 0) {
    const medication = user.medications[0];
    res.render("active-medication", { medication, user });
  } else {
    res.status(404).send("Medication not found");
  }
});

router.post("/active-medication/:id/update", async (req, res) => {
  const id = req.params.id;
  const { medication, dosage, frequency, color } = req.body;

  const result = await User.findOneAndUpdate(
    { "medications._id": id },
    {
      $set: {
        "medications.$.medication": medication,
        "medications.$.dosage": dosage,
        "medications.$.frequency": frequency,
        "medications.$.color": color,
      },
    },
    { new: true }
  );

  if (result) {
    res.redirect("/dashboard");
  } else {
    res.status(404).send("Medication not found");
  }
});

router.post("/active-medication/:id/delete", async (req, res) => {
  const id = req.params.id;

  const result = await User.findOneAndUpdate(
    { "medications._id": id },
    { $pull: { medications: { _id: id } } }
  );

  if (result) {
    res.redirect("/dashboard");
  } else {
    res.status(404).send("Medication not found");
  }
});

module.exports = router;
