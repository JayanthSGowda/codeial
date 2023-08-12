const Post = require('../models/post');
const Comment = require('../models/comment');

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
module.exports.comment = function (req, res) {
    Post.findById(req.body.postId).then(function (post) {
    Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.postId,
    }).then(function (comment) {
        Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comment._id}}).catch(function (err) {console.log('error adding comment id to post')});
    }).catch(function (err) {console.log('error creating comment')});
    
}).catch(function (err) {console.log('error finding post')});
res.redirect('/');
}