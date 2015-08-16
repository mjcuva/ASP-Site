var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

var url = require("url");

router.get('/', function(req, res){

    if(req.headers.cookie){
        var cookieData = req.headers.cookie.split('=')[1];
        User.LoggedIn(cookieData, function(loggedin){
            res.send(loggedin);
        });
    }else{
        res.send(false);
    }
});

router.post('/', function(req, res, next){
    var email = req.body.email;
    var pass = req.body.pass;

    User.login(email, pass, function(err, user, hash){
        if(err == "Password needs to be set."){
            // TODO: Redirect to password set page
            res.status(302).send(err);
        }else if(err){
            res.status(302).send(err);
        }else{
            res.send(hash);
        }
    });
});

module.exports = router;