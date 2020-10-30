var express = require('express');
var router = express.Router();

// create a comment
router.post('/', (req, res, next) => {
  res.send({ comment_id: 123 });
});

// edit a comment
router.post('/edit', (req, res, next) => {
  res.send({ comment_id: 123 });
});

// delete a comment
router.delete('/', (req, res, next) => {
  res.send({ comment_id: 123 });
});

module.exports = router;
