const User =  require('../models/user');

module.exports.profile = async function(req, res){
    // console.log(req.cookies);
    if(!req.cookies.user_id){
        return res.redirect('/users/sign-in');
    }else{
        let user = await User.findById(req.cookies.user_id).exec();
        // console.log(user.name);
        return res.render('users',{
            title: 'jayanth',
            user: user,
        })
    }
    
}
//render user sign up
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title:'codeial | Sign Up'
    })
}

//render user sign up
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title:'codeial | Sign In'
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}).then((user) => {

        if((!user)){
            User.create(req.body);
            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');

        }
    });
}

// Sing in and create a session for the user
module.exports.createSession = function(req, res){
    // find user
    User.findOne({email: req.body.email}).then((user) => {
        if(user){
            //handle password which don't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }else{
            // handle user not found
            return res.redirect('back');
        }
    });

}

module.exports.removeSession = function(req, res){
    delete req.cookies.user_id;
    res.cookie(req.cookies);
    res.redirect('/users/sign-in');
}