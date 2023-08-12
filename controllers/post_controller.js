const Post = require('../models/post');

module.exports.createPost = function (req, res) {
    console.log('post controller working')
    if(req.user){
        Post.create({
        content: req.body.content,
        user: req.user._id,
    }).catch(function (err) {console.log('error creating post')});
    }else{
        res.redirect('/users/sign-in');
    }
    
    res.redirect('/');
}