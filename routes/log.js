const { Router } = require('express');
const User = require('../models/User');
const router = Router();

router.get('/log/:id', async(req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ "logs._id": id }, { "logs.$": 1 });

    if (user && user.logs && user.logs.length > 0) {
      const log = user.logs[0];
      res.render('log', { log, user });
    } else {
      res.status(404).send('Log not found');
    }
});

router.post('/log/:id/update', async (req, res) => {
  const id = req.params.id;
  const { peakflow, symptoms, notes } = req.body;

  const result = await User.findOneAndUpdate(
    { "logs._id": id },
    {
      $set: {
        "logs.$.peakflow": peakflow,
        "logs.$.symptoms": symptoms,
        "logs.$.notes": notes,
      },
    },
    { new: true }
  );

  if (result) {
    res.redirect('/home');
  } else {
    res.status(404).send('Log not found');
  }
});

router.post('/log/:id/delete', async (req, res) => {
  const id = req.params.id;

  const result = await User.findOneAndUpdate(
    { "logs._id": id },
    { $pull: { logs: { _id: id } } }
  );

  if (result) {
    res.redirect('/home'); // Redirect to the desired page after successful deletion
  } else {
    res.status(404).send('Log not found');
  }
});

module.exports = router;