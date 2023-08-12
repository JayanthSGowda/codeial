const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/post_controller');
router.post('/create-post',passport.checkAuthentication, postController.createPost);
router.post('/comment',passport.checkAuthentication, postController.comment);
router.get('/delete-post/:id',passport.checkAuthentication, postController.destroyPost);
router.get('/delete-comment/:id',passport.checkAuthentication, postController.destroyComment);
module.exports = router;