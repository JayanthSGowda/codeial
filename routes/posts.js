const express = require('express');
const router = express.Router();


router.get('/',require('../controllers/posts_controller').posts);

module.exports = router;