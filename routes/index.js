var express = require("express");
var router = express.Router();
const UserService = require("../services/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { TOKEN_KEYWORD, LOGIN_KEY } = require("../util/constant");
const checkPass = require("../util/checkPass");
const user = require("../models/user");

router.post("/login", async (req, res, next) => {
  const { username, password_in } = req.body;
  const query = { username };
  console.log(req);
  try {
    const userModel = await UserService.find(query);
    if (userModel.length === 0) {
      throw "Invalid username or password";
    }
    const { _id, password, role, salt, username } = userModel[0];
    const check = await checkPass.compare(password_in + salt, password);

    if (check) {
      throw "Invalid username or password";
    }
    const expirationSeconds = 10 * 60; // one week
    const token = jwt.sign({ _id, role }, TOKEN_KEYWORD, {
      expiresIn: expirationSeconds,
    });
    userModel[0].token = token;
    await userModel[0].save()
    res.cookie("token", token, { httpOnly: true });
    res.send({ token, username, role });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/logout",
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const token = req.headers.authorization
    try {
      const userModel = await UserService.find({ token: token.replace('Bearer ', '') });
      if (userModel.length === 1) {
        userModel[0].token = null;
        await userModel[0].save()
      }
      res.send('Done');
    } catch (error) {
      res.status(400).send(error);
    }
  });

// router.post('/login_uname', async (req, res, next) => {
//   const { username } = req.body;
//   const query = { username }
//   try {

//     const userModel = await UserService.find(query)
//     if (userModel.length === 0) {
//       throw 'Not found user';
//     }
//     const {password, salt} = userModel[0]
//     const token = jwt.sign({ password, salt}, LOGIN_KEY)
//     res.send({token});
//   } catch (error) {
//     res.status(400).send(error)
//   }
// });

// router.post('/login', async (req, res, next) => {
//   try {
//   const { token } = req.body;
//   var payload = jwt.verify(token, LOGIN_KEY);
//   res.send({payload})
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

module.exports = router;
