
const { Router } = require('express');
const User = require('../models/User');
const router = Router();

router.get('/log/:id', async(req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ "logs._id": id }, { "logs.$": 1 });

    if (user && user.logs && user.logs.length > 0) {
      const log = user.logs[0];
      res.render('log', { log });
    } else {
      res.status(404).send('Log not found');
    }

});

module.exports = router;