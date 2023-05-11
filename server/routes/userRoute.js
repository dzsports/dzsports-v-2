const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/search', userController.getResultSearch);
router.get('/getUser/:id', userController.getUser);

module.exports = router;