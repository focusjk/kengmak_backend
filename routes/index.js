var express = require('express');
var router = express.Router();
const UserService = require('../services/user')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const { TOKEN_KEYWORD } = require('../util/constant');


router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const query = { username }
  try {
    const userModel = await UserService.find(query)
    if (userModel.length === 0) {
      throw 'Not found user';
    }
    // TODO: frontend ส่ง password มาดีไหม ควรส่ง hash กับ salt มารึป่าว
    // TODO: checkout ว่า password ถูกต้องไหม
    const { _id, role } = userModel[0]
    const token = jwt.sign({ _id, role }, TOKEN_KEYWORD)
    // TODO: token ต้องมีเวลากำหนดไหม ว่าหมดอายุเมื่อไร
    res.send({ token });
  } catch (error) {
    res.status(400).send(error)
  }
});

module.exports = router;
