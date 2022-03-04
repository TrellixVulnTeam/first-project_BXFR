const User = require("../models/user");

// let's keep it same as before
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: "profile page",
            profile_user: user
        });

    });
   
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            if(err){
                console.log('enable to update');
            }
            return res.redirect('back');
        })
    }else{
        return res.status(401).send("401 service unavialable");
    }
}


 //render the sign up page
module.exports.signup = function(req,res){
     if(req.isAuthenticated()){
     return    res.redirect('/users/profile')
     }

    return res.render('user_sign_up',{
        title: 'codeial | sign_up'
    })
}
 //render the sign in page
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
     return   res.redirect('/users/profile')
    }
    return  res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    })
}

//get the sign up data

module.exports.creates = function(req,res)
{  console.log(req.body);
    // TODO LATER
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
            if(err){
                console.log("error in finding user");
                return;
            }
            if(!user){
                User.create(req.body, function(err,user){
                    if(err){
                        console.log("error in Creating  user");
                        return;
                    }
                    return res.redirect('/users/sign-in');
                })
             }  
                else{
                    return res.redirect('back');
                }
            
    })
}
// sign in and create a session for user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in successfully');
    //TODO LATER
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
   req.logout();
   req.flash('success','Logged out succesfully');
    return res.redirect('/');
}


