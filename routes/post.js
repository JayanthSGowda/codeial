const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/post_controller');
router.post('/create-post',passport.checkAuthentication, postController.createPost);
router.post('/comment',passport.checkAuthentication, postController.comment);

module.exports = router;