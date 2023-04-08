const { Router } = require("express");
const { isLoggedIn } = require("../public/javascripts/auth");
const { formatDate } = require("../public/javascripts/format-date");
const User = require('../models/User');

const router = Router();

router.get('/home', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const logs = user && user.logs ? user.logs : [];
    res.render('home', { logs, formatDate });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

// // Show Route with isLoggedIn middleware
// router.get("/:id", isLoggedIn, async (req, res) => {
//   const { email } = req.user; // get username from req.user property created by isLoggedIn middleware
//   const _id = req.params.id; // get id from params
//   //send target todo
//   res.json(
//     await Log.findOne({ email, _id }).catch((error) =>
//       res.status(400).json({ error })
//     )
//   );
// });

// // create Route with isLoggedIn middleware
// router.post("/", isLoggedIn, async (req, res) => {
//   const { email } = req.user; // get email from req.user property created by isLoggedIn middleware
//   req.body.email = email; // add email property to req.body
//   //create new todo and send it in response
//   res.json(
//     await Todo.create(req.body).catch((error) =>
//       res.status(400).json({ error })
//     )
//   );
// });

// // update Route with isLoggedIn middleware
// router.put("/:id", isLoggedIn, async (req, res) => {
//   const { email } = req.user; // get email from req.user property created by isLoggedIn middleware
//   req.body.email = email; // add username property to req.body
//   const _id = req.params.id;
//   //update todo with same id if belongs to logged in User
//   res.json(
//     await Todo.updateOne({ email, _id }, req.body, { new: true }).catch(
//       (error) => res.status(400).json({ error })
//     )
//   );
// });

// // update Route with isLoggedIn middleware
// router.delete("/:id", isLoggedIn, async (req, res) => {
//   const { email } = req.user; // get username from req.user property created by isLoggedIn middleware
//   const _id = req.params.id;
//   //remove todo with same id if belongs to logged in User
//   res.json(
//     await Todo.remove({ email, _id }).catch((error) =>
//       res.status(400).json({ error })
//     )
//   );
// });