const User =  require('../models/user');

module.exports.profile = function(req, res){
    return res.render('users',{
        title: 'jayanth',
        user_name: "jayanth",
    })
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
    // todo later
}