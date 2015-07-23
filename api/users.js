var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

require('../config/auth.js');

var nodemailer = require('nodemailer');
var sprintf = require("sprintf-js").sprintf

router.post('/', function(req, res, next){
    var user = req.body;
    User.findOne({email:user.email}, function(err, u){
        if(u === null){
            User.createAccount(user, function(err, user, id){
                if(err){
                    res.send(err);
                }else{
                    res.redirect(307, "/api/users/sendemail");
                }
            });
        }else{
            u.name = user.name;
            u.admin = user.admin;
            u.save(function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send("Updated.");
                }
            });
        }
    });
});

router.get('/', function(req, res, next){
    User.find({}, 'email name admin pwset', function(err, users){
        if(err){
            res.send(err);
        }else{
            res.json(users);
        }
    });

});

router.post('/setpwd', function(req, res, next){
    var user = req.body;
    User.findOne({email:user.email}, function(err, u){
        if(u == null || err){
            var error = "User does not exist.";
            res.send(error);
        }else{
            User.createAccount(user, function(err, user, id){
                if(err){
                    res.send(err);
                }else{
                    res.cookie('u', id);
                    res.redirect('/');
                }
            });
        }
    });
});

router.post('/sendemail', function(req, res, next){
    var email = req.body.email;
    var name = req.body.name;
    var urlName = encodeURIComponent(name);
    var admin = req.body.admin;
    var id = req.body._id;

    // TODO: Make link secure
    link = sprintf("http://localhost:8080/login/create?email=%s&name=%s&admin=%s&tkn=%s", email, urlName, admin, id);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alphasig@umn.edu',
            pass: password
        }
    });

    transporter.sendMail({
        from: 'alphasig@umn.edu',
        to: email,
        subject: 'Create Budget Account',
        html: sprintf("Hello %s, please create an account by clicking <a href='%s'>this link</a>.<br><br> Thank You!", name, link)
    });
});

module.exports = router;