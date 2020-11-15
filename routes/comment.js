var express = require("express");
var router = express.Router();
const PostService = require("../services/post");
const passport = require("passport");

// create a comment
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const token = req.headers.authorization
    if (token !== 'Bearer ' + req.user.token) throw 'Token expired'
    const { _id, username } = req.user;
    const { postId, content } = req.body;
    try {
      if (!content) throw "Not found content";
      const postModel = await PostService.find({ _id: postId });
      console.log(postModel);
      if (postModel.length === 0) throw "Not found post";
      const post = postModel[0];
      if (post.comments.length === 0) {
        maxId = -1;
      } else {
        maxId = Math.max.apply(
          Math,
          post.comments.map(function (e) {
            return e.id;
          })
        );
      }
      const new_comment = {
        content: content,
        deleted_at: null,
        owner: username,
        id: maxId + 1,
      };
      post.comments.push(new_comment);
      await post.save();
      console.log(post);
      res.send(new_comment);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// edit a comment
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const token = req.headers.authorization
    if (token !== 'Bearer ' + req.user.token) throw 'Token expired'
    const { username, role } = req.user;
    const { postId, commentId, content } = req.body;
    try {
      const postModel = await PostService.find({ _id: postId });
      if (postModel.length === 0) throw "Not found post";
      const post = postModel[0];

      for (var i = 0; i < post.comments.length; i++) {
        if (post.comments[i].id === commentId) {
          if (role !== "MODERATOR" && post.comments[i].owner !== username)
            throw "Not allow to edit comment";
          post.comments[i].content = content;
          edited_comment = post.comments[i];
        }
      }
      await post.markModified("comments");
      await post.save();
      console.log(post);
      res.send(edited_comment);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// delete a comment
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { username, role } = req.user;
    const { postId, commentId } = req.body;
    try {
      const token = req.headers.authorization
      if (token !== 'Bearer ' + req.user.token) throw 'Token expired'
      const postModel = await PostService.find({ _id: postId });
      if (postModel.length === 0) throw "Not found post";
      const post = postModel[0];
      for (var i = 0; i < post.comments.length; i++) {
        if (post.comments[i].id === commentId) {
          if (role !== "MODERATOR" && post.comments[i].owner !== username)
            throw "Not allow to delete comment";
          post.comments[i].deleted_at = Date.now();
        }
      }
      await post.markModified("comments");
      await post.save();
      console.log(post);
      res.send("Done");
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

module.exports = router;
