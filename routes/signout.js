const { Router } = require('express');
const router = Router();

router.get('/signout', (req, res) => {
  res.clearCookie('authToken');
  res.redirect('/');
});

module.exports = router;