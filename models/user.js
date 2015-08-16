var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email:    {type: String, required: true},
    name:     {type: String, required: true},
    pw_hash:  {type: String, required: false},
    paid:     {type: Number, default: 0},
    admin:    {type: Boolean, required: true, default: false},
    pwset:    {type: Boolean, required: true, default: false}
});

var passwordHash = require('password-hash');

UserSchema.statics.findByEmail = function(em, cb){
    this.findOne({email: em}, cb);
}

UserSchema.statics.createAccount = function(u, cb){
    var User = mongoose.model('User');

    this.findByEmail(u.email, function(err, user){

        if(user != null && user.pwset == true){
            cb("User already exists", null, null);
            return;
        }else{
            if(user == null){
            // Expected case - Create new user
                var user = new User(u);
            }

            // TODO: Test this
            if(u.pwset == false && u.pw_hash != undefined){
                user.pw_hash = passwordHash.generate(u.pw_hash);
                user.pwset = true;
            }  

            user.save(function(err, createdUser){
                if(err){ 
                    cb("An error occurred.", null, null); 
                }else{
                    cb(null, createdUser, user._id);    
                }
            });
        }
    });
}

UserSchema.statics.login = function(email, pass, cb){
    this.findByEmail(email, function(err, user){
        if(err || user === null){ 
            cb("Incorrect login", null, null);
        }else if(user.pwset == false){
            cb("Password needs to be set.", null, null);
        }else if(passwordHash.verify(pass, user.pw_hash)){
            cb(null, user, user._id);
        }else{
            cb("Incorrect login", null, null);
        }
    });
}

UserSchema.statics.LoggedIn = function(userInfo, cb){

    if(userInfo === undefined){
        cb(false);
    }else{
        this.findById(userInfo.toString(), function(err, users){
            if(users === undefined){
                cb(false);
            }else{
                cb(true);
            }
        });
    }
}

mongoose.model('User', UserSchema);