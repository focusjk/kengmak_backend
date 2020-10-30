var express = require('express');
var router = express.Router();
const PostService = require('../services/post')

// get all posts
router.get('/', async (req, res, next) => {
  try {
    // check auten
    const postModel = await PostService.find()
    res.send(postModel);
  } catch (error) {
    // TODO
    res.status(400).send('hgfdfasdghjkl')
  }
});

// create a post
router.post('/', async (req, res, next) => {
  const { content, username } = req.body;
  try {
    // check auten
    // check author
    const postModel = await PostService.create({ content, owner: username })
    res.send(postModel);
  } catch (error) {
    // TODO
    res.status(400).send('hgfdfasdghjkl')
  }
});

// edit a post
router.post('/edit', (req, res, next) => {
  const { postId, username } = req.body;
  try {
    // check auten
    // const postModel = postModels[0]
    // 	if(postModel.owner !== owner) {
    // 		throw new Error('Post not found');
    // 	}
    // 	const postModel = await promiseQuery(Post, query);
    // 	return postModel
    // }
    // check author
    // const postModel = await PostService.edit({ content, postId, owner: username })
    res.send({});
  } catch (error) {
    // TODO
    res.status(400).send('hgfdfasdghjkl')
  }
});

// delete a post
router.delete('/', (req, res, next) => {
  res.send({ post_id: 123 });
});

module.exports = router;
