var express = require('express');
var router = express.Router();

// get all posts
router.get('/', (req, res, next) => {
  res.send({ posts: [] });
});

// create a post
router.post('/', (req, res, next) => {
  res.send({ post_id: 123 });
});

// edit a post
router.post('/edit', (req, res, next) => {
  res.send({ post_id: 123 });
});

// delete a post
router.delete('/', (req, res, next) => {
  res.send({ post_id: 123 });
});

module.exports = router;
