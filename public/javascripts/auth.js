require("dotenv").config(); // loading env variables
const jwt = require("jsonwebtoken");

// // MIDDLEWARE FOR AUTHORIZATION (MAKING SURE THEY ARE LOGGED IN)
// const isLoggedIn = async (req, res, next) => {
//   try {
//     // check if auth header exists
//     if (req.headers.authorization) {
//       // parse token from header
//       const token = req.headers.authorization.split(" ")[1]; //split the header and get the token
//       if (token) {
//         const payload = await jwt.verify(token, process.env.SECRET);
//         if (payload) {
//           // store user data in request object
//           req.user = payload;
//           next();
//         } else {
//           res.status(400).json({ error: "token verification failed" });
//         }
//       } else {
//         res.status(400).json({ error: "malformed auth header" });
//       }
//     } else {
//       res.status(400).json({ error: "No authorization header" });
//     }
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

// MIDDLEWARE FOR AUTHORIZATION (MAKING SURE THEY ARE LOGGED IN)
const isLoggedIn = async (req, res, next) => {
  try {
    // check if authToken cookie exists
    if (req.cookies.authToken) {
      // get token from cookie
      const token = req.cookies.authToken;
      if (token) {
        const payload = await jwt.verify(token, process.env.SECRET);
        if (payload) {
          // store user data in request object
          req.user = payload;
          next();
        } else {
          res.status(400).json({ error: "token verification failed" });
        }
      } else {
        res.status(400).json({ error: "malformed auth cookie" });
      }
    } else {
      res.status(400).json({ error: "No authorization cookie" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// export custom middleware
module.exports = {
  isLoggedIn,
};