var express = require('express');
var router = express.Router();

router.post('/login', (req, res, next) => {
  res.send({token: 'Hiiii'});
});

module.exports = router;
