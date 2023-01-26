const router = require('express').Router();
const {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  addResponse,
  removeResponse,
} = require('../../controllers/post-controller');

// /api/thoughts
router.route('/').get(getPosts).post(createPost);

// /api/thoughts/:thoughtId
router.route('/:postId').get(getSinglePost).put(updatePost).delete(deletePost);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addResponse);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeResponse);

module.exports = router;
