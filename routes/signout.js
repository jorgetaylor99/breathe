const { Router } = require('express');
const router = Router();

router.get('/signout', (req, res) => {
  res.clearCookie('authToken');
  res.redirect('/login');
});

module.exports = router;