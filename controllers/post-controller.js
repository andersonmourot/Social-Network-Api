const { Post, User } = require("../models");
const postController = {
  getSinglePost(req, res) {
    Post.findOne({ _id: req.params.postId })
      .then((dbPostData) => {
        if (!dbPostData) {
          return res.status(404).json({ message: "No post using this ID" });
        }
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getPosts(req, res) {
    Post.find()
      .sort({ createdAt: -1 })
      .then((dbPostData) => {
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updatePost(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $set: req.body },
      { reunValidators: true, new: true }
    )
      .then((dbPostData) => {
        if (!dbPostData) {
          return res.status(400).json({ message: "No post using this ID" });
        }
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createPost(req, res) {
    Post.create(req.body)
      .then((dbPostData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { posts: dbPostData._id } },
          { new: true }
        );
      })
      .then((dbPostData) => {
        if (!dbPostData) {
          return res
            .status(400)
            .json({ message: "Post created, but no user found" });
        }
        res.json({ message: "Post successful" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deletePost(req, res) {
    Post.findOneAndRemove({ _id: req.params.postId })
      .then((dbPostData) => {
        if (!dbPostData) {
          return res.status(400).json({ message: "No post using this ID" });
        }
        return User.findOneAndUpdate(
          { posts: req.params.postId },
          { $pull: { posts: req.params.postId } },
          { new: true }
        );
      })
      .then((dbPostData) => {
        if (!dbPostData) {
          return res
            .status(400)
            .json({ message: "Post created, but no user found" });
        }
        res.json({ message: "Post deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addResponse(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $addToSet: { responses: req.body } },
      { reunValidators: true, new: true }
    )
      .then((dbPostData) => {
        if (!dbPostData) {
          return res.status(404).json({ message: "No post using this ID" });
        }
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  removeResponse(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { responses: { responseId: req.params.responseId } } },
      { reunValidators: true, new: true }
    )
      .then((dbPostData) => {
        if (!dbPostData) {
          return res.status(404).json({ message: "No post using this ID" });
        }
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = postController;
