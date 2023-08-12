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
module.exports.destroyPost = function (req, res) {
    console.log(req.params);
    Post.findById(req.params.id).then(function (post) {
        //.id converts the object id into string
        if (post.user == req.user.id) {
            // post.remove();
            Post.findByIdAndDelete(req.params.id).catch(function (err) {console.log('error deleting post')});   
            Comment.deleteMany({ post: req.params.id }).catch(function (err) {console.log('error deleting comments')});
        }
        return res.redirect('back');
    }).catch(function (err) {console.log('error finding post while deleting')});
}

module.exports.destroyComment = function (req, res) {
    Comment.findById(req.params.id).populate('post').then(function (comment) {
        if (comment.user == req.user.id) {
            // comment owner deleting comment
            Post.findByIdAndUpdate(comment.post, {$pull: {comments: req.params.id}}).catch(function (err) {console.log('error deleting comment id from post')});
            Comment.findByIdAndDelete(req.params.id).catch(function (err) {console.log('error deleting comment')});
        }else if(comment.post.user == req.user.id){
            // post owner deleting comment
            Post.findByIdAndUpdate(comment.post, {$pull: {comments: req.params.id}}).catch(function (err) {console.log('error deleting comment id from post')});
            Comment.findByIdAndDelete(req.params.id).catch(function (err) {console.log('error deleting comment')});

        }
        return res.redirect('back');
    }).catch(function (err) {console.log('error finding comment while deleting')});
}