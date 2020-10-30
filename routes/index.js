var express = require('express');
var router = express.Router();
const UserService = require('../services/user')

router.post('/login', async(req, res, next) => {
  const { username, password } = req.body;
  const query = { username, password }
  try {
    const userModel = await UserService.find(query)
    res.send(userModel);
  } catch(error) {
    res.status(400).send('hgfdfasdghjkl')
  }
});

module.exports = router;
