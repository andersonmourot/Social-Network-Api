const { Post, User } = require("../models");
const postController = {
  getOnePost(req, res) {
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
};
