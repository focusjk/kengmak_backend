var express = require("express");
var router = express.Router();
const UserService = require("../services/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { TOKEN_KEYWORD, LOGIN_KEY } = require("../util/constant");
const checkPass = require("../util/checkPass");

router.post("/login", async (req, res, next) => {
  const { username, password_in } = req.body;
  const query = { username };
  //console.log(req.headers);
  try {
    const userModel = await UserService.find(query);
    if (userModel.length === 0) {
      throw "Invalid username or password";
    }
    const { username, password, role, salt } = userModel[0];
    const check = await checkPass.compare(password_in + salt, password);

    if (check) {
      throw "Invalid username or password";
    }
    const token = jwt.sign({ username, role }, TOKEN_KEYWORD);
    res.cookie("token", token, { httpOnly: true });
    res.send({ token });
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
