const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/posts/add/:userId', postController.addPost);
router.get('/posts/get/:id', postController.getPosts);
router.post('/changephotoprofile/:id', postController.changeProfile);

module.exports = router;