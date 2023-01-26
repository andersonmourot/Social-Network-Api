const { User, Post } = require("../models");
const userController = {
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(400).json({ message: "No user found" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("contacts")
      .populate("posts")
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(400).json({ message: "No user found" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(400).json({ message: "No user found" });
        }
        return Post.deleteMany({ _id: { $in: dbUserData.posts } });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addContact(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { contacts: req.params.contactId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(400).json({ message: "No user found" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  removeContact(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { contacts: req.params.contactId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(400).json({ message: "No user found" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
