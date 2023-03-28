const { Router } = require("express"); // import Router from express
const { isLoggedIn } = require("../public/javascripts/auth"); // import isLoggedIn custom middleware
const { formatDate } = require("../public/javascripts/timestamp-format"); // import isLoggedIn custom middleware
const User = require('../models/User');

const router = Router();

router.get('/home', isLoggedIn, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId); // Fetch the user
  res.render('home', { logs: user.logs, formatDate }); // Pass the logs to the view
});

module.exports = router

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