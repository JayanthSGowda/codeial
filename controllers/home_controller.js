const Post = require('../models/post');

module.exports.home = async function (req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 100);
    const posts =await Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
          path: 'user',
        //   model: 'User' Replace with the actual User model name
        }
      }).catch(err => {console.log('error in fetching posts from db'); return});
    console.log(posts[0].comments);
    return res.render('home',{
        title: "home",
        posts,

    });
}