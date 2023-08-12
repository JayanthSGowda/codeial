const Post = require('../models/post');

module.exports.home = async function (req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 100);
    const posts =await Post.find({}).populate('user').catch(err => {console.log('error in fetching posts from db'); return});
    console.log(posts);
 
    return res.render('home',{
        title: "home",
        posts,

    });
}