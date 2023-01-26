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

router.route('/').get(getPosts).post(createPost);

router.route('/:postId').get(getSinglePost).put(updatePost).delete(deletePost);

router.route('/:postId/responses').post(addResponse);

router.route('/:postId/responses/:responseId').delete(removeResponse);

module.exports = router;
