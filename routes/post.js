var express = require('express');
var router = express.Router();
const PostService = require('../services/post')
const passport = require('passport')

// get all posts
router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const postModel = await PostService.find({ deleted_at: null })
      res.send(postModel);
    } catch (error) {
      res.status(400).send(error)
    }
  });

// create a post
router.post('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { _id, username: owner } = req.user
    const { content } = req.body;
    try {
      if (!content) throw 'Not found content'
      const postModel = await PostService.create({ content, owner })
      res.send(postModel);
    } catch (error) {
      res.status(400).send(error)
    }
  });

// edit a post
router.post('/edit',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { _id, username, role } = req.user
    const { postId, content } = req.body;
    try {
      if (!content) throw 'Not found content'
      const postModel = await PostService.find({ _id: postId })
      console.log(postModel)
      if (postModel.length === 0) throw 'Not found post'
      const post = postModel[0]
      if (role !== "MODERATOR" && post.owner !== username) throw 'Not allow to edit post'
      post.content = content
      await post.save()
      console.log(post)
      res.send(post);
    } catch (error) {
      res.status(400).send(error)
    }
  });

// delete a post
router.delete('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { username, role } = req.user
    const { postId } = req.body;
    try {
      const postModel = await PostService.find({ _id: postId })
      if (postModel.length === 0) throw 'Not found post'
      const post = postModel[0]
      if (role !== "MODERATOR" && post.owner !== username) throw 'Not allow to delete post'
      post.deleted_at = Date.now()
      await post.save()
      res.send('Done');
    } catch (error) {
      res.status(400).send(error)
    }
  });

module.exports = router;
